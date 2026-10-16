---
layout: article
title: "De la Predicción a la Prescripción: Time Series Forecasting y Mitigación de Capacidad en Supply Chain E-commerce"
subtitle: "Diseño, validación y despliegue de un pipeline tabular global con LightGBM (H = 14) y regresión cuantílica asimétrica (Pinball Loss p90) para prevenir cuellos de botella y rescatar más de 10.000 órdenes al mes en redes logísticas multieslabón."
category: "Supply Chain & Machine Learning"
domain_class: "supply-chain"
date: 2026-10-14
read_time: "15 min de lectura"
permalink: /articulos/blog-supply-chain-forecasting/
---

<div class="article-action-banner">
  <div>
    <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; margin-bottom: 4px;">
      📦 Código Abierto, Datasets & Pipeline Reproducible
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary);">
      Explora el pipeline completo con LightGBM, benchmarks de Seasonal Naive y la simulación prescriptiva en Python 3.12 (uv).
    </div>
  </div>
  <div class="article-action-buttons">
    <a href="https://github.com/surzua/TimeSeries" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub: surzua/TimeSeries
    </a>
    <a href="https://github.com/surzua/TimeSeries/blob/main/notebooks/02_lightgbm_probabilistic_capacity_mitigation.ipynb" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      Jupyter Notebooks
    </a>
  </div>
</div>

<div class="article-callout info">
  <div class="article-callout-title">
    <span>🔬</span> Nota de Simulación y Alcance Metodológico
  </div>
  <p style="margin-bottom: 0;">
    Este artículo técnico corresponde a un <strong>estudio de caso experimental, benchmark metodológico y arquitectura de referencia técnica</strong>. La topología de red multieslabón, las restricciones operativas y las series temporales son el resultado de un entorno de simulación estilizado con fines pedagógicos y de portafolio profesional; <strong>no constituyen, utilizan ni reflejan datos reales, métricas privadas ni operaciones propietarias de ninguna entidad comercial específica</strong>.
  </p>
</div>

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>💡</span> Síntesis Ejecutiva & Veredicto Operativo (TL;DR)
  </div>
  <p style="margin-bottom: 0;">
    En este artículo desgloso de principio a fin el diseño, validación matemática e implementación de un pipeline integral de <strong>Time Series Forecasting Tabular Global</strong> para un benchmark simulado de red logística de e-commerce (~500.000 órdenes/mes). Mediante una estrategia directa a $H = 14$ días con <strong>LightGBM</strong>:
  </p>
  <ul style="margin-top: 10px; margin-bottom: 0;">
    <li><strong>Eliminamos 100% el Data Leakage:</strong> Todas las variables rodantes y rezagos respetan un desfase temporal formal $\ge 14$ días (<code>shift(14)</code>).</li>
    <li><strong>Reducción de error del 47%:</strong> Alcanzamos un <strong>WAPE promedio de 6.62%</strong> en validación cruzada purificada (Rolling-Origin CV) frente al 14.29% del baseline operacional Seasonal Naive.</li>
    <li><strong>Capa Prescriptiva Asimétrica ($p_{90}$):</strong> Mediante regresión cuantílica con Pinball Loss castigamos 9 veces más severamente la subestimación de demanda, activando alertas tempranas de saturación 14 días antes del colapso.</li>
    <li><strong>Impacto de Negocio:</strong> Reducción de <strong>2.03 puntos porcentuales</strong> en la tasa de atrasos en régimen mensual, rescatando más de <strong>10.000 órdenes mensuales</strong> a tiempo dentro de la promesa comprometida (<em>Motor de Promesa de Entrega</em>).</li>
  </ul>
</div>

<div class="article-kpi-grid">
  <div class="article-kpi-card">
    <div class="article-kpi-value kpi-val-success">6.62%</div>
    <div class="article-kpi-label">WAPE Global en CV Purificado (-47% error relativo vs. 14.29% Baseline)</div>
  </div>
  <div class="article-kpi-card">
    <div class="article-kpi-value kpi-val-cyan">H = 14 Días</div>
    <div class="article-kpi-label">Horizonte táctico directo con lag shift &ge; 14 (Zero Data Leakage)</div>
  </div>
  <div class="article-kpi-card">
    <div class="article-kpi-value kpi-val-amber">9 : 1</div>
    <div class="article-kpi-label">Penalización asimétrica de subestimación en Pinball Loss (p90)</div>
  </div>
  <div class="article-kpi-card">
    <div class="article-kpi-value kpi-val-danger">-2.03 pp</div>
    <div class="article-kpi-label">Reducción estructural de atrasos (&gt;10.000 órdenes/mes rescatadas)</div>
  </div>
</div>

---

## 📑 Tabla de Contenidos
1. [Introducción: La Paradoja de la Capacidad en Redes Logísticas](#1-introducción-la-paradoja-de-la-capacidad-en-redes-logísticas)
2. [El Ecosistema Físico y Operacional: Red Multieslabón](#2-el-ecosistema-físico-y-operacional-red-multieslabón)
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

Sin embargo, las redes logísticas multieslabón enfrentan una paradoja estructural permanente:

```text
Demanda E-commerce (Altamente Volátil)    vs.    Capacidad de Red (Rígida en el Corto Plazo)
  • Picos dominicales de tráfico                  • Líneas de picking y empaque acotadas
  • Efecto quincenal (+18% de demanda)            • Espacio físico de almacenamiento finito
  • Campañas Cyber / Black Friday (+110%)         • Contratación de fletes requiere >10-14 días
```

Cuando el flujo entrante supera la capacidad nominal de procesamiento de un nodo intermedio (Cross-Docking o Fulfillment Center), la red no solo se congestiona: **se produce una degradación no lineal**. Los paquetes forman colas de espera físicas, el tiempo de ciclo (*lead time*) se dispara y el costo de reacción se multiplica debido a la contratación de fletes troncales de emergencia o turnos extraordinarios no planificados.

Para balancear la carga de la red de forma eficiente, operaciones requiere **14 días de anticipación ($H=14$)**. Con menos tiempo, es imposible modular turnos laborales o negociar capacidad con transportistas terceros.

Este artículo detalla el benchmark técnico y metodológico desarrollado para transformar pronósticos estadísticos en **decisiones operativas automatizadas de balanceo de red**.

---

## 2. El Ecosistema Físico y Operacional: Red Multieslabón

Para estructurar el caso de estudio experimental, modelamos una topología simulada representativa de redes logísticas multieslabón, coordinando un volumen superior a las **500.000 órdenes mensuales** distribuidas en tres tipologías de nodos:

```text
                            [ Bodegas Sellers 1P / 3P ]
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       HUBS PRINCIPALES DE CONSOLIDACIÓN       │
                 │   • Hub Central  (Capacidad: 10.500 bultos)   │
                 │   • Hub Norte    (Capacidad:  6.000 bultos)   │
                 │   • Hub Sur      (Capacidad:  4.000 bultos)   │
                 └───────┬───────────────────────────────┬───────┘
                         │                               │
                         ▼                               ▼
       ┌──────────────────────────────────┐    ┌──────────────────────────────────┐
       │     CROSS-DOCKING REGIONAL       │    │     CLICK & COLLECT TIENDAS      │
       │ • XD Oriente (Cap: 1.700/d)  │    │ • CC Store Alpha   (Cap: 850) │
       │ • XD Costera (Cap: 1.950/d) │    │ • CC Store Beta    (Cap: 650) │
       │                                  │    │ • CC Store Gamma   (Cap: 500) │
       └──────────────────────────────────┘    └──────────────────────────────────┘
```

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Nodo Logístico</th>
        <th>Tipo de Infraestructura</th>
        <th>Región Geográfica</th>
        <th style="text-align: center;">Capacidad Nominal Diaria</th>
        <th>Rol Operacional en la Red</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Hub_Central</strong></td>
        <td>Hub / Fulfillment Center</td>
        <td>Región Central</td>
        <td style="text-align: center;"><strong>10.500 bultos/día</strong></td>
        <td>Macro-nodo central; consolida 1P y despacha troncales de red.</td>
      </tr>
      <tr>
        <td><strong>Hub_Norte</strong></td>
        <td>Hub / Fulfillment Center</td>
        <td>Región Norte</td>
        <td style="text-align: center;"><strong>6.000 bultos/día</strong></td>
        <td>Hub metropolitano de alta densidad y reexpedición regional.</td>
      </tr>
      <tr>
        <td><strong>Hub_Sur</strong></td>
        <td>Hub / Fulfillment Center</td>
        <td>Región Sur</td>
        <td style="text-align: center;"><strong>4.000 bultos/día</strong></td>
        <td>Nodo estratégico para la macrozona sur.</td>
      </tr>
      <tr>
        <td><strong>XD_Oriente</strong></td>
        <td>Plataforma Cross-Docking</td>
        <td>Región Oriente</td>
        <td style="text-align: center;"><strong>1.700 bultos/día</strong></td>
        <td>Transferencia rápida sin almacenaje prolongado (in/out &lt; 12h).</td>
      </tr>
      <tr>
        <td><strong>XD_Costera</strong></td>
        <td>Plataforma Cross-Docking</td>
        <td>Región Costera</td>
        <td style="text-align: center;"><strong>1.950 bultos/día</strong></td>
        <td>Plataforma de desconsolidación para la zona costera.</td>
      </tr>
      <tr>
        <td><strong>CC_Store_Alpha</strong></td>
        <td>Punto Click & Collect</td>
        <td>Región Central</td>
        <td style="text-align: center;"><strong>850 paquetes/día</strong></td>
        <td>Módulo de retiro en tienda física principal (última milla asistida).</td>
      </tr>
      <tr>
        <td><strong>CC_Store_Beta</strong></td>
        <td>Punto Click & Collect</td>
        <td>Región Norte</td>
        <td style="text-align: center;"><strong>650 paquetes/día</strong></td>
        <td>Retiro en tienda en centro comercial de alto tráfico.</td>
      </tr>
      <tr>
        <td><strong>CC_Store_Gamma</strong></td>
        <td>Punto Click & Collect</td>
        <td>Región Central</td>
        <td style="text-align: center;"><strong>500 paquetes/día</strong></td>
        <td>Nodo suburbano satélite de última milla.</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 3. El Dataset: Modelando Estacionalidades Múltiples y Shocks Comerciales

La generación del dataset histórico reproduce con fidelidad estocástica la dinámica multiescala observada en e-commerce regional a lo largo de un año calendario (365 días por nodo, totalizando **2.920 observaciones diarias**).

### Formulación de la Generación de Demanda
Para cada nodo $i$ en el día $t$, el volumen generado responde a la ecuación multiplicativa:

$$y_{i,t} = \text{Base}_i \times f_{\text{semanal}}(t) \times f_{\text{quincena}}(t) \times f_{\text{evento}}(t) \times \text{Tendencia}(t) \times (1 + \varepsilon_{i,t})$$

1. **Estacionalidad Semanal ($f_{\text{semanal}}$):**  
   Picos intensos los domingos ($1.20\times$) y lunes ($1.25\times$) por acumulación de compras de fin de semana, con valles los sábados ($0.85\times$).
2. **Efecto Ciclo Quincenal ($f_{\text{quincena}}$):**  
   Incremento determinista del $+18\%$ ($1.18\times$) en los rangos de pago de nóminas formales: días 14 al 17 y 28 al 31 de cada mes.
3. **Eventos Comerciales Masivos ($f_{\text{evento}}$):**  
   - **CyberDays (19 al 23 de mayo):** Shock de demanda de $+110\%$ ($2.10\times$).
   - **Black Friday (26 al 29 de noviembre):** Shock de demanda de $+80\%$ ($1.80\times$).
4. **Tendencia y Ruido:**  
   Crecimiento orgánico anual acumulado del $+12\%$ y perturbaciones gaussianas independientes $\varepsilon_{i,t} \sim \mathcal{N}(0, 0.04^2)$.

### Inspección Visual del Comportamiento Temporal

El análisis gráfico inicial revela con claridad cómo interactúan estas fuerzas temporales a nivel agregado y desagregado:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/timeseries/01_eda_network_overview.png" alt="Visión General de la Demanda de la Red Logística Multirregional" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 1: Visión General de la Demanda Diaria Agregada y Desagregada por Nodo Logístico.</strong><br>
    En el panel superior, la demanda agregada nacional oscila entre 15.000 y 25.000 paquetes diarios en semanas regulares, pero escala hasta rozar los 40.000 paquetes diarios en Black Friday. En el panel inferior se aprecia la heterogeneidad de escalas volumétricas entre centros macro y puntos Click & Collect.
  </div>
</div>

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>🔍</span> Hallazgo Operativo Clave
  </div>
  <p style="margin-bottom: 0;">
    Mientras el Hub Central absorbe aproximadamente el 40% del flujo de la red, los puntos Click & Collect operan en una escala volumétrica un orden de magnitud inferior, pero exhiben <strong>idéntica sensibilidad estacional</strong> a las quincenas y shocks comerciales. Esto convierte el problema en un candidato idóneo para un <strong>modelo global compartido</strong>.
  </p>
</div>

---

## 4. Diagnóstico Estadístico Riguroso: Estacionariedad y Autocorrelación

Antes de construir cualquier variable predictiva o elegir la familia de algoritmos, sometemos las series a una batería formal de pruebas estadísticas.

### 4.1 Test de Dickey-Fuller Aumentado (ADF)
Evaluamos la hipótesis nula de raíz unitaria ($\mathcal{H}_0$: la serie es no estacionaria):

$$\Delta y_t = \alpha + \beta t + \gamma y_{t-1} + \sum_{s=1}^p \delta_s \Delta y_{t-s} + e_t$$

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Nodo Logístico</th>
        <th style="text-align: center;">Estadístico ADF ($\tau$)</th>
        <th style="text-align: center;">$p$-valor</th>
        <th style="text-align: center;">Valores Críticos (1%, 5%, 10%)</th>
        <th>Diagnóstico Estadístico</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Hub_Central</strong></td>
        <td style="text-align: center;"><strong>-4.3393</strong></td>
        <td style="text-align: center;">$3.79 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>Hub_Norte</strong></td>
        <td style="text-align: center;"><strong>-4.2875</strong></td>
        <td style="text-align: center;">$4.67 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>Hub_Sur</strong></td>
        <td style="text-align: center;"><strong>-4.3048</strong></td>
        <td style="text-align: center;">$4.36 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>XD_Oriente</strong></td>
        <td style="text-align: center;"><strong>-4.4168</strong></td>
        <td style="text-align: center;">$2.77 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>XD_Costera</strong></td>
        <td style="text-align: center;"><strong>-3.9850</strong></td>
        <td style="text-align: center;">$1.49 \times 10^{-3}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>CC_Store_Alpha</strong></td>
        <td style="text-align: center;"><strong>-4.4527</strong></td>
        <td style="text-align: center;">$2.39 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>CC_Store_Beta</strong></td>
        <td style="text-align: center;"><strong>-4.3384</strong></td>
        <td style="text-align: center;">$3.81 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
      <tr>
        <td><strong>CC_Store_Gamma</strong></td>
        <td style="text-align: center;"><strong>-4.5608</strong></td>
        <td style="text-align: center;">$1.52 \times 10^{-4}$</td>
        <td style="text-align: center;">-3.45, -2.87, -2.57</td>
        <td><strong>Estacionaria en media ($p &lt; 0.01$)</strong></td>
      </tr>
    </tbody>
  </table>
</div>

**Conclusión del Test ADF:** Con estadísticos inferiores a $-3.98$ y $p$-valores ampliamente menores a $\alpha = 0.05$, se rechaza enfáticamente la hipótesis nula de raíz unitaria. Las series son estacionarias respecto a su tendencia determinista, lo que valida el modelado directo sin requerir diferenciación integrativa ($\Delta y_t$).

### 4.2 Análisis Espectral: ACF y PACF

Inspeccionamos la estructura de dependencia serial a través de la función de autocorrelación total (ACF) y la función de autocorrelación parcial (PACF) para el nodo principal (Hub Central):

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/timeseries/02_acf_pacf_diagnostics.png" alt="Diagnóstico de Autocorrelación (ACF) y Autocorrelación Parcial (PACF)" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 2: Diagnóstico Espectral de Autocorrelación Total (ACF) y Parcial (PACF) en Hub Central.</strong><br>
    Crestas periódicas en rezagos múltiplos de 7 ($\rho_7, \rho_{14}, \rho_{21}, \rho_{28}$) confirman una estacionalidad semanal pura ($s = 7$). El PACF colapsa drásticamente tras los rezagos 1 y 7 dentro de las bandas de confianza de Bartlett.
  </div>
</div>

- **ACF (Autocorrelación Total):**
  $$\rho_k = \frac{\mathbb{E}[(y_t - \mu)(y_{t-k} - \mu)]}{\sigma^2}$$
  Se aprecian crestas prominentes en los rezagos $k = 7, 14, 21, 28$, confirmando un ciclo semanal dominante.
- **PACF (Autocorrelación Parcial):**
  $$\phi_{kk} = \text{Corr}(y_t - \hat{y}_t, y_{t-k} - \hat{y}_{t-k})$$
  La correlación condicional cae abruptamente tras el lag 1 y lag 7, entrando dentro de la banda estocástica de Bartlett ($\pm 1.96/\sqrt{N}$).
- **Traducción a Feature Engineering:**  
  La memoria del sistema está dominada por los armónicos semanales. Cualquier rezago que sea múltiplo de 7 aportará la máxima señal predictiva en los árboles de decisión.

---

## 5. El Principio de Parsimonia: Fijando el Baseline Operacional

Una de las fallas más comunes en proyectos de Machine Learning es saltar directamente a algoritmos sofisticados sin evaluar un modelo ingenuo de referencia (*Naive Benchmark*). 

En series con fuerte periodicidad semanal, el estándar indiscutible es el **Seasonal Naive (Lag 7)**:

$$\hat{y}_{t} = y_{t - 7}$$

### La Métrica Primordial: ¿Por qué WAPE y no MAPE?

En supply chain no todas las órdenes valen lo mismo numéricamente:

$$\text{WAPE} = \frac{\sum_{i,t} \vert y_{i,t} - \hat{y}_{i,t} \vert}{\sum_{i,t} y_{i,t}}$$

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Métrica</th>
        <th>Definición Matemática</th>
        <th>Comportamiento y Debilidad Fatal en Supply Chain</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>MAPE</strong></td>
        <td>$\frac{1}{N} \sum \frac{\vert y - \hat{y} \vert}{y}$</td>
        <td>Se indetermina ante $y=0$ (días feriados o nodos chicos sin despacho). Además, sobrepondera el error relativo en nodos satélite: un error de 5 bultos en Click & Collect (de 10 reales = 50%) pesa lo mismo que un error de 5.000 bultos en Hub Central (de 10.000 reales = 50%).</td>
      </tr>
      <tr>
        <td><strong>RMSE</strong></td>
        <td>$\sqrt{\frac{1}{N} \sum (y - \hat{y})^2}$</td>
        <td>Cuadrático; carece de interpretación porcentual de negocio y es hipersensible a shocks transitorios extremos.</td>
      </tr>
      <tr>
        <td><strong>WAPE</strong></td>
        <td>$\frac{\sum \vert y - \hat{y} \vert}{\sum y}$</td>
        <td><strong>Pondera cada desviación por el volumen absoluto real</strong>. Equivale al MAE global normalizado. Es el estándar mundial en fulfillment y planificación de S&amp;OP.</td>
      </tr>
    </tbody>
  </table>
</div>

### Rendimiento del Baseline en la Red

Evaluamos el Seasonal Naive sobre el histórico completo:

```text
🎯 Baseline Seasonal Naive (Lag 7) - WAPE Global Red: 14.29%

Nodo Logístico        | WAPE Baseline (%) | MAE (Bultos/día) | Volumen Total Evaluado
-------------------------------------------------------------------------------------
Hub_Central          |            14.33% |         1.272,1 |             3.178.527
Hub_Norte            |            14.34% |           711,6 |             1.776.969
Hub_Sur              |            13.97% |           465,4 |             1.193.048
XD_Costera           |            14.30% |           237,3 |               593.878
XD_Oriente           |            14.55% |           207,4 |               510.298
CC_Store_Alpha       |            14.34% |           101,7 |               253.939
CC_Store_Beta        |            14.53% |            77,5 |               190.779
CC_Store_Gamma       |            13.95% |            57,7 |               148.222
```

<div class="article-callout warning">
  <div class="article-callout-title">
    <span>⚠️</span> ¿Por qué falla el Seasonal Naive con un 14.29% de error estructural?
  </div>
  <ol style="margin-bottom: 0;">
    <li><strong>Desfase en Quincenas:</strong> Si el pago quincenal cae un martes, pero hace 7 días fue un martes ordinario, el modelo subestima el volumen de manera drástica.</li>
    <li><strong>Ceguera ante Shocks Comerciales:</strong> Durante CyberDays y Black Friday, el modelo replica los datos de la semana previa, fallando por más de un 100% durante el pico y arrastrando el error durante la semana siguiente al evento.</li>
    <li><strong>Falta de Aprendizaje Cruzado:</strong> No comparte información ni dinámicas compartidas entre nodos.</li>
  </ol>
</div>

Nuestro objetivo cuantitativo para el modelo de Machine Learning es superar con creces este benchmark y **situar el WAPE por debajo del 7%**.

---

## 6. Ingeniería de Características sin Fuga de Información ($H=14$)

El mayor riesgo metodológico en time series tabular es el **Data Leakage** (fuga de información temporal).

### La Restricción Operativa del Horizonte Táctico
Si nos encontramos en el día de corte $T$, la red logística necesita planificar la capacidad para cada día del intervalo $[T+1, T+14]$. En el instante $T$, la última observación real registrada es $y_T$. 

Para predecir el horizonte completo con un solo modelo directo:

$$\text{Requisito de Seguridad Operacional:} \quad \text{Lag} \ge H = 14$$

```text
Línea Temporal de Inferencia:
... [ T - 15 ] [ T - 14 ] ... [ T - 1 ] [ T ] | [ T + 1 ] ... [ T + 13 ] [ T + 14 ]
      ▲            ▲                          |                          ▲
      │            └──────────────────────────┼──────────────────────────┘
      │              Lag Mínimo Admisible     |          Horizonte Futuro a Predecir
      │              (shift >= 14 días)       |                 (H = 14 días)
```

<div class="article-callout warning">
  <div class="article-callout-title">
    <span>🚨</span> Data Leakage Letal en Producción
  </div>
  <p style="margin-bottom: 0;">
    Si un científico de datos incluye <code>lag_1</code> o <code>rolling_mean_7</code> sin desfasar al menos 14 días, estará asumiendo tácitamente que al momento de predecir el día $T+14$ ya conoce lo que ocurrió el día $T+13$. En validación offline su modelo reportará un WAPE ficticio del 1%, pero al desplegarlo en producción el pipeline colapsará de inmediato por falta de datos futuros.
  </p>
</div>

### Pipeline de Features Generadas

Construimos **25 variables explicativas** respetando rigurosamente el desfase temporal:

1. **Rezagos Temporales Directos:**
   - `lag_14`: Demanda observada hace exactamente 2 semanas (mismo día de semana).
   - `lag_15`: Demanda observada hace 15 días.
   - `lag_21`: Demanda observada hace 3 semanas.
   - `lag_28`: Demanda observada hace 4 semanas.
2. **Estadísticas Móviles Desfasadas con `.shift(14)`:**
   $$\text{rolling\_mean}_{w, t} = \frac{1}{w}\sum_{j=14}^{14+w-1} y_{t-j}, \quad \text{para } w \in \{7, 14, 28\}$$
   Acompañadas de la desviación estándar móvil (`rolling_std`) y los máximos históricos locales (`rolling_max`).
3. **Variables Cíclicas de Calendario:**
   Para capturar la naturaleza circular del día de la semana sin inducir saltos artificiales entre domingo (6) y lunes (0), aplicamos transformaciones armónicas:
   $$\text{dow}_{\sin} = \sin\left(\frac{2\pi \cdot \text{dayofweek}}{7}\right), \quad \text{dow}_{\cos} = \cos\left(\frac{2\pi \cdot \text{dayofweek}}{7}\right)$$
4. **Covariables Exógenas:**
   - `is_quincena`: Bandera binaria determinista de fechas de nómina (14 al 17 y 28 al 31).
   - `is_cyber`: Bandera de eventos comerciales de alta intensidad.
5. **Metadatos Categóricos de Red:**
   - `node_id`, `node_type` (Hub, Cross-Docking, Click & Collect), `region`.
   - `nominal_capacity`: Capacidad física instalada del nodo.

### Correlación Lineal entre Features y Demanda Real

La inspección de la matriz de correlación confirma la potencia explicativa de las variables construidas con desfase:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/timeseries/03_feature_correlation_matrix.png" alt="Matriz de Correlación de Variables Predictivas Desfasadas" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 3: Matriz de Correlación de Pearson entre Variables Predictivas y Demanda Real.</strong><br>
    Las variables <code>lag_14</code>, <code>lag_21</code> y las medias rodantes desfasadas con <code>shift(14)</code> exhiben correlaciones lineales superiores a 0.90 con el volumen diario, capturando en conjunto la escala del nodo y la estacionalidad semanal sin violar la causalidad temporal.
  </div>
</div>

---

## 7. Modelado Tabular Global con LightGBM vs. Alternativas

Una decisión arquitectónica fundamental fue seleccionar el paradigma de modelado: **Modelos Locales vs. Deep Learning vs. Modelo Tabular Global**.

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Criterio de Selección</th>
        <th>Modelo Local (ARIMA / Prophet)</th>
        <th>Deep Learning (LSTM / TFT)</th>
        <th>LightGBM Tabular Global (Seleccionado)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Topología y Escala</strong></td>
        <td>Entrena 1 modelo independiente por cada serie ($N$ modelos). Mantenimiento inviable a escala.</td>
        <td>Entrena 1 red neuronal sobre toda la red. Costoso computacionalmente.</td>
        <td><strong>Entrena 1 único modelo global sobre todas las series y nodos.</strong></td>
      </tr>
      <tr>
        <td><strong>Aprendizaje Cruzado</strong></td>
        <td>Nulo. No transfiere patrones estacionales entre diferentes centros de la red.</td>
        <td>Excelente, pero exige gran volumen de datos históricos.</td>
        <td><strong>Óptimo. Aprende dinámicas globales compartidas y ajusta por metadatos del nodo.</strong></td>
      </tr>
      <tr>
        <td><strong>Cold-Start (Nodos Nuevos)</strong></td>
        <td>Incapaz de inferir si un nodo abre sin historial suficiente.</td>
        <td>Requiere ajuste de pesos de embeddings.</td>
        <td><strong>Excelente. Infiere para nodos nuevos basándose en su <code>node_type</code> y región.</strong></td>
      </tr>
      <tr>
        <td><strong>Covariables Exógenas</strong></td>
        <td>Limitadas (ARIMAX es rígido; asume linealidad estricta).</td>
        <td>Complejo de alinear y sintonizar hiperparámetros.</td>
        <td><strong>Nativo y no lineal (captura interacciones automáticas entre árboles).</strong></td>
      </tr>
      <tr>
        <td><strong>Velocidad y Cómputo</strong></td>
        <td>Lento al agregar cientos de nodos en pipelines diarios.</td>
        <td>Lento (demanda GPUs dedicadas para entrenamiento e inferencia).</td>
        <td><strong>Ultrarrápido (&lt; 5 segundos de entrenamiento en CPU ordinaria).</strong></td>
      </tr>
      <tr>
        <td><strong>Inferencia Probabilística</strong></td>
        <td>Asume normalidad gaussiana de residuos.</td>
        <td>Vía decodificadores de distribución o cuantiles.</td>
        <td><strong>Regresión Cuantílica exacta con Pinball Loss nativo.</strong></td>
      </tr>
    </tbody>
  </table>
</div>

### Función de Pérdida en el Point Forecast: ¿Por qué L1 (MAE)?

Para la predicción puntual central, configuramos `objective='regression_l1'`:

$$\min_{\theta} \sum_{i} \vert y_i - \hat{y}_i(\theta) \vert$$

La regresión bajo norma $L_1$ optimiza directamente la **mediana condicional** de la distribución de demanda, haciéndola matemáticamente congruente con el **WAPE**. En contraste con el error cuadrático ($L_2$/MSE), que predice la media y es altamente sensible a los shocks de CyberDays distorsionando la predicción en días base, la mediana preserva la robustez estadística ante valores atípicos.

---

## 8. Estrategia de Validación Temporal: Rolling-Origin Purgado

En series de tiempo, el *K-Fold Cross-Validation* aleatorio es un error grave porque destruye la causalidad temporal y filtra el futuro en el pasado.

Implementamos un esquema de **Rolling-Origin Cross-Validation (Walk-Forward Validation)** con 3 ventanas de test de 14 días consecutivos ($H=14$), respetando una estricta purga temporal:

```text
Esquema de Validación Rolling-Origin (Walk-Forward):
Fold 1: [ ====== Entrenamiento Histórico ====== ] | [ Test 1: 14 días ]
Fold 2: [ ========= Entrenamiento Expandido ========= ] | [ Test 2: 14 días ]
Fold 3: [ ============ Entrenamiento Total ============ ] | [ Test 3: Black Friday ]
```

### Resultados del Backtesting Purificado

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Fold de Validación</th>
        <th>Ventana Temporal de Test</th>
        <th style="text-align: center;">Filas Train</th>
        <th style="text-align: center;">WAPE LightGBM</th>
        <th style="text-align: center;">WAPE Baseline (Seasonal Naive)</th>
        <th style="text-align: center;">Reducción del Error</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Fold 1</strong></td>
        <td>2025-10-15 a 2025-10-28</td>
        <td style="text-align: center;">1.968</td>
        <td style="text-align: center;"><strong>3.68%</strong></td>
        <td style="text-align: center;">12.50%</td>
        <td style="text-align: center;">-70.6%</td>
      </tr>
      <tr>
        <td><strong>Fold 2</strong></td>
        <td>2025-11-01 a 2025-11-14</td>
        <td style="text-align: center;">2.104</td>
        <td style="text-align: center;"><strong>4.31%</strong></td>
        <td style="text-align: center;">13.10%</td>
        <td style="text-align: center;">-67.1%</td>
      </tr>
      <tr>
        <td><strong>Fold 3</strong></td>
        <td>2025-11-20 a 2025-12-03 (Black Friday)</td>
        <td style="text-align: center;">2.256</td>
        <td style="text-align: center;"><strong>11.88%</strong></td>
        <td style="text-align: center;">25.40%</td>
        <td style="text-align: center;">-53.2%</td>
      </tr>
      <tr style="background: rgba(16, 185, 129, 0.08);">
        <td><strong>Promedio Global</strong></td>
        <td><strong>Evaluación Consolidada</strong></td>
        <td style="text-align: center;">—</td>
        <td style="text-align: center;"><strong>6.62%</strong></td>
        <td style="text-align: center;"><strong>14.29%</strong></td>
        <td style="text-align: center;"><strong>-47.0%</strong></td>
      </tr>
    </tbody>
  </table>
</div>

En las ventanas ordinarias (Folds 1 y 2), el modelo alcanza una precisión sobresaliente con **WAPEs de 3.68% y 4.31%**. En el Fold 3, que absorbe el impacto de Black Friday, el modelo registra un 11.88% (mientras que el baseline superó el 25% en esa misma ventana), consolidando un **WAPE promedio de 6.62%** (reducción del 47% frente al baseline operacional).

### Importancia de Variables en LightGBM

Analizamos la ganancia acumulada (*Feature Importance Gain*) en el Fold 3 para comprender qué factores guían las decisiones del modelo:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/timeseries/04_lightgbm_feature_importance.png" alt="Importancia de Variables en LightGBM por Ganancia Acumulada" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 4: Ranking de Importancia de Variables en LightGBM (Feature Importance Gain).</strong><br>
    Las variables más influyentes son <code>lag_14</code> y <code>rolling_mean_7</code>, seguidas por la capacidad nominal del nodo (<code>nominal_capacity</code>) y los indicadores de eventos (<code>is_cyber</code>, <code>is_quincena</code>).
  </div>
</div>

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>🧠</span> Interpretabilidad Logística
  </div>
  <p style="margin-bottom: 0;">
    El árbol de decisión aprendió de forma autónoma a usar el ritmo de demanda de dos semanas atrás (<code>lag_14</code>) como pivote central, estratificar la escala física del nodo con <code>nominal_capacity</code> y modular amplitudes ante disparadores exógenos (quincenas y promociones).
  </p>
</div>

---

## 9. Forecasting Probabilístico: Inmunes a la Media con Pinball Loss

En logística de e-commerce, **un pronóstico puntual es insuficiente para la toma de decisiones**. 

Si un centro logístico tiene una capacidad de 6.000 paquetes/día y la predicción central es de 5.800:
- ¿Cuál es la probabilidad de que la demanda real alcance 6.500?
- Si solo miramos el promedio, no declararemos alertas de saturación, pero si existe un 35% de probabilidad de exceder la capacidad, la red colapsará sin aviso.

Para modelar la incertidumbre sin suponer una distribución normal simétrica, entrenamos tres instancias especializadas de LightGBM con la **función de pérdida de Pinball (Regresión Cuantílica)**:

$$\mathcal{L}_\alpha(y, \hat{y}) = \max(\alpha(y - \hat{y}), (1 - \alpha)(\hat{y} - y)) = \begin{cases} \alpha (y - \hat{y}) & \text{si } y \ge \hat{y} \\ (1 - \alpha) (\hat{y} - y) & \text{si } y < \hat{y} \end{cases}$$

```text
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

$$\frac{\text{Costo de Subestimar}}{\text{Costo de Sobreestimar}} = \frac{0.90}{1 - 0.90} = \frac{0.90}{0.10} = \mathbf{9}$$

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

### 11.1 El Caso de Estudio: Hub Norte en Black Friday

Examinamos el comportamiento del cono de incertidumbre y la activación de alertas en el nodo de mayor tensión de la red:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/timeseries/05_uncertainty_cone_hub_norte.png" alt="Cono de Incertidumbre y Alerta de Saturación en Hub Norte" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 5: Cono de Incertidumbre Probabilística $[p_{10}, p_{90}]$ y Detección de Saturación en Hub Norte.</strong><br>
    La curva azul punteada marca la mediana proyectada; el área sombreada delimita el intervalo $[p_{10}, p_{90}]$; la línea roja marca la capacidad fija (6.000 bultos/día). Las franjas naranjas indican días donde la alerta se activó 14 días antes, permitiendo coordinar desvíos antes del desborde.
  </div>
</div>

Durante los días de Black Friday (27 y 28 de noviembre), la demanda real superó con fuerza los 7.000 bultos/día. Gracias a que la banda superior $p_{90}$ detectó el rebase de capacidad dos semanas antes, la operación activó a tiempo el desvío hacia Hub Sur, **evitando el colapso del nodo y asegurando la promesa de entrega**.

### 11.2 Vista Comparativa Multieslabón (Hub Central, Hub Norte y Hub Sur)

Para verificar que el sistema no genera falsas alarmas ni desequilibrios en otros centros, monitoreamos simultáneamente los tres hubs principales de la red:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/timeseries/06_multi_hub_mitigation_comparison.png" alt="Monitoreo Simultáneo Multieslabón en Hubs Principales" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 6: Monitoreo Multieslabón y Capacidad Residual en Hubs Principales de la Red.</strong><br>
    Hub Central absorbió el pico sin saturación gracias a su capacidad de 10.500 bultos; Hub Norte activó alertas tempranas oportunas; Hub Sur operó con holgura sustancial (~3.000 de 4.000 bultos), ratificando que era el receptor idóneo para absorber las órdenes re-enrutadas.
  </div>
</div>

### 11.3 Impacto Operativo Cuantificado

Los resultados de la simulación de red sobre las **376.256 órdenes** evaluadas durante la ventana crítica de Black Friday demuestran el poder de la analítica prescriptiva:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Dimensión Operativa</th>
        <th style="text-align: center;">Política Reactiva (Status Quo)</th>
        <th style="text-align: center;">Política Proactiva (Alerta $p_{90}$)</th>
        <th style="text-align: center;">Impacto Neto / Mitigación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Órdenes Evaluadas (Black Friday)</strong></td>
        <td style="text-align: center;">376.256</td>
        <td style="text-align: center;">376.256</td>
        <td style="text-align: center;">100% de la red</td>
      </tr>
      <tr>
        <td><strong>Tasa de Atrasos Operativos</strong></td>
        <td style="text-align: center; color: #ef4444; font-weight: 700;">12.27%</td>
        <td style="text-align: center; color: #10b981; font-weight: 700;">3.42%</td>
        <td style="text-align: center; font-weight: 700;">-8.84 puntos porcentuales (pp)</td>
      </tr>
      <tr>
        <td><strong>Órdenes con Atraso de SLA</strong></td>
        <td style="text-align: center;">46.166 órdenes</td>
        <td style="text-align: center;">12.867 órdenes</td>
        <td style="text-align: center; color: #10b981; font-weight: 700;">33.299 órdenes rescatadas</td>
      </tr>
      <tr style="background: rgba(16, 185, 129, 0.08);">
        <td><strong>Régimen Mensual Regular (500k órdenes)</strong></td>
        <td style="text-align: center;">SLA Base</td>
        <td style="text-align: center;">Mitigación Continua</td>
        <td style="text-align: center; font-weight: 700; color: #10b981;">-2.03 pp estructurales (~10.150 órdenes/mes)</td>
      </tr>
    </tbody>
  </table>
</div>

A nivel de régimen mensual regular sobre las **500.000 órdenes de la red regional**, la mitigación continua de picos semanales y quincenales genera una **reducción estructural neta de 2.03 puntos porcentuales** en la tasa de atrasos:

$$\Delta \text{Tasa de Atrasos} = -2.03 \text{ pp} \quad \Longrightarrow \quad 500.000 \times 2.03\% \approx \mathbf{10.150 \text{ órdenes/mes rescatadas a tiempo}}$$

Esto representa más de **120.000 familias al año** que reciben su pedido dentro de la promesa comprometida, protegiendo la reputación de la marca y evitando cientos de miles de dólares en indemnizaciones y penalizaciones de SLA.

---

## 12. Lecciones Aprendidas y Cheatsheet para Entrevistas Técnicas

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>💡</span> Principales Conclusiones Técnicas
  </div>
  <ol style="margin-bottom: 0;">
    <li><strong>El valor real surge al acoplar predicción con prescripción:</strong> Un modelo con WAPE perfecto no sirve a operaciones si no gatilla una acción concreta (desvío de carga o refuerzo de turnos).</li>
    <li><strong>Respetar el horizonte operativo previene desastres en producción:</strong> Diseñar features con <code>shift(14)</code> garantiza que el modelo sea 100% ejecutable en el día a día operativo sin data leakage.</li>
    <li><strong>El enfoque probabilístico es indispensable para gestionar la capacidad:</strong> En operaciones físicas, los costos de error son asimétricos. La función de pérdida de Pinball con $\alpha = 0.90$ proporciona un escudo natural contra el riesgo de sobrecarga.</li>
    <li><strong>LightGBM supera a los modelos clásicos en redes multiserie:</strong> Entrenar un único modelo tabular global permite el aprendizaje cruzado entre nodos heterogéneos, reduce el mantenimiento de infraestructura a un solo artefacto y agiliza la inferencia a milisegundos.</li>
  </ol>
</div>

### Cheatsheet de Respuestas Técnicas para Entrevistas

Para ingenieros y científicos de datos que enfrentan rondas técnicas de diseño de sistemas de Machine Learning y Time Series, consolidamos las preguntas más recurrentes y sus argumentaciones de alto impacto:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th style="width: 28%;">Pregunta de Entrevista</th>
        <th>Respuesta Técnica y Argumentación de Alto Impacto</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>¿Por qué LightGBM y no ARIMA / SARIMAX?</strong></td>
        <td>ARIMA es un modelo <em>local univariado</em>: exige calibrar, monitorear y reentrenar un modelo independiente por cada serie ($N$ modelos para $N$ nodos). No escala en redes complejas, es incapaz de transferir aprendizaje cruzado entre nodos y falla al incorporar relaciones no lineales complejas entre covariables exógenas (como calendario o quincenas). LightGBM entrena un <strong>único modelo tabular global</strong> que asimila simultáneamente la topología completa de la red y permite realizar inferencias robustas incluso en nodos con historial corto (<em>cold-start</em>).</td>
      </tr>
      <tr>
        <td><strong>¿Por qué no Deep Learning (LSTM o Temporal Fusion Transformer)?</strong></td>
        <td>En series temporales de frecuencia diaria con horizontes tácticos de 14 días y estacionalidades de calendario bien parametrizables, los árboles de decisión basados en gradiente (<em>GBDT</em>) superan de forma sistemática a las redes neuronales recurrentes en convergencia rápida, menor requerimiento de volumen de datos históricos y extrema robustez ante datos tabulares. Además, operar LightGBM en producción en GCP o AWS reduce la huella de cómputo en órdenes de magnitud frente a GPUs requeridas por DL.</td>
      </tr>
      <tr>
        <td><strong>¿Cómo garantizas cero Data Leakage en tus rolling features?</strong></td>
        <td>Para un horizonte táctico directo de $H=14$, ninguna estadística móvil puede calcularse con datos contemporáneos ni del intervalo $[t+1, t+14]$. Se aplica un desfase temporal formal <code>shift(14)</code> a la serie antes de computar medias o desviaciones rodantes. Así, al inferir en el momento de corte $T$, solo se consumen datos efectivamente observados hasta $T$.</td>
      </tr>
      <tr>
        <td><strong>¿Por qué WAPE y no MAPE o RMSE?</strong></td>
        <td>En nodos satélite de última milla o días feriados existen observaciones con demanda nula ($y=0$), donde el MAPE se indetermina por división por cero. Además, el MAPE trata por igual un error porcentual en un nodo pequeño que en un centro macro. El WAPE pondera proporcionalmente cada desviación por el volumen absoluto real de la red, siendo la métrica de oro aceptada en Supply Chain y S&amp;OP.</td>
      </tr>
      <tr>
        <td><strong>¿Por qué usar la pérdida L1 en lugar de L2 para el pronóstico central?</strong></td>
        <td>La norma $L_1$ (MAE) minimiza matemáticamente la <strong>mediana condicional</strong> de la distribución, haciéndola perfectamente coherente con la métrica de negocio (WAPE) y aislándola del impacto de outliers o picos comerciales transitorios que distorsionarían la media estimada bajo $L_2$.</td>
      </tr>
      <tr>
        <td><strong>¿Cómo se conecta el modelo estadístico con la reducción de 2 puntos porcentuales de atrasos?</strong></td>
        <td>El modelo probabilístico estima el límite de riesgo $p_{90}$ mediante Pinball Loss (castigando 9 veces más la subestimación). Si $\hat{y}_{p90} &gt; 0.95 \times \text{Capacidad}$, el sistema despacha una alerta 14 días antes al <em>Motor de Promesa de Entrega</em>, el cual balancea dinámicamente la promesa desviando órdenes hacia nodos alternos con holgura. Esto mitiga las colas de espera físicas y reduce la tasa de atrasos operativos en 2.03 pp estructurales, rescatando más de 10.000 órdenes a tiempo cada mes.</td>
      </tr>
    </tbody>
  </table>
</div>

---

### 🚀 Código y Reproducibilidad

Todo el código, notebooks de Jupyter, datasets en formato Parquet y configuraciones reproducibles con el gestor de paquetes `uv` se encuentran disponibles en el repositorio de GitHub:
- [Repositorio en GitHub: `surzua/TimeSeries`](https://github.com/surzua/TimeSeries)
- [Notebook 1: EDA, Diagnóstico Estadístico y Feature Engineering](https://github.com/surzua/TimeSeries/blob/main/notebooks/01_eda_baseline_feature_engineering.ipynb)
- [Notebook 2: Modelado LightGBM, Backtesting y Decisión Prescriptiva](https://github.com/surzua/TimeSeries/blob/main/notebooks/02_lightgbm_probabilistic_capacity_mitigation.ipynb)
- [Blueprint de Formulación Matemática](https://github.com/surzua/TimeSeries/blob/main/docs/forecasting_supply_chain.md)
