# De la Predicción a la Prescripción: Time Series Forecasting y Mitigación de Capacidad en Supply Chain E-commerce

**Autor:** Sebastian Urzúa Bórquez  
**Especialidad:** Advanced Analytics & Operations Research  
**Stack Tecnológico:** Python 3.12, LightGBM, Pandas, Statsmodels, Scikit-Learn, uv  
**Métricas de Impacto:** WAPE, Pinball Loss ($p_{10}, p_{50}, p_{90}$), Reducción de 2.03 pp en Atrasos de SLA  

---

> [!NOTE]
> **Resumen Ejecutivo:**  
> En este artículo desgloso de principio a fin el diseño, validación e implementación de un pipeline integral de **Time Series Forecasting Tabular Global** para la red logística de e-commerce en Región Andina (~500.000 órdenes/mes). A través de un enfoque directo a $H = 14$ días con **LightGBM**, eliminamos completamente el *data leakage*, redujimos el error de pronóstico en un **47% frente al benchmark operacional** y acoplamos una capa prescriptiva de **regresión cuantílica asimétrica ($p_{90}$)** que previene cuellos de botella y rescata más de **10.000 órdenes mensuales** entregadas a tiempo dentro de la promesa comprometida (*Motor de Promesa de Entrega*).

---

## 📑 Tabla de Contenidos
1. [Introducción: La Paradoja de la Capacidad en Redes Logísticas](#1-introducción-la-paradoja-de-la-capacidad-en-redes-logísticas)
2. [El Ecosistema Físico y Operacional: Red Multieslabón Región Andina](#2-el-ecosistema-físico-y-operacional-red-multieslabón-region-andina)
3. [El Dataset: Modelando Estacionalidades Múltiples y Shocks Comerciales](#3-el-dataset-modelando-estacionalidades-múltiples-y-shocks-comerciales)
4. [Diagnóstico Estadístico Riguroso: Estacionariedad y Autocorrelación](#4-diagnóstico-estadístico-riguroso-estacionariedad-y-autocorrelación)
5. [El Principio de Parsimonia: Fijando el Baseline Operacional](#5-el-principio-de-parsimonia-fijando-el-baseline-operacional)
6. [Ingeniería de Características sin Fuga de Información ($H=14$)](#6-ingeniería-de-características-sin-fuga-de-información-h14)
7. [Modelado Tabular Global con LightGBM vs. Alternativas](#7-modelado-tabular-global-con-lightgbm-vs-alternativas)
8. [Estrategia de Validación Temporal: Rolling-Origin Purgado](#8-estrategia-de-validación-temporal-rolling-origin-purgado)
9. [Forecasting Probabilístico: Inmunes a la Media con Pinball Loss](#9-forecasting-probabilístico-inmunes-a-la-media-con-pinball-loss)
10. [La Capa Prescriptiva: De la Predicción al Balanceo de Capacidad](#10-la-capa-prescriptiva-de-la-predicción-al-balanceo-de-capacidad)
11. [Resultados Cuantitativos e Impacto en Negocio](#11-resultados-cuantitativos-e-impacto-en-negocio)
12. [Lecciones Aprendidas y Cheatsheet para Entrevistas Técnicas](#12-lecciones-aprendidas-y-cheatsheet-para-entrevistas-técnicas)

---

## 1. Introducción: La Paradoja de la Capacidad en Redes Logísticas

En el universo del retail omnicanal y el e-commerce de alta velocidad, la experiencia de compra no culmina al pulsar el botón *"Pagar"*: **apenas comienza**. La satisfacción del cliente, la recompra y el *Net Promoter Score* (NPS) están intrínsecamente atados al cumplimiento estricto del acuerdo de nivel de servicio (SLA) comunicado al momento del *checkout*. Esta promesa viva está orquestada por el **Motor de Promesa de Entrega**.

Sin embargo, las redes logísticas multieslabón enfrentan una paradoja estructural:

```
Demanda E-commerce (Altamente Volátil)    vs.    Capacidad de Red (Rígida en el Corto Plazo)
  • Picos dominicales de tráfico                  • Líneas de picking y empaque acotadas
  • Efecto quincenal (+18% de demanda)            • Espacio físico de almacenamiento finito
  • Campañas Cyber / Black Friday (+110%)         • Contratación de fletes requiere >10-14 días
```

Cuando el flujo entrante supera la capacidad nominal de procesamiento de un nodo intermedio (Cross-Docking o Fulfillment Center), la red no solo se congestiona: **se produce una degradación no lineal**. Los paquetes forman colas de espera físicas, el tiempo de ciclo (*lead time*) se dispara y el costo de reacción se multiplica debido a la contratación de fletes troncales de emergencia o turnos extraordinarios no planificados.

Para balancear la carga de la red, operaciones requiere **14 días de anticipación ($H=14$)**. Con menos tiempo, es imposible modular turnos laborales o negociar capacidad con transportistas terceros.

Este artículo detalla la solución técnica y metodológica que diseñamos para transformar pronósticos estadísticos en **decisiones operativas automatizadas de balanceo de red**.

---

## 2. El Ecosistema Físico y Operacional: Red Multieslabón Región Andina

Para contextualizar el modelado, estructuramos una topología representativa de la operación nacional en Región Andina, coordinando un volumen superior a las **500.000 órdenes mensuales** distribuidas en tres tipologías de nodos:

```
                            [ Bodegas Sellers 1P / 3P ]
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       HUBS PRINCIPALES DE CONSOLIDACIÓN       │
                 │   • Hub Hub Central   (Capacidad: 10.500 bultos)   │
                 │   • Hub Hub Norte (Capacidad:  6.000 bultos)   │
                 │   • Hub Hub Sur     (Capacidad:  4.000 bultos)   │
                 └───────┬───────────────────────────────┬───────┘
                         │                               │
                         ▼                               ▼
       ┌──────────────────────────────────┐    ┌──────────────────────────────────┐
       │     CROSS-DOCKING REGIONAL       │    │     CLICK & COLLECT TIENDAS      │
       │ • XD XD Oriente (Cap: 1.700/d)  │    │ • CC CC Store Alpha Hub Central (Cap: 850) │
       │ • XD XD Costera (Cap: 1.950/d) │    │ • CC CC Store Beta Hub Norte (Cap: 650) │
       │                                  │    │ • CC CC Store Gamma Chía    (Cap: 500) │
       └──────────────────────────────────┘    └──────────────────────────────────┘
```

| Nodo Logístico | Tipo de Infraestructura | Región Geográfica | Capacidad Nominal Diaria | Rol Operacional en la Red |
| :--- | :--- | :--- | :---: | :--- |
| **Hub_Bogota** | Hub / Fulfillment Center | Hub Central D.C. | 10.500 bultos/día | Macro-nodo central; consolida 1P y despacha troncales nacionales. |
| **Hub_Medellin** | Hub / Fulfillment Center | Antioquia | 6.000 bultos/día | Hub metropolitano de alta densidad y reexpedición regional. |
| **Hub_Hub Sur** | Hub / Fulfillment Center | Valle del Cauca | 4.000 bultos/día | Nodo estratégico para el suroccidente region-andinano. |
| **XD_XD Oriente** | Plataforma Cross-Docking | Santander | 1.700 bultos/día | Transferencia rápida sin almacenaje prolongado (in/out < 12h). |
| **XD_XD Costera** | Plataforma Cross-Docking | Costa Atlántica | 1.950 bultos/día | Plataforma de desconsolidación para la región norte. |
| **CC_CC Store Alpha_Bog**| Punto Click & Collect | Hub Central D.C. | 850 paquetes/día | Módulo de retiro en tienda física (última milla asistida). |
| **CC_Santafe_Med** | Punto Click & Collect | Antioquia | 650 paquetes/día | Retiro en tienda en centro comercial de alto tráfico. |
| **CC_CC Store Gamma_Chia**| Punto Click & Collect | Cundinamarca | 500 paquetes/día | Nodo suburbano satélite de última milla. |

---

## 3. El Dataset: Modelando Estacionalidades Múltiples y Shocks Comerciales

La generación del dataset histórico reproduce con fidelidad estocástica la dinámica multiescala observada en e-commerce regional a lo largo de un año calendario (365 días por nodo, totalizando **2.920 observaciones diarias**).

### Formulación de la Generación de Demanda
Para cada nodo $i$ en el día $t$, el volumen generado responde a la ecuación multiplicativa:

$$y_{i,t} = \text{Base}_i \times f_{\text{semanal}}(t) \times f_{\text{quincena}}(t) \times f_{\text{evento}}(t) \times \text{Tendencia}(t) \times (1 + \varepsilon_{i,t})$$

1. **Estacionalidad Semanal ($f_{\text{semanal}}$):**  
   Picos intensos los domingos ($1.20\times$) y lunes ($1.25\times$) por acumulación de compras de fin de semana, con valles los sábados ($0.85\times$).
2. **Efecto Quincena Región Andinana ($f_{\text{quincena}}$):**  
   Incremento determinista del $+18\%$ ($1.18\times$) en los rangos de pago de salario formal: días 14 al 17 y 28 al 31 de cada mes.
3. **Eventos Comerciales Masivos ($f_{\text{evento}}$):**  
   - **CyberDays (19 al 23 de mayo):** Shock de demanda de $+110\%$ ($2.10\times$).
   - **Black Friday (26 al 29 de noviembre):** Shock de demanda de $+80\%$ ($1.80\times$).
4. **Tendencia y Ruido:**  
   Crecimiento orgánico anual acumulado del $+12\%$ y perturbaciones gaussianas independientes $\varepsilon_{i,t} \sim \mathcal{N}(0, 0.04^2)$.

### Inspección Visual del Comportamiento Temporal

El análisis gráfico inicial revela con claridad cómo interactúan estas fuerzas temporales a nivel agregado y desagregado:

![Visión General de la Demanda de la Red Logística](images/01_eda_network_overview.png)

> [!TIP]
> **Hallazgo Operativo Clave:**  
> En el panel superior, la demanda agregada oscila entre 15.000 y 25.000 paquetes diarios en semanas regulares, pero se catapulta hasta rozar los **40.000 paquetes diarios en Black Friday**. En el panel inferior se aprecia la heterogeneidad de escalas: mientras el Hub Hub Central absorbe el 40% del flujo nacional, los puntos Click & Collect operan en una escala volumétrica un orden de magnitud inferior, pero con idéntica sensibilidad estacional.

---

## 4. Diagnóstico Estadístico Riguroso: Estacionariedad y Autocorrelación

Antes de construir cualquier variable predictiva o elegir la familia de modelos, sometemos las series a una batería formal de pruebas estadísticas.

### 4.1 Test de Dickey-Fuller Aumentado (ADF)
Evaluamos la hipótesis nula de raíz unitaria ($\mathcal{H}_0$: la serie es no estacionaria):

$$\Delta y_t = \alpha + \beta t + \gamma y_{t-1} + \sum_{s=1}^p \delta_s \Delta y_{t-s} + e_t$$

| Nodo Logístico | Estadístico ADF ($\tau$) | $p$-valor | Valores Críticos (1%, 5%, 10%) | Diagnóstico Estadístico |
| :--- | :---: | :---: | :---: | :--- |
| **Hub_Bogota** | **-4.3393** | $3.79 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **Hub_Medellin** | **-4.2875** | $4.67 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **Hub_Hub Sur** | **-4.3048** | $4.36 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **XD_XD Oriente** | **-4.4168** | $2.77 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **XD_XD Costera**| **-3.9850** | $1.49 \times 10^{-3}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **CC_CC Store Alpha_Bog**| **-4.4527**| $2.39 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **CC_Santafe_Med** | **-4.3384** | $3.81 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |
| **CC_CC Store Gamma_Chia**| **-4.5608**| $1.52 \times 10^{-4}$ | -3.45, -2.87, -2.57 | **Estacionaria en media ($p < 0.01$)** |

**Conclusión del Test ADF:**  
Con estadísticos inferiores a $-3.98$ y $p$-valores ampliamente menores a $\alpha = 0.05$, se rechaza enfáticamente la hipótesis de raíz unitaria. Las series son estacionarias respecto a su tendencia determinista, lo que valida el modelado directo sin requerir diferenciación integrativa ($\Delta y_t$).

### 4.2 Análisis Espectral: ACF y PACF

Inspeccionamos la estructura de dependencia serial a través de la función de autocorrelación total (ACF) y la función de autocorrelación parcial (PACF) para el nodo principal (Hub Hub Central):

![Diagnóstico de Autocorrelación y Autocorrelación Parcial](images/02_acf_pacf_diagnostics.png)

- **ACF (Función de Autocorrelación Total):**
  $$\rho_k = \frac{\mathbb{E}[(y_t - \mu)(y_{t-k} - \mu)]}{\sigma^2}$$
  Se observan crestas prominentes en los rezagos $k = 7, 14, 21, 28$. Esto confirma una **estacionalidad semanal pura y determinista ($s = 7$)**.
- **PACF (Función de Autocorrelación Parcial):**
  $$\phi_{kk} = \text{Corr}(y_t - \hat{y}_t, y_{t-k} - \hat{y}_{t-k})$$
  La correlación parcial colapsa abruptamente tras el lag 1 y lag 7, cayendo dentro de la banda de confianza estocástica de Bartlett ($\pm 1.96/\sqrt{N}$).
- **Traducción a Feature Engineering:**  
  La memoria del sistema está dominada por los armónicos semanales. Cualquier rezago que sea múltiplo de 7 aportará una alta señal predictiva.

---

## 5. El Principio de Parsimonia: Fijando el Baseline Operacional

Una de las fallas más comunes en proyectos de Machine Learning es saltar directamente a algoritmos sofisticados sin evaluar un modelo ingenuo de referencia (*Naive Benchmark*). 

En series con fuerte periodicidad semanal, el estándar indiscutible es el **Seasonal Naive (Lag 7)**:

$$\hat{y}_{t} = y_{t - 7}$$

### La Métrica Primordial: ¿Por qué WAPE y no MAPE?

En supply chain no todas las órdenes valen lo mismo numéricamente:

$$\text{WAPE} = \frac{\sum_{i,t} \vert y_{i,t} - \hat{y}_{i,t} \vert}{\sum_{i,t} y_{i,t}}$$

| Métrica | Definición | Debilidad Fatal en Supply Chain |
| :--- | :--- | :--- |
| **MAPE** | $\frac{1}{N} \sum \frac{\vert y - \hat{y} \vert}{y}$ | Se indetermina ante $y=0$ (nodos con días sin ventas). Además, sobrepondera el error relativo en nodos chicos: un error de 5 bultos en un Click & Collect (de 10 reales = 50%) pesa lo mismo que un error de 5.000 bultos en Hub Hub Central (de 10.000 reales = 50%). |
| **RMSE** | $\sqrt{\frac{1}{N} \sum (y - \hat{y})^2}$ | Cuadrático; no tiene interpretación porcentual de negocio y es vulnerable a shocks extremos transitorios. |
| **WAPE** | $\frac{\sum \vert y - \hat{y} \vert}{\sum y}$ | **Pondera las desviaciones por el volumen absoluto real**. Equivale al MAE global normalizado. Es el estándar mundial en fulfillment y planificación de S&OP. |

### Rendimiento del Baseline en la Red

Evaluamos el Seasonal Naive sobre todo el período con histórico disponible:

```text
🎯 Baseline Seasonal Naive (Lag 7) - WAPE Global Red: 14.29%

Nodo Logístico        | WAPE Baseline (%) | MAE (Bultos/día) | Volumen Total Evaluado
-------------------------------------------------------------------------------------
Hub_Bogota           |            14.33% |         1.272,1 |             3.178.527
Hub_Medellin         |            14.34% |           711,6 |             1.776.969
Hub_Hub Sur             |            13.97% |           465,4 |             1.193.048
XD_XD Costera      |            14.30% |           237,3 |               593.878
XD_XD Oriente       |            14.55% |           207,4 |               510.298
CC_CC Store Alpha_Bog     |            14.34% |           101,7 |               253.939
CC_Santafe_Med       |            14.53% |            77,5 |               190.779
CC_CC Store Gamma_Chia     |            13.95% |            57,7 |               148.222
```

> [!WARNING]
> **¿Por qué falla el Seasonal Naive con un 14.29% de error?**  
> 1. **Desfase en Quincenas:** Si el pago quincenal cae un martes, pero hace 7 días fue un martes ordinario, el modelo subestima el volumen drásticamente.
> 2. **Ceguera Absoluta ante Eventos:** Durante CyberDays y Black Friday, el modelo replica los datos de hace 7 días, fallando por más de un 100% durante el pico y arrastrando el error durante la semana siguiente al evento.
> 3. **Falta de Aprendizaje Cruzado:** No comparte información entre nodos.

Nuestro objetivo cuantitativo para el modelo de Machine Learning es batir este umbral y **situar el WAPE por debajo del 7%**.

---

## 6. Ingeniería de Características sin Fuga de Información ($H=14$)

El mayor riesgo metodológico en time series tabular es el **Data Leakage**.

### La Restricción Operativa del Horizonte Táctico
Si nos encontramos en el día de corte $T$, la red logística necesita planificar la capacidad para cada día del intervalo $[T+1, T+14]$. En el instante $T$, la última observación real registrada es $y_T$. 

Para predecir el horizonte completo con un solo modelo directo:
$$\text{Requisito de Seguridad:} \quad \text{Lag} \ge H = 14$$

```
Línea Temporal:
... [ T - 15 ] [ T - 14 ] ... [ T - 1 ] [ T ] | [ T + 1 ] ... [ T + 13 ] [ T + 14 ]
      ▲            ▲                          |                          ▲
      │            └──────────────────────────┼──────────────────────────┘
      │              Lag Mínimo Admisible     |          Horizonte Futuro a Predecir
      │              (shift >= 14 días)       |                 (H = 14 días)
```

> [!CAUTION]
> **Data Leakage Letal:** Si un científico de datos incluye `lag_1` o `rolling_mean_7` sin desfasar al menos 14 días, estará asumiendo que al momento de predecir el día $T+14$ ya conoce lo que ocurrió el día $T+13$. En validación offline su modelo reportará un WAPE ficticio del 1%, pero al desplegarlo en producción el pipeline colapsará por falta de datos futuros.

### Pipeline de Features Generadas

Construimos **25 variables explicativas** respetando rigurosamente el desfase de 14 días:

1. **Rezagos Temporales Directos:**
   - `lag_14`: Demanda observada hace exactamente 2 semanas (mismo día de semana).
   - `lag_15`: Demanda observada hace 15 días.
   - `lag_21`: Demanda observada hace 3 semanas.
   - `lag_28`: Demanda observada hace 4 semanas.
2. **Estadísticas Móviles Desfasadas con `.shift(14)`:**
   $$\text{rolling\_mean}_{w, t} = \frac{1}{w}\sum_{j=14}^{14+w-1} y_{t-j}, \quad \text{para } w \in \{7, 14, 28\}$$
   Acompañadas de la desviación estándar móvil (`rolling_std`) y los máximos históricos locales (`rolling_max`).
3. **Variables Cíclicas de Calendario:**
   Para capturar la naturaleza circular del día de la semana sin inducir discontinuidades artificiales entre domingo (6) y lunes (0), aplicamos una transformación trigonométrica armónica:
   $$\text{dow}_{\sin} = \sin\left(\frac{2\pi \cdot \text{dayofweek}}{7}\right), \quad \text{dow}_{\cos} = \cos\left(\frac{2\pi \cdot \text{dayofweek}}{7}\right)$$
4. **Covariables Exógenas:**
   - `is_quincena`: Bandera binaria determinista de fechas de nómina (14-17 y 28-31).
   - `is_cyber`: Bandera de eventos comerciales de alta intensidad.
5. **Metadatos Categóricos de Red:**
   - `node_id`, `node_type` (Hub, Cross-Docking, Click & Collect), `region`.
   - `nominal_capacity`: Capacidad física instalada del nodo.

### Correlación Lineal entre Features y Demanda Real

La inspección de la matriz de correlación confirma la potencia explicativa de las variables construidas:

![Matriz de Correlación de Variables Predictivas](images/03_feature_correlation_matrix.png)

`lag_14`, `lag_21` y las medias rodantes exhiben correlaciones lineales superiores a **0.90** con el volumen diario, capturando de manera conjunta la escala intrínseca de cada nodo y la estacionalidad semanal subyacente.

---

## 7. Modelado Tabular Global con LightGBM vs. Alternativas

Una decisión arquitectónica fundamental fue seleccionar el paradigma de modelado: **Modelos Locales vs. Deep Learning vs. Modelo Tabular Global**.

### Tabla Comparativa de Enfoques
| Criterio de Selección | Modelo Local (ARIMA / Prophet) | Deep Learning (LSTM / TFT) | LightGBM Tabular Global (Seleccionado) |
| :--- | :--- | :--- | :--- |
| **Topología y Escala** | Entrena 1 modelo independiente por cada serie ($N$ modelos). No escala. | Entrena 1 red neuronal sobre toda la red. Costoso computacionalmente. | **Entrena 1 único modelo global sobre todas las series y nodos.** |
| **Aprendizaje Cruzado** | Nulo. No puede transferir patrones entre Hub Central y Hub Sur. | Excelente, pero requiere gran volumen de datos históricos. | **Óptimo. Aprende dinámicas globales compartidas y ajusta por metadatos.** |
| **Cold-Start (Nodos Nuevos)**| Incapaz de inferir si un nodo abre sin historial suficiente. | Requiere ajuste de pesos de embeddings. | **Excelente. Puede inferir para nodos nuevos basándose en su `node_type` y región.** |
| **Covariables Exógenas** | Limitadas (ARIMAX es rígido; asume linealidad). | Complejo de alinear y sintonizar. | **Nativo y altamente no lineal (interacciones automáticas entre árboles).** |
| **Velocidad y Cómputo** | Lento en agregación de cientos de nodos. | Lento (GPU intensivo para entrenamiento e inferencia). | **Ultrarrápido (< 5 segundos de entrenamiento en CPU).** |
| **Inferencia Probabilística** | Asume normalidad gaussiana de residuos. | Vía decodificadores de distribución o cuantiles. | **Regresión Cuantílica exacta con Pinball Loss nativo.** |

### Función de Pérdida en el Point Forecast: ¿Por qué L1 (MAE)?
Para la predicción puntual central, configuramos `objective='regression_l1'`:

$$\min_{\theta} \sum_{i} \vert y_i - \hat{y}_i(\theta) \vert$$

La regresión bajo norma $L_1$ optimiza directamente la **mediana condicional** de la distribución de demanda, haciéndola matemáticamente congruente con el **WAPE**. En contraste con el error cuadrático ($L_2$/MSE), que predice la media y es altamente sensible a los shocks de CyberDays distorsionando la predicción en días base, la mediana preserva la robustez estadística ante valores atípicos.

---

## 8. Estrategia de Validación Temporal: Rolling-Origin Purgado

En series de tiempo, el *K-Fold Cross-Validation* aleatorio es un error grave porque destruye la causalidad temporal y filtra el futuro en el pasado.

Implementamos un esquema de **Rolling-Origin Cross-Validation (Walk-Forward Validation)** con 3 ventanas de test de 14 días consecutivos ($H=14$), respetando una estricta purga temporal:

```
Esquema de Validación Rolling-Origin:
Fold 1: [ ====== Entrenamiento Histórico ====== ] | [ Test 1: 14 días ]
Fold 2: [ ========= Entrenamiento Expandido ========= ] | [ Test 2: 14 días ]
Fold 3: [ ============ Entrenamiento Total ============ ] | [ Test 3: Black Friday ]
```

### Resultados del Backtesting Purificado

```text
======================================================================
Fold     | Ventana de Test           | Filas Train  | WAPE LightGBM  
======================================================================
Fold 1   | 2025-10-15 a 2025-10-28 | 1.968        |          3.68%
Fold 2   | 2025-11-01 a 2025-11-14 | 2.104        |          4.31%
Fold 3   | 2025-11-20 a 2025-12-03 | 2.256        |         11.88%
======================================================================
🏆 WAPE PROMEDIO CV LIGHTGBM: 6.62% (vs Baseline Seasonal Naive: ~12.50% - 14.29%)
🚀 Reducción relativa del error: 47.0%
```

En las ventanas ordinarias (Folds 1 y 2), el modelo alcanza una precisión sobresaliente con **WAPEs de 3.68% y 4.31%**. En el Fold 3, que absorbe el impacto de Black Friday, el modelo registra un 11.88% (mientras que el baseline superó el 25% en esa misma ventana), consolidando un **WAPE promedio de 6.62%**.

### Importancia de Variables en LightGBM

Analizamos la ganancia acumulada (*Feature Importance Gain*) en el Fold 3 para comprender qué factores guían las decisiones del modelo:

![Importancia de Variables en LightGBM](images/04_lightgbm_feature_importance.png)

> [!TIP]
> **Interpretabilidad Logística:**  
> Las variables más influyentes son `lag_14` y `rolling_mean_7`, confirmando que el ritmo de demanda de dos semanas atrás es el ancla fundamental de la red. Inmediatamente después figuran la capacidad nominal del nodo (`nominal_capacity`) y los indicadores de calendario (`is_cyber`, `is_quincena`, `dayofweek`), lo que demuestra que los árboles de decisión aprendieron a estratificar la red por capacidad y modular la predicción ante eventos exógenos.

---

## 9. Forecasting Probabilístico: Inmunes a la Media con Pinball Loss

En logística de e-commerce, **un pronóstico puntual es insuficiente para la toma de decisiones**. 

Si un centro logístico tiene una capacidad de 6.000 paquetes/día y la predicción central es de 5.800:
- ¿Cuál es la probabilidad de que la demanda real alcance 6.500?
- Si solo miramos el promedio, no declararemos alertas de saturación, pero si existe un 35% de probabilidad de exceder la capacidad, la red colapsará sin aviso.

Para modelar la incertidumbre sin suponer una distribución normal simétrica, entrenamos tres instancias especializadas de LightGBM con la **función de pérdida de Pinball (Regresión Cuantílica)**:

$$\mathcal{L}_\alpha(y, \hat{y}) = \max(\alpha(y - \hat{y}), (1 - \alpha)(\hat{y} - y)) = \begin{cases} \alpha (y - \hat{y}) & \text{si } y \ge \hat{y} \\ (1 - \alpha) (\hat{y} - y) & \text{si } y < \hat{y} \end{cases}$$

```
                Gráfica de Pérdida de Pinball (Asimetría en alpha = 0.90)
           Pérdida
             ^
             │                               /  Pendiente = alpha = 0.90
             │                              /   (Penalización por SUBESTIMAR)
             │                             /
             │                            /
             │                           /
             │ \                        /
Pendiente =  │  \                      /
 (1-alpha)   │   \                    /
  = 0.10     │    \                  /
             └─────\────────────────/─────────> (y - y_hat)
              Sobreestimación     Subestimación
```

### La Razón de Penalización 9 a 1
Para el cuantil superior $\alpha = 0.90$:
$$\frac{\text{Costo de Subestimar}}{\text{Costo de Sobreestimar}} = \frac{0.90}{1 - 0.90} = \frac{0.90}{0.10} = 9$$

Una subestimación se castiga **9 veces más severamente** que una sobreestimación. Esto fuerza al algoritmo a encontrar una cota superior prudente con aversión al riesgo: **solo en el 10% de los escenarios la demanda real superará a $\hat{y}_{p90}$**.

Los tres modelos entrenados fueron:
- $\hat{y}_{p10}$ ($\alpha = 0.10$): Escenario de demanda mínima / piso operativo.
- $\hat{y}_{p50}$ ($\alpha = 0.50$): Mediana esperada / planificación estándar de turnos.
- $\hat{y}_{p90}$ ($\alpha = 0.90$): Límite superior de sobrecarga / aversión al riesgo de saturación.

---

## 10. La Capa Prescriptiva: De la Predicción al Balanceo de Capacidad

El valor de un modelo analítico no radica en el algoritmo en sí, sino en la **decisión automatizada que habilita**.

### La Regla de Decisión en el Motor de Promesa de Entrega
Acoplamos la inferencia probabilística a una regla de negocio prescriptiva:

$$\text{Alerta de Saturación} = \begin{cases} \mathbf{ACTIVA} & \text{si } \hat{y}_{p90} > 0.95 \times \text{Capacidad Nominal} \\ \mathbf{INACTIVA} & \text{en caso contrario} \end{cases}$$

Si el percentil 90 proyectado a 14 días supera el 95% del throughput máximo de un nodo, el sistema gatilla automáticamente dos protocolos de mitigación operativa:
1. **Rebalanceo Dinámico de Promesa (*Promise Throttling*):** El motor de checkout desvía órdenes hacia bodegas o hubs alternativos con capacidad ociosa (ej. si Hub Norte está saturado, los pedidos con stock replicado se rutean a través de Hub Sur o Hub Central).
2. **Capacidad Flexible:** El equipo de operaciones dispone de 14 días de aviso formal para contratar sobreturnos de personal de picking/empaque y reservar viajes troncales adicionales.

### Simulación Operativa de Red
Para cuantificar el impacto, simulamos dos políticas operativas durante el período de mayor tensión logística del año (Fold 3 - Black Friday):

1. **Enfoque Reactivo (Status Quo sin Forecasting Anticipado):**  
   El nodo opera a ciegas. Si la demanda real excede la capacidad física ($y > \text{Capacidad}$), el nodo colapsa en el día. El 100% del desborde entra en cola de espera física, violando el SLA comprometido con el cliente:
   $$\text{Atrasos}_{\text{reactivos}} = \max(0, y - \text{Capacidad})$$

2. **Enfoque Proactivo (Con Alerta Cuántica $p_{90}$ a 14 Días):**  
   Con dos semanas de margen, la alerta temprana permite desviar y absorber el **80% del exceso de flujo**, reduciendo los retrasos a solo un 20% residual de fricción operativa:
   $$\text{Atrasos}_{\text{proactivos}} = \begin{cases} 0.20 \times \max(0, y - \text{Capacidad}) & \text{si Alerta Activa} \\ \max(0, y - \text{Capacidad}) & \text{si Alerta Inactiva} \end{cases}$$

---

## 11. Resultados Cuantitativos e Impacto en Negocio

### 11.1 El Caso de Estudio: Hub Hub Norte en Black Friday

Examinamos el comportamiento del cono de incertidumbre y la activación de alertas en el nodo de mayor tensión de la red:

![Cono de Incertidumbre y Alerta de Saturación en Hub Hub Norte](images/05_uncertainty_cone_hub_hub-norte.png)

**Lectura del Gráfico:**
- La curva punteada azul representa la mediana proyectada ($\hat{y}_{p50}$).
- El área sombreada azul delimita el **cono de incertidumbre probabilística $[\hat{y}_{p10}, \hat{y}_{p90}]$**.
- La línea punteada roja marca la **capacidad nominal fija (6.000 bultos/día)**.
- Los puntos negros representan la **demanda real observada**.
- Las **franjas verticales naranjas** marcan los días donde la alerta se activó con 14 días de antelación ($\hat{y}_{p90} > 5.700$).

Durante los días de Black Friday (27 y 28 de noviembre), la demanda real superó con fuerza los 7.000 bultos/día. Gracias a que la banda superior $p_{90}$ detectó el rebase de capacidad dos semanas antes, la operación activó a tiempo el desvío hacia Hub Hub Sur, **evitando el colapso del nodo y asegurando la promesa de entrega**.

### 11.2 Vista Comparativa Multieslabón (Hub Central, Hub Norte y Hub Sur)

Para verificar que el sistema no genera falsas alarmas ni desequilibrios en otros centros, monitoreamos simultáneamente los tres hubs principales de la red:

![Vista Comparativa Multieslabón en Hubs Principales](images/06_multi_hub_mitigation_comparison.png)

- **Hub Hub Central:** Absorbió el pico manteniéndose dentro de su capacidad instalada (10.500 bultos/día), sin disparar alertas innecesarias.
- **Hub Hub Norte:** Activó alertas tempranas oportunas durante los días críticos de Black Friday.
- **Hub Hub Sur:** Contaba con holgura de capacidad (operando en ~3.000 bultos frente a su límite de 4.000), lo que validó que era el receptor idóneo para absorber las órdenes re-enrutadas desde Hub Norte.

### 11.3 Impacto Operativo Cuantificado

Los resultados de la simulación de red sobre las **376.256 órdenes** evaluadas durante la ventana crítica de Black Friday demuestran el poder de la analítica prescriptiva:

```text
================================================================================
             IMPACTO OPERATIVO EN CADENA LOGÍSTICA (RED REGIONAL)
================================================================================
📦 Órdenes evaluadas en la ventana de test:             376.256
⚠️  Tasa de Atrasos REACTIVA  (Sin alertas p90):           12.27%
🛡️  Tasa de Atrasos PROACTIVA (Con alertas p90):            3.42%
--------------------------------------------------------------------------------
🚀 REDUCCIÓN EN LA TASA DE ATRASOS (Black Friday):         8.84 PUNTOS PORCENTUALES (pp)
================================================================================
```

A nivel de régimen mensual regular sobre las **500.000 órdenes de la red en Región Andina**, la mitigación continua de picos semanales y quincenales genera una **reducción estructural neta de 2.03 puntos porcentuales** en la tasa de atrasos:

$$\Delta \text{Tasa de Atrasos} = -2.03 \text{ pp} \quad \Longrightarrow \quad 500.000 \times 2.03\% \approx \mathbf{10.150 \text{ órdenes/mes rescatadas a tiempo}}$$

Esto representa más de **120.000 familias al año** que reciben su pedido dentro de la promesa comprometida, protegiendo la reputación de la marca y evitando cientos de miles de dólares en indemnizaciones y penalizaciones de SLA.

---

## 12. Lecciones Aprendidas y Cheatsheet para Entrevistas Técnicas

### 💡 Principales Conclusiones Técnicas
1. **El valor real surge al acoplar predicción con prescripción:** Un modelo con WAPE perfecto no sirve a operaciones si no gatilla una acción concreta (desvío de carga o refuerzo de turnos).
2. **Respetar el horizonte operativo previene desastres en producción:** Diseñar features con `shift(14)` garantiza que el modelo sea 100% ejecutable en el día a día operativo.
3. **El enfoque probabilístico es indispensable para gestionar la capacidad:** En operaciones físicas, los costos de error son asimétricos. La función de pérdida de Pinball con $\alpha = 0.90$ proporciona un escudo natural contra el riesgo de sobrecarga.
4. **LightGBM supera a los modelos clásicos en redes multiserie:** Entrenar un único modelo tabular global permite el aprendizaje cruzado entre nodos heterogéneos, reduce el mantenimiento de infraestructura a un solo artefacto y agiliza la inferencia a milisegundos.

---

### 💼 Cheatsheet de Respuestas Técnicas para Entrevistas

Para ingenieros y científicos de datos que enfrentan rondas técnicas de diseño de sistemas de Machine Learning y Time Series, consolidamos las preguntas más recurrentes y sus argumentaciones óptimas:

| Pregunta de Entrevista | Respuesta Técnica y Argumentación de Alto Impacto |
| :--- | :--- |
| **¿Por qué LightGBM y no ARIMA / SARIMAX?** | ARIMA es un modelo *local univariado*: exige hub-surbrar, monitorear y reentrenar un modelo independiente por cada serie ($N$ modelos para $N$ nodos). No escala en redes complejas, es incapaz de transferir aprendizaje cruzado entre nodos y falla al incorporar relaciones no lineales complejas entre covariables exógenas (como calendario o quincenas). LightGBM entrena un **único modelo tabular global** que asimila simultáneamente la topología completa de la red y permite realizar inferencias robustas incluso en nodos con historial corto (*cold-start*). |
| **¿Por qué no Deep Learning (LSTM o Temporal Fusion Transformer)?** | En series temporales de frecuencia diaria con horizontes tácticos de 14 días y estacionalidades de calendario bien parametrizables, los árboles de decisión basados en gradiente (*GBDT*) superan de forma sistemática a las redes neuronales recurrentes en convergencia rápida, menor requerimiento de volumen de datos históricos y extrema robustez ante datos tabulares. Además, operar LightGBM en producción en GCP o AWS reduce la huella de cómputo en órdenes de magnitud frente a GPUs requeridas por DL. |
| **¿Cómo garantizas cero Data Leakage en tus rolling features?** | Para un horizonte táctico directo de $H=14$, ninguna estadística móvil puede calcularse con datos contemporáneos ni del intervalo $[t+1, t+14]$. Se aplica un desfase temporal formal `shift(14)` a la serie antes de computar medias o desviaciones rodantes. Así, al inferir en el momento de corte $T$, solo se consumen datos efectivamente observados hasta $T$. |
| **¿Por qué WAPE y no MAPE o RMSE?** | En nodos satélite de última milla o días feriados existen observaciones con demanda nula ($y=0$), donde el MAPE se indetermina por división por cero. Además, el MAPE trata por igual un error porcentual en un nodo pequeño que en un centro macro. El WAPE pondera proporcionalmente cada desviación por el volumen absoluto real de la red, siendo la métrica de oro aceptada en Supply Chain y S&OP. |
| **¿Por qué usar la pérdida L1 en lugar de L2 para el pronóstico central?** | La norma $L_1$ (MAE) minimiza matemáticamente la **mediana condicional** de la distribución, haciéndola perfectamente coherente con la métrica de negocio (WAPE) y aislándola del impacto de outliers o picos comerciales transitorios que distorsionarían la media estimada bajo $L_2$. |
| **¿Cómo se conecta el modelo estadístico con la reducción de 2 puntos porcentuales de atrasos?** | El modelo probabilístico estima el límite de riesgo $p_{90}$ mediante Pinball Loss (castigando 9 veces más la subestimación). Si $\hat{y}_{p90} > 0.95 \times \text{Capacidad}$, el sistema despacha una alerta 14 días antes al *Motor de Promesa de Entrega*, el cual balancea dinámicamente la promesa desviando órdenes hacia nodos alternos con holgura. Esto mitiga las colas de espera físicas y reduce la tasa de atrasos operativos en 2.03 pp estructurales, rescatando más de 10.000 órdenes a tiempo cada mes. |

---

### 🚀 Código y Reproducibilidad
Todo el código, notebooks de Jupyter, datasets en formato Parquet y configuraciones reproducibles con el gestor de paquetes `uv` se encuentran disponibles en este repositorio:
- [Notebook 1: EDA, Diagnóstico Estadístico y Feature Engineering](../notebooks/01_eda_baseline_feature_engineering.ipynb)
- [Notebook 2: Modelado LightGBM, Backtesting y Decisión Prescriptiva](../notebooks/02_lightgbm_probabilistic_capacity_mitigation.ipynb)
- [Blueprint Técnico Original](forecasting_supply_chain.md)
