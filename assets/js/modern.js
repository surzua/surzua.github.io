/**
 * SEBASTIAN URZÚA BÓRQUEZ — MODERN PORTFOLIO INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initProjectFiltering();
  initTimelineTabs();
  initProjectModals();
  initEmailCopy();
});

/* ==========================================================================
   Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.innerHTML = theme === 'light' 
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  btn.setAttribute('aria-label', `Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`);
}

/* ==========================================================================
   Navbar Sticky & Active Link on Scroll
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   Mobile Nav Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

/* ==========================================================================
   Project Category Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categoryAttr = card.getAttribute('data-category') || '';
        const categories = categoryAttr.split(/\s+/);
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Timeline Tabs (Experiencia vs Formación)
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const experienceSection = document.getElementById('timeline-experience');
  const educationSection = document.getElementById('timeline-education');

  if (!tabBtns.length || !experienceSection || !educationSection) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      if (target === 'experience') {
        experienceSection.style.display = 'block';
        educationSection.style.display = 'none';
      } else {
        experienceSection.style.display = 'none';
        educationSection.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   Project Details Modal
   ========================================================================== */
const projectData = {
  'falabella-genai': {
    title: 'Corrección Automatizada de Variables de Catálogo (Pipeline GenAI & A/B Testing)',
    org: 'SmartJob – Grupo Falabella (FTC – Corporate Promise Engine)',
    domain: 'GenAI & Supply Chain',
    metric: '> 7.7M USD anuales regional (> 3.8M USD en Chile) · A/B Testing Causal',
    problem: 'Inconsistencias severas y errores tipográficos/unidades en dimensiones físicas empaquetadas (alto, largo, ancho y peso), causando subcobro o sobrecobro de fletes a clientes, pérdidas en almacenamiento y fricciones contractuales con sellers. La inexistencia de un ground truth confiable impedía modelos supervisados estándar.',
    solution: 'Diseño e implementación de un pipeline productivo de 5 fases en GCP / Vertex AI: (1) Preprocesamiento: normalización y limpieza textual de títulos, marcas, modelos, descripciones y taxonomía F2; (2) Etiquetado semántico con LLMs mediante few-shot learning especializado por categoría F2 para agrupar SKUs con packaging equiparable; (3) Normalización y colapso de respuestas a categorías canónicas; (4) Rangos factibles con ground truth sintético combinando distribuciones empíricas del cluster y conocimiento experto inferido; (5) Imputación robusta mediante la mediana estadística de SKUs válidos. Validación experimental causal con A/B Testing estratificado multivariable (seller, precio, categoría, rotación) con Test A/A previo.',
    impact: 'Impacto económico validado experimentalmente en > 7.7M USD anuales a nivel corporativo regional (> 3.8M USD anuales únicamente en Falabella Chile) por regularización de cobros de flete, ventas y cubicaje óptimo.',
    stack: 'GCP (Vertex AI, BigQuery), Python (Polars, Pandas, Scikit-Learn), LLMs / Few-Shot Prompting, A/B Testing, CI/CD'
  },
  'falabella-logistics': {
    title: 'Forecasting de Capacidades & Simplificación Topológica de Red',
    org: 'SmartJob – Grupo Falabella (FTC – Red Logística)',
    domain: 'Supply Chain & Optimización',
    metric: '-2 p.p. en atrasos (Colombia) · +100M CLP ventas protegidas (CyberDay)',
    problem: 'Sobrecargas operativas en nodos críticos de la red e-commerce regional (cross-docking, picking y última milla) y topología de red sobredimensionada con rutas redundantes que ponían en riesgo la promesa de entrega y la estabilidad del motor en eventos de alta demanda.',
    solution: 'Modelamiento predictivo de series de tiempo para proyectar capacidades operativas y anticipar saturaciones en nodos críticos de la red. Implementación de modelamiento espacial mediante clustering origen-destino para consolidar y dar de baja el 40% de rutas redundantes en la red logística.',
    impact: 'Reducción de atrasos operativos en 2 puntos porcentuales sobre un flujo mensual de aproximadamente 500.000 órdenes en la red de Colombia. Prevención de saturación y caídas del motor de promesa en CyberDay (+100M CLP en ventas protegidas) y un 70% de reducción de tiempo operacional en la parametrización de la red.',
    stack: 'GCP (BigQuery), Python (Polars, Scikit-Learn), Pyomo (MIP), Series de Tiempo, Clustering Espacial, Git'
  },
  'itau-recommender': {
    title: 'ItaúX: Motor Look-a-Likes e Hiperpersonalización Comercial',
    org: 'Banco Itaú (Analytics Banca Minorista – Laboratorio ItaúX)',
    domain: 'Banca & Machine Learning',
    metric: '+50% tasa de contacto efectivo · Ganador Premio Transforma 2024',
    problem: 'Campañas comerciales masivas e indiferenciadas (BAU) en banca minorista generaban baja conversión, fricción con el cliente y falta de priorización de rentabilidad para ejecutivos de sucursales digitales.',
    solution: 'Diseño integral en el laboratorio de innovación ItaúX (sucursales piloto IS3 y PB4). Algoritmo multiclase basado en árboles de decisión balanceados por el margen financiero histórico de cada producto contratado. Las hojas del árbol determinan la canasta óptima y sus probabilidades definen el orden de prioridad comercial (créditos de consumo, hipotecarios, tarjetas de crédito, depósitos a plazo, fondos mutuos, abono de remuneraciones y seguros).',
    impact: 'Incremento del +50% en la tasa de contacto efectivo frente al promedio de sucursales digitales del banco. Proyecto galardonado con el premio corporativo Transforma 2024 en la categoría Innovación Data-Driven.',
    stack: 'AWS (MLOps framework), Python (Scikit-Learn, Pandas), LightGBM, SQL Avanzado, Google BigQuery, Salesforce CRM'
  },
  'itau-pitch-llm': {
    title: 'Generador de Argumentario Comercial "Pitch Ganador" (LLMs en CRM)',
    org: 'Banco Itaú (Analytics Banca Minorista – Laboratorio ItaúX)',
    domain: 'GenAI & Finanzas',
    metric: 'Discursos hiperpersonalizados en Salesforce CRM · Speech Analytics',
    problem: 'Aunque el ejecutivo comercial recibía la sugerencia de producto del motor recomendador, existía heterogeneidad y falta de personalización en la conversación telefónica para conectar con las necesidades y perfil de cada cliente.',
    solution: 'Desarrollo de un sistema de recomendación discursiva basado en LLMs que sintetiza variables sociodemográficas y de tenencia de activos con transcripciones de audio históricas de llamadas ejecutivo-cliente. Generación de discursos comerciales hiperpersonalizados que emparejan la acción comercial con el beneficio bancario más afín, integrado directamente en Salesforce CRM.',
    impact: 'Generación de valor comercial en sucursales remotas mediante personalización en tiempo real del pitch de ventas en CRM y mayor consistencia comunicacional.',
    stack: 'LLMs / Prompt Engineering, Speech Analytics, Google BigQuery, Salesforce CRM, Python'
  },
  'hiporefi-cl': {
    title: 'HipoRefi-CL: Simulador & Optimizador Hipotecario en Chile',
    org: 'Open Source · github.com/surzua/HipoRefi-CL',
    domain: 'Finanzas Cuantitativas & Open Source',
    metric: 'Modelamiento en UF · VPN, TIR y Break-Even con Gastos Operacionales',
    problem: 'El mercado hipotecario chileno opera en UF y con costos operacionales (tasación, estudio de títulos, conservador de bienes raíces, notarías) que dificultan evaluar si un refinanciamiento a menor tasa nominal realmente genera ahorro neto en el horizonte del deudor.',
    solution: 'Algoritmo cuantitativo en Python que proyecta tablas de amortización completas (sistema francés/UF), descuenta flujos a valor presente neto (VPN), calcula tasas internas de retorno (TIR) y determina con precisión el plazo de recupero (break-even) del costo de refinanciamiento frente a curvas de tasas de mercado.',
    impact: 'Herramienta reproducible, transparente y de código abierto para deudores e instituciones financieras para optimizar la decisión económica de prepago y refinanciamiento.',
    stack: 'Python, NumPy, Pandas, Modelamiento Financiero Cuantitativo en UF'
  },
  'itau-digital-risk': {
    title: 'Scoring Alternativo con Psicometría & 2° Lugar Itaú Brasil',
    org: 'Banco Itaú (Analytics Banca Minorista)',
    domain: 'Inclusión Financiera & Riesgo Alternativo',
    metric: '2° Lugar Regional Batalla de Datos Itaú Brasil · PoC Cuenta Digital',
    problem: 'Segmentos desbancarizados carecen de historial en bureaus de crédito tradicionales, impidiendo su acceso a cuentas y créditos. Asimismo, la red requería anticipar insatisfacciones y caídas en NPS.',
    solution: 'Investigación y diseño experimental de modelos de riesgo crediticio para segmentos no bancarizados a partir de encuestas psicométricas como variables proxy de cumplimiento. Asimismo, diseño de un modelo predictivo proxy al Net Promoter Score (NPS) para anticipar insatisfacciones y gatillar acciones preventivas.',
    impact: '2do lugar regional en la Batalla de Datos Itaú Brasil frente a equipos de analítica avanzada de toda Latinoamérica. Viabilidad de evaluación de riesgo para la Cuenta Digital sin historial crediticio tradicional.',
    stack: 'AWS MLOps, Google BigQuery, Python, LightGBM, Modelos Psicométricos, SQL'
  },
  'credit-policy': {
    title: 'Credit Policy Optimizer: Frontera Eficiente de Riesgo',
    org: 'Open Source · github.com/surzua/credit-policy-optimizer',
    domain: 'Riesgo Financiero & Optimización',
    metric: 'Búsqueda de Cut-off Óptimo · Maximización de Utilidad Neta',
    problem: 'La fijación tradicional de cortes de scoring crediticio se basa en reglas estáticas que no equilibran simultáneamente el volumen de colocación deseado, la pérdida esperada (Expected Loss / PD) y el margen financiero.',
    solution: 'Framework algorítmico que desacopla la probabilidad de default estimada del corte de decisión, simulando matrices de costo-beneficio y optimizando el umbral de aprobación sobre la curva ROC para maximizar la función de utilidad del portafolio.',
    impact: 'Generación automatizada de curvas de trade-off entre riesgo y volumen para la toma de decisiones ágil y rigurosa en comités de crédito.',
    stack: 'Python, SciPy Optimize, Matplotlib, Scikit-Learn, Risk Analytics'
  },
  'kpmg-fraud-audit': {
    title: 'Detección de Fraude en Retail & Vectorización Actuarial',
    org: 'KPMG (Data & Analytics – Insights Center)',
    domain: 'Supply Chain & Auditoría Cuantitativa',
    metric: 'Scoring Multivariable de Fraude · Vectorización de Pasivos en R (IAS 19)',
    problem: 'Vulnerabilidades en notas de crédito y pagos a proveedores en retail mayorista; morosidad en telepeaje de autopistas; y tiempos excesivos en el cálculo manual de pasivos laborales de indemnización (PIAS / IAS 19).',
    solution: 'Co-diseño de más de 20 reglas de negocio y construcción de motor estadístico de scoring multivariable para priorizar transacciones sospechosas en cientos de miles de registros. Modelamiento de morosidad con K-Prototypes en TAG de autopistas urbanas. Reingeniería y vectorización de modelos actuariales en scripts de R.',
    impact: 'Fiscalización focalizada de fraudes y fugas de capital en retail; optimización drástica de tiempos de cómputo actuarial garantizando trazabilidad y reproducibilidad matemática ante comités de auditoría; y marcos de Data Governance DAMA para aseguradoras y AFPs.',
    stack: 'Python, R Vectorizado, OpenCV, Tesseract OCR, K-Prototypes, Metodología DAMA, SQL'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay || !modalClose) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-org').textContent = data.org;
        document.getElementById('modal-domain').textContent = data.domain;
        document.getElementById('modal-metric').textContent = data.metric;
        document.getElementById('modal-problem').textContent = data.problem;
        document.getElementById('modal-solution').textContent = data.solution;
        document.getElementById('modal-impact').textContent = data.impact;
        document.getElementById('modal-stack').textContent = data.stack;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Email Copy with Toast Notification
   ========================================================================== */
function initEmailCopy() {
  const emailBoxes = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');

  emailBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const email = 'seb.urzua91@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('¡Email copiado al portapapeles! (seb.urzua91@gmail.com)');
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const msgSpan = toast.querySelector('.toast-msg');
  if (msgSpan) msgSpan.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
