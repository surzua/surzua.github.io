---
layout: article
title: "HipoRefi-CL: De la Hipoteca a la Optimización Cuantitativa de Deuda en Chile"
subtitle: "Cómo construí una plataforma end-to-end con Python, Playwright, DuckDB, FastAPI y Streamlit para modelar con rigor la Ley de Portabilidad Financiera y desarmar la 'Falacia del Dividendo'."
category: "Finanzas Cuantitativas & Software Architecture"
domain_class: "finance"
date: 2026-10-07
read_time: "14 min de lectura"
permalink: /articulos/hiporefi-cl-decision-refinanciamiento/
---

> **TL;DR:** Menos del 10% de los deudores hipotecarios en Chile evalúa refinanciar su crédito, a pesar de que la Ley N° 21.236 de Portabilidad Financiera redujo aranceles y costos registrales. Para resolver la asimetría de información, construí **[HipoRefi-CL](https://github.com/surzua/HipoRefi-CL)**: un motor cuantitativo integral de código abierto que ingesta datos en vivo del Banco Central y CMF, extrae ofertas bancarias mediante web scraping headless con Playwright, procesa cartolas PDF con pipelines híbridos (regex + LLMs) y evalúa la conveniencia patrimonial real mediante **Valor Presente Neto (VPN)**, **Payback Dinámico** y **curvas actuariales de desgravamen**.

---

## 1. El Problema de la Deuda Hipotecaria en Chile

El crédito hipotecario es, con creces, el compromiso financiero más relevante y duradero que asume una familia en Chile. Se pacta típicamente a **20, 25 o 30 años**, está nominado en **Unidades de Fomento (UF)** —lo que significa que la deuda principal y los dividendos se indexan diariamente a la inflación— y puede comprometer entre el 20% y el 40% del ingreso mensual del hogar.

A fines de 2020 se promulgó en Chile la **Ley N° 21.236 de Portabilidad Financiera**, cuyo objetivo era dinamizar el mercado facilitando la migración de créditos entre instituciones mediante la figura de la **subrogación legal**, rebajando aranceles registrales y prohibiendo costos abusivos.

Sin embargo, a más de tres años de su vigencia, **menos del 10% de los deudores hipotecarios cotiza o refinancia activamente su crédito**.

```
                           LAS TRES BARRERAS DE ASIMETRÍA
 ┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
 │ 1. La Caja Negra de       │ 2. La "Falacia del        │ 3. La Asimetría           │
 │    Costos de Cambio       │    Dividendo"             │    en Seguros             │
 │                           │                           │                           │
 │ • Prepago (LGB Art. 100)  │ • Bajar la cuota hoy      │ • Tasas gancho con primas │
 │ • Arancel CBR (-50%)      │   extendiendo el plazo    │   infladas en incendio    │
 │ • Tasación + Títulos      │ • Genera sobrecostos de   │ • Curva actuarial: el     │
 │ • Exención DL 3475        │   cientos de UF en        │   desgravamen se triplica │
 │   (Timbres y Estampillas) │   intereses acumulados    │   al envejecer            │
 └───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

### Las Tres Barreras de Asimetría

1. **La Caja Negra de los Costos de Cambio:**  
   Calcular cuánto cuesta cambiarse de banco es engorroso y opaco. Implica calcular la **comisión de prepago** (tope legal de 1.5 meses de intereses según el Art. 100 de la Ley General de Bancos), los aranceles del **Conservador de Bienes Raíces (CBR)** con el descuento legal del 50%, la tasación, el estudio de títulos, los gastos notariales y la exención tributaria del impuesto de timbres y estampillas (D.L. 3475). Ningún simulador bancario tradicional desglosa esto con transparencia.

2. **La "Falacia del Dividendo":**  
   Muchos deudores caen en la trampa comercial de *"reducir su dividendo mensual"*. Un ejecutivo les propone extender un crédito con 15 años remanentes a un nuevo plazo de 25 años: el dividendo mensual en efecto disminuye, pero el costo total acumulado en intereses aumenta drásticamente, destruyendo patrimonio neto a largo plazo.

3. **La Asimetría en Seguros:**  
   Los bancos suelen publicitar tasas anuales atractivas, pero compensan el margen cobrando primas elevadas en los seguros obligatorios de desgravamen e incendio/sismo. Además, el seguro de desgravamen se encarece exponencialmente a medida que el titular envejece, por lo que una tasa nominal más baja en otro banco no garantiza un ahorro real si la póliza es más costosa.

Ante esta realidad, decidí abordar el desafío como un problema de **ingeniería de software y optimización cuantitativa**: así nació **HipoRefi-CL**.

---

## 2. Visión y Propuesta de Valor de HipoRefi-CL

HipoRefi-CL está concebido como una plataforma analítica de extremo a extremo que responde de forma determinista y reproducible a una sola pregunta:

> *¿Conviene o no conviene refinanciar este crédito hipotecario hoy, cuánto dinero se ahorra en valor presente neto, y en cuántos meses exactos se recupera la inversión de cambiar de banco?*

Para lograrlo, la plataforma integra:
- **Datos macroeconómicos en vivo:** Conexión automatizada a la API del Banco Central de Chile (UF diaria, TPM) y a las series estadísticas de la CMF.
- **Web scraping headless:** Monitoreo con Playwright de simuladores públicos de **7 entidades financieras** en Chile (BancoEstado vía Casaverso, Santander, BCI, Banco de Chile/Toctoc, Itaú, Consorcio, Falabella y Banco Internacional).
- **Extracción de cartolas PDF:** Pipeline híbrido (regex calibrado a la banca chilena + fallback estructurado con LLMs y esquemas Pydantic v2).
- **Motor financiero de alta precisión:** Amortización francesa y alemana en UF, recargos actuariales de desgravamen por tramos de edad, prepagos parciales y análisis de estrés para créditos con tasa mixta.
- **Doble interfaz de usuario:** Una **API REST moderna con FastAPI** y un **Dashboard interactivo en Streamlit** de 8 pestañas con gráficos Plotly y generación de informes ejecutivos en PDF mediante ReportLab.

---

## 3. Arquitectura del Sistema

El sistema sigue una arquitectura modular desacoplada en capas:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          INGESTA DE DATOS                              │
│  ┌───────────────────────┐  ┌───────────────────┐  ┌────────────────┐  │
│  │   API Banco Central   │  │   Estadísticas    │  │ Web Scraping   │  │
│  │  - UF diaria en vivo  │  │   CMF (Tasas      │  │ Headless       │  │
│  │  - TPM (4.50%)        │  │   Promedio Sis.)  │  │ (Playwright)   │  │
│  └───────────┬───────────┘  └─────────┬─────────┘  └────────┬───────┘  │
└──────────────┼────────────────────────┼─────────────────────┼──────────┘
               │                        │                     │
               ▼                        ▼                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  CAPA DE ALMACENAMIENTO & PERSISTENCIA                 │
│  DuckDB (Local / In-Process / Concurrencia segura con fallback RAM)   │
│  - macro_series  |  bank_offers  |  saved_simulations                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MOTOR FINANCIERO (CORE)                         │
│  • Amortización Francesa y Alemana (Vectorizado con NumPy)             │
│  • Costos Normativos de Cambio (Ley 21.236 + DL 3475 + LGB Art. 100)  │
│  • Métricas: VPN (UF), Payback Dinámico, Ahorro Vida del Crédito      │
│  • Módulo Avanzado: Prepagos, Tasa Mixta (Monte Carlo), Actuarial     │
└───────────────────────▲────────────────────────▲───────────────────────┘
                        │                        │
┌───────────────────────┴──────┐  ┌──────────────┴───────────────────────┐
│     EXTRACCIÓN DOCUMENTAL    │  │        CAPAS DE CONSUMO & UX         │
│  • Cartolas PDF (pypdf)      │  │  • FastAPI REST API (Swagger UI)     │
│  • Heurísticas Regex Chile   │  │  • Streamlit Web App (8 Pestañas)    │
│  • Fallback LLM estructurado │  │  • Comparador Head-to-Head           │
│  • Modal de Confirmación     │  │  • Reportes Ejecutivos PDF           │
└──────────────────────────────┘  └──────────────────────────────────────┘
```

---

## 4. El Núcleo Cuantitativo: La Matemática Real en UF

Una decisión metodológica central en HipoRefi-CL es que **toda la matemática se formula en Unidades de Fomento (UF)**. La inflación queda neutralizada dentro del modelo: si se analizara en pesos chilenos nominales a 25 años, los flujos estarían severamente distorsionados. Los pesos se utilizan exclusivamente para contextualizar el valor de la cuota en el día presente.

### 4.1. Amortización Francesa vs. Alemana en UF

#### Sistema Francés (Estándar de la Banca Chilena)
El sistema francés se caracteriza por un **dividendo financiero constante** $D_f$ a lo largo de toda la vigencia del crédito.

Dado:
- $S_0$: Saldo de capital insoluto remanente (UF).
- $i_a$: Tasa de interés anual nominal pactada.
- $n$: Número de dividendos mensuales remanentes.

La tasa de interés mensual equivalente bajo convención chilena es:
$$r = (1 + i_a)^{1/12} - 1$$

El dividendo financiero mensual constante (sin seguros) es:
$$D_f = S_0 \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

En cada mes $t \in \{1, 2, \dots, n\}$:
- Interés devengado: $I_t = S_{t-1} \cdot r$
- Amortización de capital: $A_t = D_f - I_t$
- Saldo final de capital: $S_t = S_{t-1} - A_t$

#### Sistema Alemán (Amortización de Capital Constante)
En el sistema alemán, la amortización de capital es fija cada mes:
$$A_t = \frac{S_0}{n} \quad \forall t$$

El dividendo financiero es decreciente en el tiempo, ya que los intereses disminuyen linealmente:
$$I_t = S_{t-1} \cdot r$$
$$D_f(t) = A_t + I_t = \frac{S_0}{n} + S_{t-1} \cdot r$$

<div class="article-callout tip">
  <div class="article-callout-title">💡 Hallazgo Cuantitativo</div>
  A igualdad de tasa y plazo, el sistema alemán amortiza capital mucho más rápido al inicio, lo que reduce el total acumulado de intereses entre un <strong>10% y un 18%</strong> respecto al sistema francés. HipoRefi-CL permite modelar y comparar ambos sistemas de amortización lado a lado.
</div>

---

### 4.2. La Anatomía de los Seguros Obligatorios

En Chile, todo crédito para la vivienda exige legalmente dos seguros:

1. **Seguro de Incendio y Sismo:**  
   Se calcula sobre el valor de tasación del inmueble deduciendo el terreno (valor de reconstrucción $V_{\text{rec}}$). Es un valor fijo en UF mes a mes:
   $$g_{\text{inc}} = V_{\text{rec}} \cdot \tau_{\text{inc}}$$

2. **Seguro de Desgravamen con Curva Actuarial por Edad:**  
   Cubre el saldo deudor insoluto ante fallecimiento o invalidez total del deudor. Su tasa mensual por mil $\tau_{\text{desg}}$ depende directamente de la **edad alcanzada** por el titular en cada período.

En `src/core/advanced_financial.py`, implementé una curva actuarial calibrada según las tablas de mortalidad chilenas MI-2006 y las licitaciones colectivas vigentes del mercado:

| Tramo Etario | Tasa Mensual por Mil ($\tau_{\text{desg}}$) | Prima para Saldo de 3.000 UF |
| :---: | :---: | :---: |
| $\le 30$ años | $0.0150\%$ ($0.150$ ‰) | $0.450$ UF / mes (~$17.000 CLP) |
| $31 - 40$ años | $0.0220\%$ ($0.220$ ‰) | $0.660$ UF / mes (~$25.000 CLP) |
| $41 - 50$ años | $0.0380\%$ ($0.380$ ‰) | $1.140$ UF / mes (~$43.000 CLP) |
| $51 - 60$ años | $0.0750\%$ ($0.750$ ‰) | $2.250$ UF / mes (~$85.000 CLP) |
| $61 - 70$ años | $0.1600\%$ ($1.600$ ‰) | $4.800$ UF / mes (~$182.000 CLP) |
| $> 70$ años | $0.3200\%$ ($3.200$ ‰) | $9.600$ UF / mes (~$365.000 CLP) |

El sistema además evalúa la **regla de asegurabilidad técnica al vencimiento**: la banca suele rechazar operaciones cuyo crédito culmine cuando el deudor tenga más de 75 u 80 años de edad.

---

### 4.3. Costos Normativos de Cambio bajo Regulación Chilena

Para migrar una hipoteca a un nuevo banco $k$, se incurre en una serie de costos de cierre regulados por ley:

$$\begin{aligned}
G_k = \; &\text{Prepago}(S_0) + \text{Tasación} + \text{Estudio de Títulos} \\
&+ \text{Notaría} + \text{Conservador (CBR)} + \text{Timbres (DL 3475)}
\end{aligned}$$

HipoRefi-CL codifica cada restricción legal en `src/core/switching_costs.py`:

1. **Comisión de Prepago (Ley General de Bancos Art. 100):**  
   Para créditos para la vivienda de hasta 5.000 UF, la ley establece un tope máximo estricto: **no puede exceder el equivalente a 1.5 meses de intereses pactados** sobre el capital que se prepaga:
   $$\text{Prepago}(S_0) = 1.5 \cdot (S_0 \cdot r_0)$$

2. **Exención de Timbres y Estampillas (D.L. 3475):**  
   Si el nuevo crédito se destina **exclusivamente al refinanciamiento** del saldo deudor anterior, la operación goza de **exención total (0 UF)** del impuesto de timbres (que normalmente grava las operaciones de crédito de dinero con un 0.8%).

3. **Aranceles del Conservador de Bienes Raíces (Ley N° 21.236):**  
   Bajo portabilidad financiera con subrogación, los derechos arancelarios de inscripción registral gozan de un **descuento legal del 50%**, modelado como un $\sim 0.1\%$ del saldo insoluto con cota mínima de 1.5 UF y tope de 12.0 UF.

4. **Gastos Operacionales Fijos:**  
   Tasación ($\sim 3.0$ UF), Estudio de Títulos ($\sim 4.0$ UF) y Gastos Notariales regulados ($\sim 1.0$ UF).

---

### 4.4. Métricas de Decisión: VPN, Payback Dinámico y Semáforo Patrimonial

El sistema compara los flujos mensuales del crédito actual $D_0(t)$ frente a la nueva oferta $D_k(t)$ utilizando una **tasa de descuento real del deudor $\delta$** (por defecto $2.5\%$ anual real en UF, correspondiente al costo de oportunidad o renta fija soberana indexada):

$$\Delta F_t = D_0(t) - D_k(t)$$

#### Valor Presente Neto (VPN)
- **Gastos pagados al contado en $t=0$:**
  $$\text{VPN}_k = -G_k + \sum_{t=1}^{n_k} \frac{\Delta F_t}{(1 + \delta)^t}$$
- **Gastos financiados en el nuevo crédito ($S_k = S_0 + G_k$):**
  $$\text{VPN}_k = \sum_{t=1}^{n_k} \frac{D_0(t) - D_k(t; S_0 + G_k)}{(1 + \delta)^t}$$

#### Período de Recuperación Dinámico (*Payback* Descontado $t^*$)
Es el mes exacto en que la sumatoria acumulada de ahorros mensuales descontados absorbe íntegramente los gastos de cambio:
$$t^* = \min \left\{ T \in [1, n_k] \;\middle|\; \sum_{t=1}^{T} \frac{\Delta F_t}{(1 + \delta)^t} \ge G_k \right\}$$

#### El Semáforo Patrimonial
Para eliminar la ambigüedad, HipoRefi-CL clasifica cada alternativa con reglas deterministas:
- 🟢 **RECOMENDADO:** $\text{VPN} > 15\text{ UF}$ y $t^* \le 36\text{ meses}$.
- 🟡 **EVALUAR CON CAUTELA:** $\text{VPN} > 0\text{ UF}$, pero $36 < t^* \le 60\text{ meses}$ (riesgo si la propiedad se vende en el mediano plazo).
- 🔴 **NO CONVIENE:** $\text{VPN} \le 0\text{ UF}$ o $t^* > 60\text{ meses}$ o aumento neto de intereses por extensión de plazo.

---

### 4.5. Abonos Extraordinarios y Riesgo de Tasa Mixta

En `src/core/advanced_financial.py` se incorporaron dos herramientas cuantitativas avanzadas:

1. **Optimizador de Prepagos Parciales (LGB Art. 100):**  
   Evalúa la inyección de capital extraordinario (bonos anuales, ahorros o liquidaciones) enfrentando dos alternativas:
   - **Opción A (Reducción de Plazo):** Mantiene el dividendo y acorta la duración del crédito. Minimiza los intereses pagados y maximiza el VPN.
   - **Opción B (Reducción de Dividendo):** Mantiene el plazo y disminuye la carga mensual inmediata. Proporciona alivio de liquidez a corto plazo.

2. **Analizador de Riesgo de Tasa Mixta vs. Fija:**  
   Muchos bancos publicitan tasas mixtas (fijas por 3 o 5 años y luego flotantes indexadas a TAB/TPM). El sistema aplica **matrices de estrés macroeconómico** (Escenario Base, Bajista $-150\text{ bps}$, Alcista $+150\text{ bps}$ y Severo $+300\text{ bps}$) y calcula la **Tasa de Quiebre (*Breakeven Floating Rate*)**: la tasa máxima a la que puede llegar el crédito mixto en su período variable antes de que su costo supere al de un crédito de tasa fija garantizada.

---

## 5. Ingesta de Mercado y Web Scraping Headless con Playwright

En Chile, los bancos no ofrecen APIs públicas para cotizar hipotecas. Sus simuladores residen en SPAs complejas (construidas en React, Angular o Vue), protegidas con validaciones de RUT y dinámicas de interacción complejas.

En `src/scrapers/headless_scrapers.py`, construí un orquestador que ejecuta navegadores **Chromium headless vía Playwright** para interactuar directamente con los portales de 7 entidades bancarias:

```python
# Extracto del scraper de Santander en headless_scrapers.py
async def scrape_santander_live(principal_uf: float, term_years: int) -> Optional[ScrapedBankQuote]:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://banco.santander.cl/personas/creditos/credito-hipotecario", timeout=25000)
            # Interacción con selectores dinámicos y sliders
            await page.fill("input[name='montoPropiedad']", str(int(principal_uf * 1.25)))
            await page.fill("input[name='montoCredito']", str(int(principal_uf)))
            await page.select_option("select[name='plazo']", str(term_years))
            await page.click("button:has-text('Simular')")
            
            await page.wait_for_selector(".resultado-dividendo", timeout=12000)
            dividend_text = await page.inner_text(".resultado-dividendo")
            rate_text = await page.inner_text(".resultado-tasa")
            
            # Normalización y parsing robusto
            ...
        finally:
            await browser.close()
```

### Entidades Monitoreadas
1. **BancoEstado:** Portal inmobiliario **Casaverso**.
2. **Banco Santander:** Simulador hipotecario público.
3. **BCI (Banco de Crédito e Inversiones):** Extracción de tasas y CAE.
4. **Banco de Chile:** Integración con portal abierto de Toctoc.
5. **Banco Itaú:** Cotización de dividendo en UF y desglose de pólizas.
6. **Consorcio:** Simulación de crédito para mutuarias y banco.
7. **Banco Falabella y Banco Internacional:** Endpoints REST internos con fallback regex nativo.

### Persistencia Embebida y Concurrencia en DuckDB
Para el almacenamiento de tasas y simulaciones utilicé **DuckDB** (`data/market_rates.duckdb`). DuckDB ofrece almacenamiento columnar OLAP de alto rendimiento sin requerir un servidor de base de datos externo.

Para resolver los bloqueos de concurrencia cuando el servidor de FastAPI y el dashboard de Streamlit intentan acceder simultáneamente al archivo en disco, implementé un **mecanismo de fallback transparente a memoria (`:memory:`)**, garantizando disponibilidad ininterrumpida.

---

## 6. Extracción Documental Inteligente de Cartolas Bancarias

Uno de los mayores dolores de cabeza para un deudor es tener que transcribir los datos de su estado de cuenta bancario: saldo de capital, tasa pactada, meses restantes y seguros.

En `src/parsers/` diseñé un pipeline en dos etapas:

1. **Fase Heurística (Determinista y Local con `pypdf`):**  
   Extrae el texto del PDF y aplica expresiones regulares calibradas para las convenciones tipográficas de los bancos chilenos. Incluye la función `parse_chilean_number`, que resuelve la alternancia entre puntos y comas para miles y decimales.  
   *Tiempo de respuesta:* Menos de 50 ms, costo computacional nulo y privacidad garantizada.

2. **Fase LLM (Fallback Estructurado con Pydantic):**  
   Si el estado de cuenta tiene un formato tabular inusual o la extracción determinista detecta campos incompletos, el texto se envía a un modelo de lenguaje que retorna un esquema validado por **Pydantic** (`MortgageStatementExtraction`).

3. **Validación Humana en el Loop (Modal en UI):**  
   En la interfaz de Streamlit, al cargar una cartola, se despliega un **diálogo modal interactivo** que permite al usuario inspeccionar los campos detectados, ajustar cualquier discrepancia y confirmar los valores antes de iniciar el cálculo.

---

## 7. Reportes Ejecutivos en PDF con ReportLab

Para que el análisis sea útil en una negociación bancaria formal, HipoRefi-CL genera un **Informe Ejecutivo y Dictamen de Portabilidad Financiera** de 2 páginas con diseño corporativo (`src/reports/pdf_generator.py`).

Construido íntegramente con **ReportLab**, el generador incluye:
- **Diseño Editorial Corporativo:** Paleta de colores institucional (Navy `#1B4F72`, Slate `#2C3E50`), tipografía jerárquica y márgenes calibrados para impresión.
- **Gráficos Vectoriales Nativos:** Renderizados directamente con `reportlab.graphics.shapes` (gráficos de barras comparativas y curvas de amortización) como elementos `Flowable` puros, sin necesidad de renderizadores web o dependencias externas pesadas.
- **Dictamen Formal de Portabilidad:** Con sello de recomendación patrimonial (badge verde/amarillo/rojo), desglose normativo de costos de la Ley 21.236 y tabla resumen de flujos de caja.

---

## 8. Dashboard en Streamlit & API REST con FastAPI

### El Dashboard Analítico (8 Pestañas)
La interfaz web en **Streamlit** organiza el análisis de forma visual y pedagógica:
1. 🏆 **Comparador de Mercado:** Ranking de instituciones según mayor VPN generado en UF y CLP.
2. 🥊 **Comparador Head-to-Head:** Enfrentamiento directo entre dos bancos o contraofertas con gráfico de brecha patrimonial.
3. 📈 **Punto de Equilibrio & Payback:** Curva de recuperación descontada que visualiza el mes exacto de Break-Even.
4. 🎛️ **Simulador a Medida & Heatmap 2D:** Sliders interactivos y un mapa de calor bidimensional de **Tasa vs. Plazo**.
5. ⚠️ **Detector de la "Falacia del Dividendo":** Muestra gráfica del sobrecosto en intereses al alargar plazos para rebajar cuotas.
6. 📋 **Tabla de Amortización Francesa:** Detalle cuota a cuota con desglose de amortización, interés devengado, seguros y descarga en CSV.
7. 🔬 **Módulo Financiero Avanzado:** Con 4 sub-pestañas: Abonos Extraordinarios, Riesgo Tasa Mixta, Desgravamen Actuarial y Amortización Alemana.
8. 💾 **Historial y Simulaciones Guardadas:** Persistencia en DuckDB para guardar, recargar o auditar escenarios a lo largo del tiempo.

### API RESTful Backend
El backend en **FastAPI** (`src/app/api.py`) expone una API completa con documentación interactiva Swagger (`/docs`):

```bash
# Ejemplo de consumo de la API REST
curl -X POST "http://localhost:8000/api/v1/evaluate-refinance" \
     -H "Content-Type: application/json" \
     -d '{
       "current_credit": {
         "balance_uf": 3200.0,
         "annual_rate": 0.0485,
         "remaining_months": 264,
         "property_value_uf": 4000.0
       },
       "offer": {
         "bank_name": "Banco Santander",
         "annual_rate": 0.0395,
         "term_months": 264
       },
       "finance_closing_costs": false,
       "discount_rate": 0.025
     }'
```

---

## 9. DevOps, Infraestructura y Calidad de Código

- **Gestión de dependencias con `uv`:** Tiempos de instalación de dependencias en milisegundos, garantizando reproducibilidad total.
- **Docker & Docker Compose:** Configuración multi-contenedor que orquesta la API REST y el Dashboard sobre una base DuckDB compartida.
- **Suite de Pruebas Automatizadas (106 tests con `pytest`):** Cobertura exhaustiva de fórmulas de amortización, límites legales de prepago (LGB Art. 100), parsers de cartolas y contratos de API Pydantic.
- **Integración Continua:** Pipeline de GitHub Actions que ejecuta `ruff check` y la suite de pruebas en cada push o pull request.

---

## 10. Caso Práctico Simulado: Los Números Reales

Consideremos un escenario típico de la clase media profesional chilena en 2026:

* **Saldo de Capital Insoluto:** $3.200 \text{ UF}$ (~$121.600.000 CLP).
* **Tasa Original:** $4.85\%$ anual en UF.
* **Plazo Residual:** 22 años (264 meses).
* **Dividendo Original:** $20.25 \text{ UF}$ / mes (sin seguros).
* **Oferta de Portabilidad (Banco BCI):** Tasa $3.95\%$ anual en UF al mismo plazo de 22 años.
* **Gastos de Cambio Totales:** $41.8 \text{ UF}$ (Prepago 1.5 meses: 19.4 UF; Tasación: 3.5 UF; Estudio Títulos: 4.5 UF; Notaría: 1.2 UF; CBR con 50% desc.: 13.2 UF; Timbres: 0.0 UF).

```
                             DIAGNÓSTICO CUANTITATIVO
 ┌───────────────────────────────┬───────────────────────────────┐
 │ Métrica Financiera            │ Valor Resultante              │
 ├───────────────────────────────┼───────────────────────────────┤
 │ Nuevo Dividendo Mensual       │ 18.52 UF/mes                  │
 │ Ahorro Mensual Neto           │ 1.73 UF/mes (~$65.700 CLP)    │
 │ Período de Recupero (Payback) │ 24.1 meses (2.0 años)         │
 │ Valor Presente Neto (VPN)     │ +256.4 UF (~$9.740.000 CLP)   │
 │ Tasa Interna de Retorno (TIR) │ 49.3% anual en UF             │
 │ Dictamen Patrimonial          │ 🟢 ALTAMENTE RECOMENDADO      │
 └───────────────────────────────┴───────────────────────────────┘
```

**Conclusión Financiera:** Si el deudor tiene certeza razonable de conservar la propiedad por más de 2 años y medio, el refinanciamiento es **indiscutiblemente favorable**, generando un ahorro neto equivalente a casi 10 millones de pesos a valor presente.

---

## 11. Conclusión y Código Abierto

La complejidad de la deuda hipotecaria no debe ser un obstáculo para la salud patrimonial de las familias. Desarrollar **HipoRefi-CL** me permitió unificar tres mundos que me apasionan: el **rigor analítico de la ingeniería civil matemática**, la **visión estratégica y de P&L de un MBA**, y el **diseño de software productivo y moderno en Python**.

El proyecto es de código abierto y está disponible en GitHub:

👉 **[Ver Repositorio en GitHub: surzua/HipoRefi-CL](https://github.com/surzua/HipoRefi-CL)**

---
*¿Tienes dudas sobre la metodología, quieres modelar tu crédito o intercambiar perspectivas sobre finanzas cuantitativas? Conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/surzuab/) o escríbeme a `seb.urzua91@gmail.com`.*
