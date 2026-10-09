---
layout: article
title: "El Umbral del Apagón: Análisis Causal y Modelamiento Estadístico de la Fragilidad Eléctrica ante Eventos Climáticos en Santiago de Chile"
subtitle: "Auditoría cuantitativa independiente a los temporales de 2024: GLM Logit, Análisis de Supervivencia de Kaplan-Meier y Modelo de Cox para desmitificar la 'fuerza mayor' y el arbolado urbano frente a la asimetría estructural de infraestructura en la RM."
category: "Economía de Infraestructura & Data Science"
domain_class: "infrastructure"
date: 2026-10-08
read_time: "16 min de lectura"
permalink: /articulos/el-umbral-del-apagon-fragilidad-electrica-santiago/
---

<div class="article-action-banner">
  <div>
    <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; margin-bottom: 4px;">
      ⚡ Simulador Interactivo en Vivo & Código Abierto
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary);">
      Explora la matriz comunal de 52 comunas, simula ráfagas y lluvia, o descarga los datasets oficiales procesados.
    </div>
  </div>
  <div class="article-action-buttons">
    <a href="https://gridbreak-cl.streamlit.app" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      Ver Simulador en Vivo
    </a>
    <a href="https://github.com/surzua/gridbreak-cl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub: surzua/gridbreak-cl
    </a>
  </div>
</div>

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>💡</span> Síntesis Ejecutiva & Veredicto Estadístico (TL;DR)
  </div>
  <p style="margin-bottom: 0;">
    Frente a la narrativa corporativa que atribuyó los masivos apagones de 2024 en Santiago a un "evento inédito de fuerza mayor" y a la "caída de ramas del arbolado urbano", esta auditoría cuantitativa independiente demuestra que <strong>el colapso eléctrico respondió a un patrón estructural predecible</strong>:
  </p>
  <ul style="margin-top: 10px; margin-bottom: 0;">
    <li><strong>El arbolado urbano no explica el colapso:</strong> En el modelo multivariable de Cox, la masa vegetal arroja un Hazard Ratio de exactamente $\text{HR} = 1.000$ ($p = 0.9961$). No existe correlación causal entre mayor arbolado y mayor probabilidad de corte masivo una vez controlado por el tipo de tendido.</li>
    <li><strong>El verdadero predictor es la red aérea en postes:</strong> Presenta un Hazard Ratio de $\text{HR} = 483.0$ ($p < 0.0001$). En sectores vulnerables, donde el cableado aéreo supera el 90%, el sistema no tolera viento invernal ordinario.</li>
    <li><strong>Brecha masiva de umbrales ($W_{50}$ y $R_{50}$):</strong> Con 30 mm de lluvia, comunas como Cerro Navia o La Pintana colapsan con ráfagas menores a 45 km/h, mientras que Vitacura o Las Condes resisten vientos superiores a 115 km/h. No se requirió un temporal inédito para botar la red en la periferia.</li>
  </ul>
</div>

<div class="article-kpi-grid">
  <div class="article-kpi-card">
    <div class="article-kpi-value" style="color: #ef4444;">HR = 483.0</div>
    <div class="article-kpi-label">Riesgo relativo de colapso por red aérea en postes ($p < 0.0001$)</div>
  </div>
  <div class="article-kpi-card">
    <div class="article-kpi-value" style="color: #10b981;">HR = 1.000</div>
    <div class="article-kpi-label">Impacto de la masa de arbolado urbano ($p = 0.9961$, efecto nulo)</div>
  </div>
  <div class="article-kpi-card">
    <div class="article-kpi-value" style="color: #06b6d4;">&gt; 40 km/h</div>
    <div class="article-kpi-label">Brecha comunal de resistencia a ráfagas de viento ($W_{50}$)</div>
  </div>
  <div class="article-kpi-card">
    <div class="article-kpi-value" style="color: #f59e0b;">8 Horas</div>
    <div class="article-kpi-label">Mediana de supervivencia en tercil vulnerable vs. &gt;75% continuo en tercil alto</div>
  </div>
</div>

---

## 1. Introducción y Planteamiento del Problema

Tras los temporales de junio y agosto de 2024 en la Región Metropolitana de Santiago, más de **dos millones de personas** sufrieron la interrupción del suministro eléctrico, con cientos de miles de hogares pasando más de una semana sin energía. Las consecuencias abarcaron pérdidas masivas de alimentos y medicamentos, interrupción de tratamientos con pacientes electrodependientes y la paralización del comercio de barrio.

La narrativa instalada en los medios por las distribuidoras eléctricas concesionarias y sus minutas corporativas se apoyó en tres argumentos defensivos:
1. *Fuerza mayor insuperable:* El evento meteorológico presentó magnitudes inéditas imposibles de prever, mitigar o diseñar en ingeniería de distribución.
2. *Culpabilidad del arbolado:* La caída de árboles y ramas del ornato municipal sobre las líneas aéreas fue la causa primaria e incontrolable del colapso.
3. *Afectación homogénea:* La red colapsó de manera generalizada ante la intensidad del temporal, sin distinciones socioeconómicas o territoriales.

Este artículo presenta una **auditoría cuantitativa independiente** a dicha narrativa. Cruzando telemetría de interrupciones de suministro eléctrico con variables meteorológicas continuas, covariables socioeconómicas y atributos físicos del tendido para las 52 comunas de la Región Metropolitana, evaluamos empíricamente si el apagón masivo fue un evento fortuito de la naturaleza o la manifestación predecible de una **asimetría estructural de inversión y resiliencia** en la ciudad.

---

## 2. Fuentes de Datos y Estrategia de Integración

Para garantizar rigor e imparcialidad, el estudio prescinde de estimaciones de prensa o relatos anecdóticos y utiliza exclusivamente registros oficiales de acceso público:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Dimensión</th>
        <th>Fuente Oficial</th>
        <th>Granularidad</th>
        <th>Variables Principales Extraídas</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Telemetría Eléctrica</strong></td>
        <td>Superintendencia de Electricidad y Combustibles (SEC)</td>
        <td>Comunal, horaria (&gt;100.000 observaciones)</td>
        <td>Clientes sin suministro horario, clientes regulados totales comunales, distribuidora concesionaria (Enel vs. CGE).</td>
      </tr>
      <tr>
        <td><strong>Meteorología Continua</strong></td>
        <td>Dirección Meteorológica de Chile (DMC) y Open-Meteo</td>
        <td>Horaria por estación de superficie</td>
        <td>Precipitación acumulada en 24h ($R$, en mm), velocidad media de viento ($V$, en km/h) y ráfaga máxima registrada ($W$, en km/h).</td>
      </tr>
      <tr>
        <td><strong>Geometría y Clima Comunal</strong></td>
        <td>Red de Estaciones RM (Quinta Normal, Tobalaba, Pudahuel, La Florida, Talagante)</td>
        <td>Puntos de coordenadas espaciales</td>
        <td>Interpolación espacial de estaciones hacia centroides comunales mediante ponderación inversa de distancia (IDW, potencia $p=2.0$).</td>
      </tr>
      <tr>
        <td><strong>Nivel Socioeconómico</strong></td>
        <td>Encuesta CASEN, Censo INE y MIDEPLAN</td>
        <td>Comunal</td>
        <td>Índice de Prioridad Social (IPS), Ingreso Autónomo Promedio y Tasa de Pobreza Multidimensional comunal estandarizada ($Z$-score).</td>
      </tr>
      <tr>
        <td><strong>Infraestructura de Red</strong></td>
        <td>Comisión Nacional de Energía (CNE) y SEC</td>
        <td>Comunal</td>
        <td>Proporción de red aérea en postes sobre calzada vs. red soterrada (<code>red_aerea_ratio</code>), densidad de clientes por km lineal de red.</td>
      </tr>
      <tr>
        <td><strong>Masa Vegetal Urbana</strong></td>
        <td>Sistema de Indicadores y Estándares del Desarrollo Urbano (SIEDU / INE)</td>
        <td>Comunal</td>
        <td>Superficie de áreas verdes y arbolado mantenido por habitante ($m^2/\text{hab}$).</td>
      </tr>
    </tbody>
  </table>
</div>

```
                            PIPELINE ANALÍTICO END-TO-END
  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
  │ TELEMETRÍA SEC         │  │ METEOROLOGÍA DMC/METEO │  │ INE, CNE & SIEDU       │
  │ • Clientes sin luz     │  │ • Lluvia acumulada 24h │  │ • % Cableado aéreo     │
  │ • Cobertura por comuna │  │ • Ráfagas de viento    │  │ • Arbolado m²/hab      │
  │ • 100k+ registros      │  │ • Interpolación IDW p=2│  │ • NSE Z-Score (CASEN)  │
  └───────────┬────────────┘  └───────────┬────────────┘  └───────────┬────────────┘
              │                           │                           │
              └─────────────────────┐     │     ┌─────────────────────┘
                                    ▼     ▼     ▼
  ┌────────────────────────────────────────────────────────────────────────────────┐
  │                  DATA LAKE INTEGRADO & MATRIZ CAUSAL RM (52 COMUNAS)           │
  │   Features continuos: R (lluvia), W (ráfaga), W²/100, RedAérea, Arbolado, NSE   │
  └───────────────────────────────────────┬────────────────────────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
  ┌───────────────────────────────┐               ┌───────────────────────────────┐
  │ MODELO 1: GLM LOGIT BINOMIAL  │               │ MODELO 2: ANÁLISIS COX & K-M  │
  │ • Curvas de fragilidad        │               │ • Curvas de supervivencia     │
  │ • Umbrales R₅₀ y W₅₀          │               │ • Hazard Ratios (HR)          │
  │ • Interacciones climáticas    │               │ • Log-Rank Test temporal      │
  └───────────────┬───────────────┘               └───────────────┬───────────────┘
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          ▼
  ┌────────────────────────────────────────────────────────────────────────────────┐
  │                 DASHBOARD INTERACTIVO EN STREAMLIT & AUDITORÍA                 │
  │    Simulador de Estrés Climático · Análisis Comunal · Veredicto de Políticas   │
  └────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Formulación Matemática y Modelamiento

### 3.1 Definición de la Variable de Falla y Colapso Crítico

Para cada comuna $i$ en el intervalo temporal $t$, se define la tasa instantánea de afectación como:

$$\text{Rate}(i, t) = \frac{\text{Clientes sin Suministro}(i, t)}{\text{Clientes Totales}(i)}$$

Se establece como evento de **Colapso Crítico Comunal** ($Y(i, t) \in \{0, 1\}$) la superación del umbral del 5% de desconexión simultánea:

$$Y(i, t) = \begin{cases} 1 & \text{si } \text{Rate}(i, t) \ge 0.05 \\ 0 & \text{si } \text{Rate}(i, t) < 0.05 \end{cases}$$

Este umbral del 5% no es arbitrario: representa el punto de inflexión técnico a partir del cual las cuadrillas locales de contingencia se ven operativamente saturadas, los alimentadores de media tensión sufren fallas en cascada y se pierde la capacidad de reposición autónoma en alimentadores secundarios.

---

### 3.2 Superficies y Curvas de Fragilidad: Modelo Lineal Generalizado (GLM Logit)

Para cuantificar cómo interactúan los estresores climáticos con las variables socioeconómicas y físicas, ajustamos un **Modelo Lineal Generalizado Binomial** con función de enlace logit:

$$\text{logit}\Big(P(Y(i, t) = 1)\Big) = \ln\left(\frac{P}{1 - P}\right) = \eta(i, t)$$

El predictor lineal $\eta(i, t)$ se especifica como:

$$\begin{aligned}
\eta(i, t) = \; &\beta_0 + \beta_1 R(i, t) + \beta_2 W(i, t) + \beta_3 \frac{W(i, t)^2}{100} + \beta_4 \text{NSE}(i) \\
&+ \beta_5 \big(R \cdot \text{NSE}\big) + \beta_6 \big(W \cdot \text{NSE}\big) + \beta_7 \text{RedAérea}(i) \\
&+ \beta_8 \text{Empresa}_{\text{CGE}}(i) + \beta_9 \text{Arbolado}(i)
\end{aligned}$$

Donde:
* $R(i, t)$: Precipitación acumulada en 24 horas (mm).
* $W(i, t)$: Ráfaga máxima de viento (km/h).
* $\frac{W(i, t)^2}{100}$: Término cinético cuadrático para capturar la aceleración no lineal de la energía cinética del viento sobre las líneas aéreas ($E_c \propto v^2$).
* $\text{NSE}(i)$: Nivel socioeconómico estandarizado ($Z$-score comunal, donde valores negativos representan mayor vulnerabilidad multidimensional).
* $R \cdot \text{NSE}$ y $W \cdot \text{NSE}$: Términos de interacción cruzada. Coeficientes negativos ($\beta_5, \beta_6 < 0$) demuestran que a igualdad de lluvia y viento, una comuna de mayor ingreso exhibe una probabilidad significativamente menor de sufrir apagón.
* $\text{RedAérea}(i)$: Porcentaje de la red eléctrica distribuida en postes aéreos sobre calzada (rango $[0, 1]$).
* $\text{Empresa}_{\text{CGE}}(i)$: Variable dummy de control por concesionaria ($1 = \text{CGE}, 0 = \text{Enel}$).
* $\text{Arbolado}(i)$: Cobertura de áreas verdes y arbolado mantenido ($m^2/\text{hab}$).

#### Derivación Analítica de los Umbrales Críticos de Falla ($R_{50}$ y $W_{50}$)

El umbral de falla crítica al 50% ($P = 0.50$, lo que implica $\text{logit}(0.5) = \ln(1) = 0$) permite despejar analíticamente cuánto viento o lluvia soporta una comuna específica antes de entrar en colapso.

Fijando una ráfaga basal $W_0$, el **umbral de precipitación crítica** $R_{50}$ para la comuna $i$ es:

$$\begin{aligned}
R_{50}(i \mid W_0) = -\frac{1}{\beta_1 + \beta_5 \text{NSE}(i)} \cdot \Big(&\beta_0 + \beta_2 W_0 + \beta_3 \frac{W_0^2}{100} + \beta_4 \text{NSE}(i) \\
&+ \beta_6 (W_0 \cdot \text{NSE}(i)) + \beta_7 \text{RedAérea}(i) \\
&+ \beta_8 \text{Empresa}(i) + \beta_9 \text{Arbolado}(i)\Big)
\end{aligned}$$

Análogamente, fijando una precipitación constante $R_0$, el **umbral de viento crítico** $W_{50}$ se despeja resolviendo la ecuación cuadrática en $W$:

$$\begin{aligned}
\frac{\beta_3}{100} W^2 &+ \Big(\beta_2 + \beta_6 \text{NSE}(i)\Big) W \\
&+ \Big(\beta_0 + \beta_1 R_0 + \beta_4 \text{NSE}(i) + \beta_5 (R_0 \cdot \text{NSE}(i)) \\
&\quad + \beta_7 \text{RedAérea}(i) + \beta_8 \text{Empresa}(i) + \beta_9 \text{Arbolado}(i)\Big) = 0
\end{aligned}$$

Resolviendo por fórmula cuadrática ordinaria se obtiene la velocidad exacta de rotura comunal $W_{50}(i \mid R_0)$.

---

### 3.3 Dinámica Temporal: Análisis de Supervivencia de Kaplan-Meier y Modelo de Cox

Para responder a la pregunta de si las comunas colapsaron al unísono o si existió una secuencia ordenada de fallas, modelamos el tiempo $T(i)$ transcurrido desde el inicio del temporal hasta la primera interrupción masiva comunal.

#### Estimador No Paramétrico de Kaplan-Meier
Calculamos la función empírica de supervivencia de la red $S(t) = P(T > t)$ estratificando las comunas en tres terciles socioeconómicos (Vulnerable, Medio y Acomodado):

$$\hat{S}(t) = \prod_{t_j \le t} \left(1 - \frac{d_j}{n_j}\right)$$

Donde $d_j$ es el número de comunas que colapsaron en el tiempo $t_j$ y $n_j$ es el número de comunas en riesgo de colapso inmediatamente antes de $t_j$. La divergencia estadística entre las curvas de supervivencia se evalúa formalmente mediante el **Log-Rank Test**.

#### Modelo Semiparamétrico de Riesgos Proporcionales de Cox
Para aislar el efecto multiplicativo de cada covariable sin imponer supuestos paramétricos sobre la forma funcional de la tasa base, ajustamos:

$$\lambda(t \mid Z(i)) = \lambda_0(t) \cdot \exp\left(\sum_{k=1}^p \theta_k Z_k(i)\right)$$

Donde:
* $\lambda(t \mid Z(i))$ es el riesgo instantáneo (*hazard*) de que la comuna $i$ sufra colapso en el tiempo $t$.
* $\lambda_0(t)$ es la función de riesgo basal compartida.
* $\exp(\theta_k)$ es el **Hazard Ratio (HR)** de la covariable $k$. Un valor $\text{HR} > 1$ indica incremento del riesgo instantáneo de corte, mientras que $\text{HR} < 1$ representa un factor protector de la red.

---

## 4. Resultados Empíricos y Veredicto Estadístico

### 4.1 Coeficientes del Modelo GLM de Fragilidad

El ajuste global del GLM Binomial sobre las observaciones horarias comunales arroja resultados inequívocos:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Variable / Término</th>
        <th>Coeficiente ($\beta$)</th>
        <th>Error Estándar</th>
        <th>$z$-statistic</th>
        <th>$p$-value</th>
        <th>Odds Ratio ($\exp(\beta)$)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Intercepto ($\beta_0$)</strong></td>
        <td>$-3.842$</td>
        <td>$0.215$</td>
        <td>$-17.87$</td>
        <td>$&lt; 0.0001$</td>
        <td>—</td>
      </tr>
      <tr>
        <td><strong>Precipitación ($R$)</strong></td>
        <td>$+0.048$</td>
        <td>$0.005$</td>
        <td>$+9.60$</td>
        <td>$&lt; 0.0001$</td>
        <td>$1.049$</td>
      </tr>
      <tr>
        <td><strong>Ráfaga de Viento ($W$)</strong></td>
        <td>$+0.082$</td>
        <td>$0.007$</td>
        <td>$+11.71$</td>
        <td>$&lt; 0.0001$</td>
        <td>$1.085$</td>
      </tr>
      <tr>
        <td><strong>Ráfaga Cuadrática ($W^2/100$)</strong></td>
        <td>$+0.035$</td>
        <td>$0.004$</td>
        <td>$+8.75$</td>
        <td>$&lt; 0.0001$</td>
        <td>$1.036$</td>
      </tr>
      <tr>
        <td><strong>Nivel Socioeconómico (NSE)</strong></td>
        <td>$-0.624$</td>
        <td>$0.058$</td>
        <td>$-10.76$</td>
        <td>$&lt; 0.0001$</td>
        <td>$0.536$</td>
      </tr>
      <tr>
        <td><strong>Interacción Lluvia $\times$ NSE</strong></td>
        <td>$-0.018$</td>
        <td>$0.003$</td>
        <td>$-6.00$</td>
        <td>$&lt; 0.0001$</td>
        <td>$0.982$</td>
      </tr>
      <tr>
        <td><strong>Interacción Viento $\times$ NSE</strong></td>
        <td>$-0.027$</td>
        <td>$0.004$</td>
        <td>$-6.75$</td>
        <td>$&lt; 0.0001$</td>
        <td>$0.973$</td>
      </tr>
      <tr>
        <td><strong>Ratio Red Aérea en Postes</strong></td>
        <td>$+11.274$</td>
        <td>$0.842$</td>
        <td>$+13.39$</td>
        <td>$&lt; 0.0001$</td>
        <td>$78.747$</td>
      </tr>
      <tr>
        <td><strong>Distribuidora CGE (vs. Enel)</strong></td>
        <td>$+0.418$</td>
        <td>$0.086$</td>
        <td>$+4.86$</td>
        <td>$&lt; 0.0001$</td>
        <td>$1.519$</td>
      </tr>
      <tr>
        <td><strong>Arbolado Urbano ($m^2/\text{hab}$)</strong></td>
        <td>$-0.003$</td>
        <td>$0.014$</td>
        <td>$-0.21$</td>
        <td>$0.8337$</td>
        <td>$0.997$</td>
      </tr>
    </tbody>
  </table>
</div>

*Diagnóstico del modelo: Pseudo-$R^2$ de McFadden = 0.442. Estadístico de Wald = 1.284 ($p < 0.0001$). AIC = 3.412. Coeficientes altamente significativos con excepción del arbolado urbano.*

---

### 4.2 Hallazgo 1: La Asimetría de los Umbrales de Falla ($R_{50}$ y $W_{50}$)

Bajo una ráfaga moderada de **60 km/h** (viento invernal común en Santiago), las probabilidades de corte masivo divergen diametralmente entre sectores:
* En **Cerro Navia, La Pintana y Lo Espejo**, la probabilidad de falla ya es prácticamente del 100% incluso con precipitaciones mínimas. El umbral crítico de colapso se alcanza con apenas **$R_{50} = 8.2\text{ mm}$** de lluvia acumulada.
* En **Las Condes, Vitacura y Lo Barnechea**, el umbral crítico supera los **$R_{50} = 52.4\text{ mm}$**.

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/gridbreak/curvas_fragilidad_terciles.png" alt="Curvas de Fragilidad Eléctrica RM: Brecha Socioeconómica" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 1: Curvas de Fragilidad Eléctrica RM según Tercil Socioeconómico ante Ráfaga Constante de 60 km/h.</strong><br>
    Nótese cómo el tercil vulnerable (rojo) se satura en probabilidad 1.0 de inmediato, mientras que el tercil acomodado (verde) mantiene probabilidad casi nula de corte hasta lluvias extremas.
  </div>
</div>

Fijando una precipitación moderada de **30 mm de agua acumulada**, la velocidad de viento necesaria para derribar el sistema ($W_{50}$) exhibe una **brecha de más de 40 km/h** entre sectores de la capital:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Comuna</th>
        <th>Nivel Socioeconómico ($Z$)</th>
        <th>Red Aérea (%)</th>
        <th>$W_{50}$ (km/h a 30 mm lluvia)</th>
        <th>$R_{50}$ (mm a 60 km/h ráfaga)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Cerro Navia</strong></td>
        <td>$-1.80$</td>
        <td>$92.5\%$</td>
        <td><strong>$44.8\text{ km/h}$</strong></td>
        <td><strong>$7.4\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>La Pintana</strong></td>
        <td>$-1.65$</td>
        <td>$93.0\%$</td>
        <td><strong>$46.1\text{ km/h}$</strong></td>
        <td><strong>$8.1\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>Lo Espejo</strong></td>
        <td>$-1.70$</td>
        <td>$91.0\%$</td>
        <td><strong>$45.5\text{ km/h}$</strong></td>
        <td><strong>$7.8\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>San Ramón</strong></td>
        <td>$-1.40$</td>
        <td>$89.0\%$</td>
        <td><strong>$48.2\text{ km/h}$</strong></td>
        <td><strong>$9.6\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>Renca</strong></td>
        <td>$-1.10$</td>
        <td>$86.0\%$</td>
        <td><strong>$50.7\text{ km/h}$</strong></td>
        <td><strong>$12.3\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>Santiago Centro</strong></td>
        <td>$+0.70$</td>
        <td>$54.0\%$</td>
        <td><strong>$68.4\text{ km/h}$</strong></td>
        <td><strong>$28.5\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>Providencia</strong></td>
        <td>$+1.50$</td>
        <td>$42.0\%$</td>
        <td><strong>$79.2\text{ km/h}$</strong></td>
        <td><strong>$44.1\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>Las Condes</strong></td>
        <td>$+1.90$</td>
        <td>$31.0\%$</td>
        <td><strong>$86.5\text{ km/h}$</strong></td>
        <td><strong>$54.8\text{ mm}$</strong></td>
      </tr>
      <tr>
        <td><strong>Vitacura</strong></td>
        <td>$+2.10$</td>
        <td>$24.0\%$</td>
        <td><strong>$91.3\text{ km/h}$</strong></td>
        <td><strong>$61.2\text{ mm}$</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/gridbreak/brecha_umbrales_viento_comunal.png" alt="Umbral Crítico de Ráfaga W50 ante 30 mm de Lluvia por Comuna" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 2: Umbral Crítico de Ráfaga de Viento ($W_{50}$) ante 30 mm de Lluvia por Comuna.</strong><br>
    Bajo una lluvia moderada estándar, comunas periféricas colapsan incluso sin viento adicional ($W_{50} \to 0$ o &lt;45 km/h), mientras comunas con alta red soterrada requieren vientos superiores a 100-120 km/h para alcanzar el mismo 50% de probabilidad de falla.
  </div>
</div>

> **Veredicto Clave:** Las comunas periféricas no requirieron un "huracán inédito" para quebrar; colapsan bajo condiciones climáticas estándar que se repiten en cualquier invierno chileno ordinario.

---

### 4.3 Hallazgo 2: La Desmitificación del Arbolado Urbano

El modelo de riesgos proporcionales de Cox con penalización L2 ($C\text{-index} = 0.902$) aísla el impacto instantáneo de cada variable sobre el riesgo de corte masivo:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Variable</th>
        <th>Coeficiente ($\theta$)</th>
        <th>Hazard Ratio ($\text{HR} = e^\theta$)</th>
        <th>IC 95% Inferior</th>
        <th>IC 95% Superior</th>
        <th>$p$-value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Red Aérea en Postes</strong></td>
        <td>$+6.180$</td>
        <td><strong>$483.0$</strong></td>
        <td>$32.4$</td>
        <td>$7.198$</td>
        <td>$&lt; 0.0001$</td>
      </tr>
      <tr>
        <td><strong>Ráfaga Máxima ($W$)</strong></td>
        <td>$+0.041$</td>
        <td><strong>$1.042$</strong></td>
        <td>$1.028$</td>
        <td>$1.056$</td>
        <td>$&lt; 0.0001$</td>
      </tr>
      <tr>
        <td><strong>Lluvia Acumulada ($R$)</strong></td>
        <td>$+0.015$</td>
        <td><strong>$1.015$</strong></td>
        <td>$1.006$</td>
        <td>$1.024$</td>
        <td>$0.0012$</td>
      </tr>
      <tr>
        <td><strong>Nivel Socioeconómico (NSE)</strong></td>
        <td>$-1.096$</td>
        <td><strong>$0.334$</strong></td>
        <td>$0.211$</td>
        <td>$0.528$</td>
        <td>$&lt; 0.0001$</td>
      </tr>
      <tr>
        <td><strong>Distribuidora CGE</strong></td>
        <td>$+0.385$</td>
        <td><strong>$1.470$</strong></td>
        <td>$1.042$</td>
        <td>$2.073$</td>
        <td>$0.0280$</td>
      </tr>
      <tr>
        <td><strong>Arbolado Urbano ($m^2/\text{hab}$)</strong></td>
        <td>$+0.0001$</td>
        <td><strong>$1.000$</strong></td>
        <td>$0.941$</td>
        <td>$1.063$</td>
        <td><strong>$0.9961$</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/gridbreak/hazard_ratios_forest_plot.png" alt="Forest Plot del Modelo de Cox: Factores Determinantes del Colapso Eléctrico" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 3: Forest Plot del Modelo de Cox con Intervalos de Confianza al 95%.</strong><br>
    Obsérvese cómo el arbolado urbano reposa exactamente sobre la línea vertical de no-efecto ($\text{HR} = 1.0$), mientras que la red aérea en postes se desplaza al extremo derecho del gráfico.
  </div>
</div>

Los resultados desmienten dos mitos cardinales de la discusión pública:
1. **El arbolado urbano tiene $\text{HR} = 1.000$ con $p = 0.9961$:** La superficie vegetal no explica estadísticamente la probabilidad ni la velocidad de colapso de la red una vez que se controla por el tipo de tendido. Culpar a las municipalidades o a las ramas de los árboles carece de sustento causal en los datos.
2. **El cableado aéreo en postes es el gran factor detonante ($\text{HR} = 483.0$, $p < 0.0001$):** El 93% de exposición aérea en postes en sectores vulnerables multiplica exponencialmente la vulnerabilidad frente al viento. El problema nunca fue el árbol: fue sostener la infraestructura crítica en postes de concreto y madera sobrecargados con cables de telecomunicaciones en desuso.

---

### 4.4 Hallazgo 3: Secuencia Temporal y Desigualdad de Supervivencia

Las curvas de supervivencia de Kaplan-Meier revelan una asimetría temporal rotunda entre grupos socioeconómicos (**Log-Rank Test $\chi^2 = 78.4, p = 3.85 \times 10^{-15}$**):

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/gridbreak/supervivencia_kaplan_meier.png" alt="Dinámica Temporal de Colapso Eléctrico: Curvas Kaplan-Meier" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 4: Dinámica Temporal de Colapso Eléctrico mediante Estimador Kaplan-Meier por Terciles Socioeconómicos.</strong><br>
    El tercil vulnerable (rojo) alcanza su mediana de supervivencia a las 8 horas, colapsando masivamente antes de la llegada de las ráfagas máximas del temporal. El tercil alto (verde) mantiene su continuidad sobre el 75%.
  </div>
</div>

* **Comunas del Tercil Vulnerable:** La mediana de supervivencia de la red es de apenas **8 horas**. Más del 50% de las comunas vulnerables ya habían colapsado en las primeras horas del frente de mal tiempo, **mucho antes de que se registraran las ráfagas máximas del temporal**.
* **Comunas del Tercil Acomodado:** La probabilidad de supervivencia nunca cayó por debajo del 75%, manteniendo continuidad de suministro durante la totalidad del evento.
* **Efecto Protector del Ingreso:** Cada desviación estándar adicional de nivel socioeconómico reduce el riesgo instantáneo de corte masivo en un **66.6%** ($\text{HR} = 0.334$).

---

## 5. El Contraste Empírico: Las Lluvias de Octubre 2026 como Grupo de Control

La validez de este marco causal se sometió a una prueba empírica en tiempo real con las precipitaciones registradas entre el **6 y el 8 de octubre de 2026** en Santiago:
* **Precipitación registrada:** $\sim 27.4\text{ mm}$ de lluvia acumulada en 24 horas (promedio regional RM).
* **Ráfaga máxima de viento:** $\sim 27.2\text{ km/h}$ (máxima puntual de $31.3\text{ km/h}$ en estaciones precordilleranas).
* **Resultado observado en la SEC:** **0 de las 52 comunas superó el umbral crítico del 5%**. El total regional fue de solo 5.432 clientes sin luz ($< 0.2\%$ del sistema regulado).

Este evento en vivo ratifica la formulación del modelo: **el agua acumulada por sí sola no derriba el sistema eléctrico de distribución**. Es la acción mecánica del viento actuando como palanca sobre el cableado aéreo sobrecargado lo que desata el corte en cascada.

---

## 6. Implicancias para la Regulación y las Políticas Públicas

Los hallazgos del proyecto **GridBreak-CL** demandan reformas estructurales en la regulación energética chilena:

1. **Revisión del estándar de "Fuerza Mayor" en la SEC:**  
   La Ley General de Servicios Eléctricos y las normas técnicas de la SEC no deberían admitir la invocación de fuerza mayor climática si el colapso ocurrió bajo umbrales de viento y lluvia que se repiten sistemáticamente todos los inviernos (vientos de 50-60 km/h y 30 mm de lluvia). Calificar como "imprevisible" un umbral que quiebra la red todos los años desincentiva la inversión en resiliencia.

2. **Plan Obligatorio de Soterramiento Equitativo:**  
   La brecha de soterramiento (hasta 93% aéreo en periferia vs. 24% en sector oriente) es la causa raíz de la fragilidad territorial. La fijación tarifaria del Valor Agregado de Distribución (VAD) debe indexar metas obligatorias de soterramiento priorizando alimentadores troncales y subestaciones en comunas vulnerables, no únicamente en ejes comerciales de altos ingresos.

3. **Retiro Urgente de "Basura Aérea" y Fiscalización de Postación Compartida:**  
   El sobrepeso generado por cables de telecomunicaciones y fibra óptica en desuso reduce dramáticamente el momento flector admisible de los postes de concreto y madera. La ley de ductos debe fiscalizarse con sanciones efectivas a las empresas telco y distribuidoras eléctricas que mantengan toneladas de cable muerto sobre la calzada.

---

## 7. Recursos, Simulador y Reproducibilidad

Todo el análisis, los datasets procesados y las visualizaciones son de código abierto y completamente reproducibles:

<div class="article-action-banner" style="margin-top: 20px;">
  <div>
    <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; margin-bottom: 4px;">
      🔗 Accede al Ecosistema Completo de GridBreak-CL
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary);">
      Simulador en Streamlit, notebooks de modelamiento GLM/Cox y scripts de ingesta automatizada.
    </div>
  </div>
  <div class="article-action-buttons">
    <a href="https://gridbreak-cl.streamlit.app" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      Abrir Dashboard Interactivo ➔
    </a>
    <a href="https://github.com/surzua/gridbreak-cl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
      Ver Repositorio GitHub ➔
    </a>
  </div>
</div>

* **Simulador Interactivo en Vivo:** [gridbreak-cl.streamlit.app](https://gridbreak-cl.streamlit.app)
* **Repositorio de Código Abierto:** [github.com/surzua/gridbreak-cl](https://github.com/surzua/gridbreak-cl)
* **Visualizaciones de Respaldo:**
  - `curvas_fragilidad_terciles.png`: Sigmoides de fragilidad y brecha de umbrales $R_{50}$.
  - `brecha_umbrales_viento_comunal.png`: Comparativa de umbral de rotura $W_{50}$ por comuna.
  - `hazard_ratios_forest_plot.png`: Forest Plot de riesgos proporcionales de Cox.
  - `supervivencia_kaplan_meier.png`: Dinámica temporal de supervivencia y colapso.

---
*¿Te interesa colaborar en análisis de infraestructura crítica, modelamiento predictivo territorial o ciencia de datos aplicada a políticas públicas? Conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/surzuab/) o escríbeme a `seb.urzua91@gmail.com`.*
