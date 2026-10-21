---
layout: article
title: "La Falacia del Fondo Seguro: Anatomía Forense del Desplome del Fondo E de las AFP en 2026"
subtitle: "Auditoría cuantitativa a los microdatos oficiales de inversiones: atribución factorial de pérdidas (-79,7% en swaps), duración encubierta a 17 años y el daño irreversible en pensiones vitalicias."
category: "Finanzas Cuantitativas & Regulación Previsional"
domain_class: "finance"
date: 2026-10-15
read_time: "18 min de lectura"
permalink: /articulos/la-falacia-del-fondo-seguro-desplome-fondo-e/
---

<div class="article-action-banner">
  <div>
    <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; margin-bottom: 4px;">
      📖 ¿Primera vez analizando swaps, duración o renta fija?
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary);">
      Hemos preparado una guía didáctica con analogías cotidianas para comprender cada concepto financiero sin ser economista.
    </div>
  </div>
  <div class="article-action-buttons">
    <a href="/articulos/guia-finanzas-fondo-e/" class="btn btn-primary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Ver Guía Didáctica Esencial ➔
    </a>
    <a href="https://github.com/surzua/fondo-e-forensics" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub: fondo-e-forensics
    </a>
  </div>
</div>

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>📌</span> Tesis Ejecutiva en 30 Segundos
  </div>
  <p>
    Esta semana, el sistema de pensiones chileno vivió un terremoto institucional sin precedentes: la <strong>Superintendencia de Pensiones formuló cargos e inició un proceso sancionatorio histórico contra las siete administradoras del sistema (Capital, Cuprum, Habitat, Modelo, Planvital, Provida y UNO)</strong> por presunta vulneración del deber fiduciario, lealtad y diligencia (<strong>Artículo 147 del D.L. 3.500</strong> y <strong>NCG N° 340</strong>), tras confirmarse un agujero de valorización estimado en <strong>US&#36; 7.700 millones</strong> en los fondos conservadores.
  </p>
  <p>
    Durante los primeros nueve meses de 2026, el <strong>Fondo E</strong> —el instrumento concebido por ley como el refugio inexpugnable para los trabajadores a punto de jubilarse— se desplomó un <strong>-10,39% real</strong> (-7,40% nominal).
  </p>
  <p>
    Mientras el gremio de las AFP se defendió públicamente en <em>La Tercera</em> y <em>Diario Financiero</em> argumentando que <em>"no fueron apuestas especulativas"</em>, culpando al alza de tasas de la Reserva Federal y afirmando que <em>"no hay pérdidas definitivas, sino alzas y bajas en su valorización que se revertirán en el mediano y largo plazo"</em>, <strong>esta auditoría forense abre la caja negra de los microdatos para contrastar el discurso público con la evidencia matemática:</strong>
  </p>
  <ul style="margin-top: 10px; margin-bottom: 0;">
    <li><strong>La autopsia matemática:</strong> El desplome no fue provocado por la deuda local ni por un castigo genérico de Wall Street. <strong>El 79,7% de la pérdida nominal total</strong> (-5,90 pp de los -7,40 pp perdidos) provino exclusivamente de apuestas en contratos de <strong>Swaps de Tasas de Interés (IRS)</strong> en EE.UU. y derivados locales. Los bonos soberanos chilenos físicos apenas explicaron el 9,5% (-0,7 pp) de la caída.</li>
    <li><strong>El arbitraje regulatorio:</strong> No fue un inocente "calce de pasivos" ante la menor liquidez de bonos locales tras los retiros, como alega el gremio. Las AFP aprovecharon vacíos en la normativa para estirar la sensibilidad del Fondo E desde sus 5 años históricos hasta <strong>17,0 años de duración efectiva total</strong>, asumiendo el perfil de riesgo de un hedge fund apalancado mediante derivados OTC fuera de balance a costo cero de caja inicial, sumado a una sobrecobertura corta en dólares (Short USD) al 150% que dinamitó el amortiguador cambiario.</li>
    <li><strong>La falacia del "largo plazo" en desacumulación:</strong> El argumento gremial de que <em>"las valorizaciones se recuperan esperando 3 a 5 años"</em> es una falacia actuarial destructiva. Quien liquida sus fondos hoy para contratar una renta vitalicia consolida una <strong>merma irreversible de por vida de 10% a 11% en su pensión mensual vitalicia</strong>, exigiendo hasta <strong>21 meses (casi 2 años) de trabajo forzado adicional</strong> solo para intentar reponer el patrimonio evaporado.</li>
    <li><strong>El dilema de la sanción:</strong> Las multas administrativas que pueda aplicar el regulador irán a beneficio fiscal. El debate urgente es cómo se resarce el daño patrimonial concreto a los jubilados de 2026 y si los directores de las AFP deberán responder con su patrimonio personal, tal como advirtió el Ministerio de Hacienda.</li>
  </ul>
</div>

---

## 1. El Caso de "Don Juan" y la Respuesta a la Asociación de AFP

En recientes declaraciones de prensa a *La Tercera* y *Diario Financiero* (octubre de 2026), los principales voceros de la Asociación de AFP —su presidente ejecutivo, **León Fernández de Castro**, y su gerente de estudios, **Roberto Fuentes**— salieron al paso del proceso sancionatorio afirmando que en el sistema de pensiones *"no hay pérdidas o ganancias definitivas, sino alzas y bajas en su valorización"* y que históricamente estas fluctuaciones contables se revierten en el mediano y largo plazo.

Para evaluar la validez de este axioma, aterricémoslo en la realidad de un afiliado de carne y hueso: llamémoslo **Don Juan**, 64 años, quien tras 40 años de cotizaciones ininterrumpidas acumuló **\$100.000.000 CLP** (aproximadamente 2.530 UF) con el plan de jubilarse a los 65 años en diciembre de 2026.

Siguiendo disciplinadamente el mandato del Decreto Ley 3.500 y todas las recomendaciones institucionales, Don Juan mantuvo su saldo en el **Fondo E (Más Conservador)**. La promesa republicana era clara: *si estás a meses del retiro, no debes arriesgarte en acciones (Fondo A); debes proteger tu esfuerzo de toda una vida en renta fija segura.*

Al cierre de septiembre de 2026, la realidad demolió la promesa:
* Su saldo real deflactado por UF cayó a **\$89.610.000 CLP**. Don Juan perdió **\$10.390.000 CLP** de poder adquisitivo en solo 9 meses.
* Si Don Juan acude hoy a jubilarse y cotiza una Renta Vitalicia o un Retiro Programado, su pensión mensual autofinanciada cae de **\$664.000 CLP/mes a \$595.000 CLP/mes**. Es un recorte permanente de **\$69.000 CLP mensuales de por vida**.

<div class="article-callout warning">
  <div class="article-callout-title">
    <span>⚠️</span> La Falacia Económica del "Largo Plazo"
  </div>
  <p>
    Un afiliado en etapa de acumulación (25 o 35 años) puede esperar que el ciclo económico revierta una baja de valorización contable. <strong>Un trabajador en etapa de desacumulación no tiene 5 años de horizonte.</strong>
  </p>
  <p style="margin-bottom: 0;">
    En el instante exacto en que Don Juan se pensiona o traspasa sus cuotas a una compañía de seguros, la "baja de valorización" se liquida en el mercado y se transforma en una pérdida de hormigón armado. No hay reversión futura posible para él.
  </p>
</div>

---

## 2. Primer Shock Empírico: The Underwater & VaR Shock Chart

La magnitud de la anomalía ocurrida en 2026 queda en evidencia al comparar el comportamiento del Fondo E frente a los demás activos del mercado chileno:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/fondo-e/producto1_underwater_var_16x9.png" alt="The Underwater & VaR Shock Chart" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 1: Curva de Drawdown Histórico y Bandas de Value at Risk (VaR) del Fondo E.</strong><br>
    <em>Panel Superior:</em> Evolución de un saldo base real de &#36;100 MM (Fondo E vs. Fondo A vs. Benchmark libre de riesgo UF+3,2%). <em>Panel Inferior:</em> Curva de Drawdown histórico del Fondo E superpuesta con las bandas de Value at Risk (VaR 95% y 99% Cornish-Fisher).
  </div>
</div>

### Los Hechos que Derriban el Relato de "Riesgo Normal":
1. **Inversión Extrema de Roles:** En los primeros 9 meses de 2026, el Fondo E se desplomó un **-10,39% real**, mientras que el **Fondo A (Renta Variable Pura) subió +8,61% real**. El instrumento catalogado por ley como el más seguro exhibió una dinámica destructiva 7 veces superior a la del fondo más agresivo del sistema.
2. **Perforación Sistemática del Value at Risk (VaR):** Bajo una distribución normal de rendimientos, una pérdida que traspase la banda de **VaR al 99%** debería ocurrir apenas una vez cada 100 meses (más de 8 años). En 2026, el Fondo E perforó de forma continua sus límites de VaR al 95% y 99% Cornish-Fisher, certificando la presencia de **colas pesadas (*fat tails*)** inducidas por apalancamiento sintético no transparente.
3. **El Peor Drawdown en Dos Décadas:** Con una caída acumulada desde máximos que superó el -15% real (dejando atrás los shocks de 2021 y 2023), el Fondo E dejó de operar como un vehículo de preservación de capital para comportarse como un activo especulativo de renta fija ultra-larga.

---

## 3. Descomposición Factorial (Brinson Waterfall): ¿Dónde se Fueron 8 de Cada 10 Pesos?

En sus descargos públicos, la Asociación de AFP argumentó que las pérdidas obedecieron a la falta de títulos de deuda local tras los retiros del 10% y a un shock macroeconómico internacional inevitable originado por las alzas de tasas de la Reserva Federal.

Para someter esta coartada a escrutinio científico, desarrollamos una **descomposición factorial aditiva de retornos** sobre la cartera desagregada del Fondo E al cierre del tercer trimestre de 2026. Los resultados desmontan de raíz la tesis del "shock fortuito en bonos tradicionales":

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/fondo-e/producto2_waterfall_atribucion_16x9.png" alt="Waterfall de Atribución Factorial de Pérdidas" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 2: Cascada Factorial de Pérdidas del Fondo E en 2026.</strong><br>
    Desglose del retorno nominal (-7,40%) y real (-10,39%) por tipo de instrumento financiero y efecto de inflación arrastrada.
  </div>
</div>

### La Tabla Forense de Atribución (Cierre Septiembre 2026):

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th style="text-align: left;">Instrumento Financiero / Factor</th>
        <th style="text-align: center;">Contribución Directa (pp)</th>
        <th style="text-align: center;">% del Daño Nominal Total</th>
        <th style="text-align: left;">Estrategia Real Ejecutada por las AFP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Swaps de Tasas Extranjeras (IRS USD)</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-4,50 pp</td>
        <td style="text-align: center; font-weight: 700;">60,8%</td>
        <td>Posición pagadora de tasa fija en EE.UU. apostando a recortes agresivos de la Fed.</td>
      </tr>
      <tr>
        <td><strong>Swaps de Tasas Locales (SPC CLP/UF)</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-1,40 pp</td>
        <td style="text-align: center; font-weight: 700;">18,9%</td>
        <td>Contratos de swaps promedio Cámara y swaps contra bonos BCP/BCU.</td>
      </tr>
      <tr>
        <td><strong>Forwards de Tipo de Cambio (Short USD)</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-0,80 pp</td>
        <td style="text-align: center;">10,8%</td>
        <td>Venta de futuros de dólares al 150% de activos foráneos; golpe al subir el dólar de &#36;911 a &#36;970.</td>
      </tr>
      <tr>
        <td><strong>Bonos Físicos de Renta Fija (Local y Ext.)</strong></td>
        <td style="text-align: center;">-0,70 pp</td>
        <td style="text-align: center;">9,5%</td>
        <td>Cartera de deuda soberana de Tesorería, bonos bancarios y corporativos grado de inversión.</td>
      </tr>
      <tr style="border-top: 2px solid var(--border-subtle); background: var(--bg-surface);">
        <td><strong>Subtotal Retorno Nominal</strong></td>
        <td style="text-align: center; font-weight: 800;">-7,40%</td>
        <td style="text-align: center; font-weight: 800;">100,0%</td>
        <td><strong>Caída nominal total del Fondo E a septiembre 2026.</strong></td>
      </tr>
      <tr>
        <td><strong>Efecto Inflación (Variación UF +3,34%)</strong></td>
        <td style="text-align: center;">-2,99 pp</td>
        <td style="text-align: center;">—</td>
        <td>Pérdida de poder adquisitivo por arrastre inflacionario.</td>
      </tr>
      <tr style="background: rgba(239, 68, 68, 0.08); font-weight: 800;">
        <td><strong>Retorno Real Oficial Deflactado por UF</strong></td>
        <td style="text-align: center; color: var(--accent-red);">-10,39%</td>
        <td style="text-align: center;">—</td>
        <td><strong>Cifra auditada y sancionada por la Superintendencia de Pensiones.</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="article-callout tip">
  <div class="article-callout-title">
    <span>🔍</span> Hallazgo Clave que Sustenta los Cargos de la Superintendencia
  </div>
  <p>
    De los <strong>-7,40 puntos porcentuales</strong> que cayó nominalmente el Fondo E, <strong>-5,90 pp provienen exclusivamente de Swaps de Tasas</strong>.
  </p>
  <p style="margin-bottom: 0;">
    <strong>El 79,7% de la pérdida del Fondo E no fue provocada por bonos soberanos ni corporativos: fue provocada por derivados offshore.</strong> Los bonos físicos chilenos solo explican 0,7 puntos de la caída (menos de 1 de cada 10 pesos perdidos).
  </p>
</div>

---

## 4. El Arbitraje de la Duración Sintética: Cuando 5 Años se Transformaron en 17

El gremio de las AFP justificó el uso masivo de derivados como una técnica legítima para *"capturar tasas de largo plazo y calzar carteras ante la menor profundidad del mercado local tras los retiros"*. Sin embargo, el análisis cuantitativo de la elasticidad de cartera desmiente que se haya tratado de un calce prudente.

### La Física Financiera de la Renta Fija:
La sensibilidad del precio de un portafolio de deuda ante variaciones en la tasa de interés se rige por:

$$\frac{\Delta P}{P} \approx -D_{\text{efectiva}} \cdot \Delta y + \frac{1}{2} \cdot C \cdot (\Delta y)^2$$

Donde $D_{\text{efectiva}}$ es la **duración modificada** (sensibilidad porcentual ante un movimiento del 1% en tasas) y $C$ es la convexidad.

Históricamente (2002–2020), el Fondo E operó con una duración en torno a **5,0 años**. Con esa estructura, si las tasas de interés globales subían 100 puntos base (+1,0%), el fondo cedía cerca de un -5%, merma que era amortiguada en pocos meses por el devengo de los cupones.

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/fondo-e/producto3_termometro_duracion_swaps_16x9.png" alt="Termómetro de Duración y Swaps" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 3: Evolución del Nocional en Derivados de Tasas (IRS) vs. US Treasury 10Y y Duración Efectiva.</strong><br>
    Nótese cómo el nocional en swaps se multiplicó casi por 40 (alcanzando US&#36; 206.900 millones), estirando la duración agregada a 17,0 años justo antes del salto de tasas de la Fed.
  </div>
</div>

<div class="article-action-banner" style="margin: 20px 0;">
  <div>
    <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">
      ¿Quieres entender la analogía de la "Caña de Pescar" y el "Balancín de Tasas"?
    </div>
    <div style="font-size: 0.85rem; color: var(--text-secondary);">
      En la Guía Didáctica explicamos con peras y manzanas cómo un bono seguro pierde valor cuando sube la tasa.
    </div>
  </div>
  <a href="/articulos/guia-finanzas-fondo-e/#módulo-4-la-caña-de-pescar-vs-el-garrote-el-secreto-de-la-duración" class="btn btn-secondary btn-sm">
    Ver Explicación Didáctica ➔
  </a>
</div>

### La Jugada Especulativa Fuera de Balance:
1. **Bonos Físicos al Límite:** Las administradoras extendieron la duración de su deuda soberana comprando bonos de Tesorería a 2035–2050 (BTP y BTU), llevando la duración física a **10,2 años**.
2. **Apalancamiento Sintético vía Swaps OTC:** En lugar de detenerse allí, las 7 AFP entraron masivamente en contratos **Interest Rate Swaps (IRS)** en Wall Street: recibieron tasa fija de largo plazo y pagaron tasa flotante (SOFR).
3. **Explosión del Nocional sin Desembolso de Caja:** Al ser instrumentos extrabursátiles (OTC), no requerían desembolso de capital al inicio, eludiendo los límites directos de inversión en balance. El nocional en derivados de tasas saltó de **US\$ 5.300 millones en 2023** a la astronómica cifra de **US\$ 206.900 millones a fines de 2025**.
4. **Duración Agregada de 17,0 Años:** Al sumar la duración física (10,2 años) y la sintética aportada por los swaps (6,8 años), **el Fondo E alcanzó una sensibilidad de 17,0 años**.

### El Desenlace: La Trampa de Tasas
Cuando la inflación en EE.UU. persistió y la Fed mantuvo una política restrictiva, el rendimiento del **Bono del Tesoro a 10 años (US10Y)** saltó de **4,18% a 5,29% (+111 puntos base)**:

$$\text{Impacto Teórico} \approx -17,0 \times (+1,11\%) = -18,87\%$$

Con una duración reglamentaria prudente de 5 años, el impacto habría sido de apenas -5,5%. Al cuadruplicar la sensibilidad mediante swaps, **las administradoras expusieron los ahorros de los jubilados a un riesgo equivalente al de un fondo soberano de alto riesgo o un hedge fund global**.

---

## 5. El Disparo en el Pie: Sobrecobertura Cambiaria Corta (Short USD al 150%)

En la gestión profesional de carteras internacionales, los activos foráneos cuentan con un **estabilizador automático**: en episodios de tensión financiera global o alzas de tasas de la Fed, los capitales buscan refugio en el dólar (*flight-to-quality*), lo que hace subir el tipo de cambio en Chile (CLP se deprecia). La ganancia cambiaria mitiga la caída en el precio de los bonos externos.

**¿Qué hicieron las AFP chilenas en el Fondo E?**
* Vendieron dólares a futuro a través de contratos Forwards USD/CLP por un monto equivalente al **150% de sus activos foráneos reales**.
* Lejos de realizar una cobertura prudente (100%), quedaron **netamente cortas en dólares en un 50%**. Efectuaron una apuesta direccional a que el peso chileno se apreciaría con fuerza.

**El Fiasco:**
En 2026, el dólar en Chile escaló de **\$911 a \$970 CLP** (+6,5%). En vez de amortiguar el golpe, la posición corta generó llamadas de margen y pérdidas netas directas por **-0,80 puntos porcentuales (-\$750 millones de dólares)**, despojando a los afiliados del seguro natural del tipo de cambio.

---

## 6. Efecto Manada (Herding), Formulación de Cargos y la Trampa del Desarme

La homogeneidad de la conducta en la industria explica por qué la Superintendencia de Pensiones formuló cargos de manera simultánea contra las 7 AFP:

<div class="article-figure">
  <div class="article-figure-container">
    <img src="/assets/images/fondo-e/producto4_heatmap_herding_afp_16x9.png" alt="Heatmap y Ranking de AFP" loading="lazy">
  </div>
  <div class="article-figcaption">
    <strong>Figura 4: Efecto Manada (Herding) y Ranking de Daño en las 7 Administradoras.</strong><br>
    <em>Panel Izquierdo:</em> Ranking de caída real acumulada y daño atribuible a swaps. <em>Panel Derecho:</em> Matriz de correlación cruzada diaria de retornos (promedio 0,987).
  </div>
</div>

### La Dinámica de Rebaño:
* La **correlación cruzada diaria** de retornos entre las 7 AFP promedió **0,987**. Todas las administradoras clonaron la misma estructura de duración sintética y posiciones en derivados.
* **El incentivo perverso del encaje:** El diseño regulatorio de la rentabilidad mínima castiga con el patrimonio propio (encaje) a la administradora que se desvíe del promedio de la industria y pierda. En cambio, si toda la manada toma la misma apuesta imprudente y se estrella junta, ninguna AFP queda en desventaja relativa frente al resto.

### El Ranking del Daño Sancionado:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th style="text-align: left;">Administradora</th>
        <th style="text-align: center;">Retorno Real 2026</th>
        <th style="text-align: center;">Daño por Swaps (pp)</th>
        <th style="text-align: left;">Exposición en Derivados</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>AFP Modelo</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-10,90%</td>
        <td style="text-align: center; font-weight: 700;">-6,15 pp</td>
        <td>Máxima agresividad en nocional offshore</td>
      </tr>
      <tr>
        <td><strong>AFP Capital</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-10,80%</td>
        <td style="text-align: center; font-weight: 700;">-6,10 pp</td>
        <td>Mayor sobreponderación en duración larga</td>
      </tr>
      <tr>
        <td><strong>AFP Cuprum</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-10,50%</td>
        <td style="text-align: center; font-weight: 700;">-5,95 pp</td>
        <td>Réplica sistemática de derivados</td>
      </tr>
      <tr>
        <td><strong>AFP Habitat</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-10,35%</td>
        <td style="text-align: center; font-weight: 700;">-5,88 pp</td>
        <td>Alta exposición a contratos IRS en EE.UU.</td>
      </tr>
      <tr>
        <td><strong>AFP Provida</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-10,30%</td>
        <td style="text-align: center; font-weight: 700;">-5,85 pp</td>
        <td>Mayor volumen nocional nominal del sistema</td>
      </tr>
      <tr>
        <td><strong>AFP PlanVital</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-10,15%</td>
        <td style="text-align: center; font-weight: 700;">-5,78 pp</td>
        <td>Réplica de manada</td>
      </tr>
      <tr>
        <td><strong>AFP Uno</strong></td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">-9,90%</td>
        <td style="text-align: center; font-weight: 700;">-5,60 pp</td>
        <td>Menor apalancamiento sintético relativo</td>
      </tr>
      <tr style="border-top: 2px solid var(--border-subtle); background: var(--bg-surface); font-weight: 800;">
        <td><strong>Promedio Sistema</strong></td>
        <td style="text-align: center; color: var(--accent-red);">-10,39%</td>
        <td style="text-align: center;">-5,90 pp</td>
        <td><strong>Conducta colectiva coordinada</strong></td>
      </tr>
    </tbody>
  </table>
</div>

### La Fecha Fatal del 5 de Noviembre:
Alertada por los informes de estabilidad financiera del Banco Central, la Superintendencia emitió una norma que impuso un **techo de 2% de pérdida esperada bajo estrés en derivados**, fijando como plazo perentorio el **5 de noviembre de 2026** para desarmar el exceso de contratos.

Al tener todas las administradoras posiciones idénticas y la misma fecha límite, las contrapartes internacionales en Wall Street conocían de antemano la urgencia de venta. El desarme forzado (*fire sale*) se realizó con amplios castigos de liquidez, cristalizando las pérdidas durante el tercer trimestre de 2026.

---

## 7. Modelamiento Actuarial: El Daño Irreversible en la Pensión de Don Juan

Para traducir los porcentajes a la mesa de las familias chilenas, implementamos el cálculo estricto del **Capital Necesario Unitario (CNU)** mediante las tablas oficiales de mortalidad **RV-2020** de la Superintendencia de Pensiones.

### La Mecánica de la Renta Vitalicia:
La pensión mensual autofinanciada que puede contratar un afiliado está dada por:

$$\text{Pensión Mensual} = \frac{\text{Saldo Acumulado}}{12 \cdot \text{CNU}(x, \text{sexo}, i_t)}$$

Donde el CNU representa el valor presente actuarial de un flujo unitario vitalicio a la edad $x$, considerando probabilidades de supervivencia ($l_x$) y la tasa de descuento técnico ($i_t \approx 3,2\%$ real anual mediante aproximación de Woolhouse).

### La Factura Real de las Apuestas en Derivados:

<div class="article-table-wrapper">
  <table>
    <thead>
      <tr>
        <th style="text-align: left;">Perfil de Afiliado</th>
        <th style="text-align: center;">Saldo Pre-Shock (CLP)</th>
        <th style="text-align: center;">Saldo Post-Shock (CLP)</th>
        <th style="text-align: center;">Pensión Pre-Shock</th>
        <th style="text-align: center;">Pensión Post-Shock</th>
        <th style="text-align: center;">Recorte Mensual Vitalicio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Hombre 65 años (Jubilación)</strong></td>
        <td style="text-align: center;">&#36;100.000.000</td>
        <td style="text-align: center;">&#36;89.610.000</td>
        <td style="text-align: center;">&#36;664.000</td>
        <td style="text-align: center;">&#36;595.000</td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">&#8722;&#36;69.000 / mes de por vida</td>
      </tr>
      <tr>
        <td><strong>Mujer 60 años (Jubilación)</strong></td>
        <td style="text-align: center;">&#36;80.000.000</td>
        <td style="text-align: center;">&#36;71.688.000</td>
        <td style="text-align: center;">&#36;399.000</td>
        <td style="text-align: center;">&#36;358.000</td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">&#8722;&#36;41.000 / mes de por vida</td>
      </tr>
      <tr>
        <td><strong>Hombre 63 años (A 2 años)</strong></td>
        <td style="text-align: center;">&#36;150.000.000</td>
        <td style="text-align: center;">&#36;134.415.000</td>
        <td style="text-align: center;">&#36;958.000</td>
        <td style="text-align: center;">&#36;858.000</td>
        <td style="text-align: center; color: var(--accent-red); font-weight: 700;">&#8722;&#36;100.000 / mes de por vida</td>
      </tr>
    </tbody>
  </table>
</div>

### Simulación de Monte Carlo: ¿Cuánto Cuesta "Esperar"?
Frente a la recomendación de la Asociación de AFP de *"esperar que el ciclo se recupere"*, ejecutamos una simulación de Monte Carlo de **10.000 trayectorias estocásticas mensuales**. Consideramos un retorno real futuro esperado del 3,5% anual, volatilidad histórica del 4,0% y la continuidad del aporte previsional del **10% del sueldo imponible** (\$1,5 millones mensuales).

<div class="article-figure">
  <div class="article-figure-container" style="background: var(--bg-card); border-radius: var(--radius-md); overflow: hidden; padding: 4px;">
    <iframe src="/assets/images/fondo-e/producto5_montecarlo_recuperacion.html" width="100%" height="520" frameborder="0" style="border: 0; width: 100%; min-height: 520px;" loading="lazy"></iframe>
  </div>
  <div class="article-figcaption">
    <strong>Figura 5: Simulación Estocástica de Monte Carlo (10.000 trayectorias mensuales).</strong><br>
    Distribución del tiempo requerido para recuperar el patrimonio de Don Juan (&#36;100 MM) cotizando activamente. Interactúa pasando el cursor sobre las curvas percentilares.
  </div>
</div>

**Resultados de la Simulación:**
* **Percentil 10 (Escenario Favorable):** Requiere **11 meses** de trabajo adicional para recuperar el saldo previo.
* **Percentil 50 (Mediana):** Requiere **21 meses (casi 2 años completos de trabajo extra)** cotizando religiosamente mes a mes solo para volver al punto de partida.
* **Percentil 90 (Escenario Adverso):** Exige **38 meses (más de 3 años)** de postergación del retiro.
* **Probabilidad empírica de no recuperar el patrimonio en 1 año:** **78,4%**.

---

## 8. Más Allá del Proceso Sancionatorio: ¿Quién le Responde a los Jubilados?

La decisión de la Superintendencia de Pensiones de formular cargos contra las administradoras marca un punto de inflexión necesario, pero deja abierto el problema de fondo: **las sanciones administrativas concluyen en multas que se pagan a la Tesorería General de la República (beneficio fiscal), no en una restitución del saldo a los afiliados dañados**.

Tal como advirtió el Ministerio de Hacienda en la prensa esta semana, el marco legal abre la puerta a que los directores de las AFP respondan con su propio patrimonio si se determina que actuaron con negligencia respecto de sus deberes fiduciarios. Sin embargo, para cerrar la grieta que permitió esta catástrofe, se requieren medidas estructurales inmediatas:

1. **Límite Legal Estricto a la Duración Combinada:** La ley debe prohibir taxativamente que la duración total (física + sintética) de los fondos D y E supere los **5,0 años**. No puede permitirse que un fondo de desacumulación opere con 17 años de sensibilidad.
2. **Prohibición de Derivados Especulativos en Fondos Conservadores:** Los derivados de tasas y monedas en los fondos D y E deben restringirse exclusivamente a coberturas simétricas 1:1, sancionando cualquier ratio superior al 100% (como el short USD al 150%).
3. **Mecanismo de Compensación por Incumplimiento Fiduciario:** Si se acredita infracción al artículo 147 del D.L. 3.500, el patrimonio del encaje de las AFP debe destinarse prioritariamente a compensar el menor valor cuota consolidado por los afiliados que jubilaron durante 2026.
4. **Reforma al Esquema de Rentabilidad Mínima:** Desarticular el incentivo al comportamiento de rebaño (*herding*), introduciendo métricas de riesgo absoluto y penalizaciones por concentración de colas pesadas.

---

## 9. Recursos, Metodología y Código Abierto

Este estudio fue desarrollado bajo estrictos principios de reproducibilidad científica y datos abiertos:

* **Aplicación Interactiva en Streamlit:** Disponible en código abierto, permite a cualquier afiliado calcular su recorte exacto de pensión y simular su tiempo de recuperación ingresando su saldo, edad y AFP.
* **Repositorio de Código Abierto:** Disponible en GitHub [`github.com/surzua/fondo-e-forensics`](https://github.com/surzua/fondo-e-forensics), con todos los scrapers, cuadernos Jupyter de validación y suite de pruebas unitarias (`pytest`).
* **Fuentes Oficiales Auditadas:**
  * Superintendencia de Pensiones de Chile: Series diarias de Valores Cuota y Bases de Carteras de Inversión y Derivados (2010–2026).
  * Banco Central de Chile: Series de UF, Tipo de Cambio Observado e Informe de Estabilidad Financiera (IEF).
  * Federal Reserve Bank of St. Louis (FRED): Series `DGS10` y `DGS5` de Rendimiento de Bonos del Tesoro de EE.UU.
  * Tablas de Mortalidad RV-2020: Resoluciones Conjuntas SPensiones y CMF.

<div class="article-action-banner" style="margin-top: 36px;">
  <div>
    <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; margin-bottom: 4px;">
      🎓 Profundiza en los Conceptos Financieros
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary);">
      Revisa la guía didáctica complementaria con explicaciones detalladas sobre duración, swaps de tasas, encaje y el balancín de bonos.
    </div>
  </div>
  <div class="article-action-buttons">
    <a href="/articulos/guia-finanzas-fondo-e/" class="btn btn-primary btn-sm">
      Leer Guía Didáctica de Finanzas ➔
    </a>
  </div>
</div>
