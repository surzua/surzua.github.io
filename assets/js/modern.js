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
  initReadingProgressBar();
  initArticleTables();
  initKpiCounters();
  initHeroGraph();
  initBentoGlow();
  initCommandPalette();
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
  const isArticlePage = document.body.classList.contains('article-page');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30 || isArticlePage) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (isArticlePage) return; // Preserve active state on article pages

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
  'retail-omnichannel-genai': {
    title: 'Corrección Automatizada de Variables de Catálogo (Pipeline GenAI & A/B Testing)',
    org: 'SmartJob · Consultoría para Grupo Retail Omnicanal (Retail Tech – Motor de Promesa Logística)',
    domain: 'GenAI & Supply Chain',
    metric: '> 7.7M USD anuales regional (> 3.8M USD en Chile) · A/B Testing Causal',
    problem: 'Inconsistencias severas y errores tipográficos/unidades en dimensiones físicas empaquetadas (alto, largo, ancho y peso), causando subcobro o sobrecobro de fletes a clientes, pérdidas en almacenamiento y fricciones contractuales con sellers. La inexistencia de un ground truth confiable impedía modelos supervisados estándar.',
    solution: 'Diseño e implementación de un pipeline productivo de 5 fases en GCP / Vertex AI: (1) Preprocesamiento: normalización y limpieza textual de títulos, marcas, modelos, descripciones y taxonomía F2; (2) Etiquetado semántico con LLMs mediante few-shot learning especializado por categoría F2 para agrupar SKUs con packaging equiparable; (3) Normalización y colapso de respuestas a categorías canónicas; (4) Rangos factibles con ground truth sintético combinando distribuciones empíricas del cluster y conocimiento experto inferido; (5) Imputación robusta mediante la mediana estadística de SKUs válidos. Validación experimental causal con A/B Testing estratificado multivariable (seller, precio, categoría, rotación) con Test A/A previo.',
    impact: 'Impacto económico validado experimentalmente en > 7.7M USD anuales a nivel corporativo regional (> 3.8M USD anuales únicamente en Retail Omnicanal Chile) por regularización de cobros de flete, ventas y cubicaje óptimo.',
    stack: 'GCP (Vertex AI, BigQuery), Python (Polars, Pandas, Scikit-Learn), LLMs / Few-Shot Prompting, A/B Testing, CI/CD'
  },
  'retail-omnichannel-logistics': {
    title: 'Forecasting de Capacidades & Simplificación Topológica de Red',
    org: 'SmartJob · Consultoría para Grupo Retail Omnicanal (Retail Tech – Red Logística)',
    domain: 'Supply Chain & Optimización',
    metric: '-2 p.p. en atrasos (Región Andina) · +100M CLP ventas protegidas (CyberDay)',
    problem: 'Sobrecargas operativas en nodos críticos de la red e-commerce regional (cross-docking, picking y última milla) y topología de red sobredimensionada con rutas redundantes que ponían en riesgo la promesa de entrega y la estabilidad del motor en eventos de alta demanda.',
    solution: 'Modelamiento predictivo de series de tiempo para proyectar capacidades operativas y anticipar saturaciones en nodos críticos de la red. Implementación de modelamiento espacial mediante clustering origen-destino para consolidar y dar de baja el 40% de rutas redundantes en la red logística.',
    impact: 'Reducción de atrasos operativos en 2 puntos porcentuales sobre un flujo mensual de aproximadamente 500.000 órdenes en la red de Región Andina. Prevención de saturación y caídas del motor de promesa en CyberDay (+100M CLP en ventas protegidas) y un 70% de reducción de tiempo operacional en la parametrización de la red.',
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
  'gridbreak-cl': {
    title: 'GridBreak-CL: Fragilidad Eléctrica & Estrés Climático en Santiago',
    org: 'Open Source · github.com/surzua/gridbreak-cl · gridbreak-cl.streamlit.app',
    domain: 'Infraestructura Crítica & Causalidad',
    metric: 'HR = 483.0 en Red Aérea · HR = 1.000 Arbolado (p = 0.9961) · Brecha W50 > 40 km/h',
    problem: 'Tras los temporales de 2024 con más de 2 millones de personas sin suministro eléctrico en Santiago, las distribuidoras atribuyeron el colapso a "fuerza mayor climática insuperable" y a la caída de ramas del ornato municipal.',
    solution: 'Auditoría cuantitativa independiente integrando telemetría de la SEC (>100.000 observaciones horarias), estaciones meteorológicas de DMC/Open-Meteo con interpolación espacial IDW, datos CASEN/INE y catastro de redes de la CNE. Modelamiento con GLM Binomial Logit (curvas de fragilidad R50 y W50 con términos cinéticos cuadráticos) y Análisis de Supervivencia con estimador Kaplan-Meier y modelo de riesgos proporcionales de Cox.',
    impact: 'Demostración empírica de que el arbolado no explica el colapso (HR = 1.000), mientras que el cableado aéreo en postes multiplica por 483 veces el riesgo instantáneo de falla masiva (p < 0.0001). Comunas vulnerables colapsan con vientos estándar (<45 km/h) a las 8 horas de iniciada la lluvia, mientras sectores oriente resisten más de 115 km/h.',
    stack: 'Python, Polars, Scikit-Learn, Statsmodels, Lifelines (Survival Analysis), Streamlit, Plotly, GeoPandas, IDW Interpolation'
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
    impact: 'Fishub-surzación fohub-surzada de fraudes y fugas de capital en retail; optimización drástica de tiempos de cómputo actuarial garantizando trazabilidad y reproducibilidad matemática ante comités de auditoría; y marcos de Data Governance DAMA para aseguradoras y AFPs.',
    stack: 'Python, R Vectorizado, OpenCV, Tesseract OCR, K-Prototypes, Metodología DAMA, SQL'
  }
};

function openProjectModalById(projectId) {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) {
    window.location.href = `/#proyectos`;
    return;
  }
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
}
window.openProjectModalById = openProjectModalById;

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay || !modalClose) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModalById(projectId);
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
      const lang = localStorage.getItem('portfolio_lang') || 'es';
      const toastTexts = {
        es: '¡Email copiado al portapapeles! (seb.urzua91@gmail.com)',
        en: 'Email copied to clipboard! (seb.urzua91@gmail.com)',
        pt: 'E-mail copiado para a área de transferência! (seb.urzua91@gmail.com)'
      };
      showToast(toastTexts[lang] || toastTexts.es);
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

/* ==========================================================================
   Article Reading Progress Bar
   ========================================================================== */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  const article = document.querySelector('.article-body');
  if (!progressBar || !article) return;

  function updateProgress() {
    const rect = article.getBoundingClientRect();
    const articleTop = window.scrollY + rect.top;
    const articleHeight = article.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const start = articleTop - 100;
    const total = articleHeight - windowHeight + 200;

    if (total <= 0) {
      progressBar.style.width = '100%';
      return;
    }

    if (scrollY < start) {
      progressBar.style.width = '0%';
    } else {
      const progress = Math.min(100, Math.max(0, ((scrollY - start) / total) * 100));
      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

/* ==========================================================================
   Article Table Responsive Auto-Wrapper
   ========================================================================== */
function initArticleTables() {
  document.querySelectorAll('.article-body table').forEach(table => {
    if (!table.parentElement.classList.contains('article-table-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'article-table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}

/* ==========================================================================
   KPI Metrics Counter Animation (Count-Up on Scroll)
   ========================================================================== */
function initKpiCounters() {
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
  if (!metricNumbers.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getLohub-surzedSuffix(element) {
    const currentLang = localStorage.getItem('portfolio_lang') || 'es';
    if (currentLang === 'en' && element.hasAttribute('data-suffix-en')) {
      return element.getAttribute('data-suffix-en');
    }
    if (currentLang === 'pt' && element.hasAttribute('data-suffix-pt')) {
      return element.getAttribute('data-suffix-pt');
    }
    return element.getAttribute('data-suffix') || '';
  }

  function formatValue(element, value) {
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = getLohub-surzedSuffix(element);
    const decimals = parseInt(element.getAttribute('data-decimals') || '0', 10);
    return `${prefix}${value.toFixed(decimals)}${suffix}`;
  }

  function animateNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = parseInt(element.getAttribute('data-duration') || '1600', 10);

    if (isNaN(target)) return;

    if (prefersReducedMotion) {
      element.textContent = formatValue(element, target);
      element.classList.add('counted');
      return;
    }

    element.classList.add('counting');
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth cubic ease-out curve for natural deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeProgress;

      element.textContent = formatValue(element, currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = formatValue(element, target);
        element.classList.remove('counting');
        element.classList.add('counted');
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        obs.unobserve(entry.target); // Execute once per session for optimal performance
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -30px 0px'
  });

  metricNumbers.forEach(num => observer.observe(num));

  // Dynamically reformat suffix if language changes after being counted
  window.addEventListener('languageChanged', () => {
    metricNumbers.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      if (!isNaN(target) && el.classList.contains('counted')) {
        el.textContent = formatValue(el, target);
      }
    });
  });
}

/* ==========================================================================
   Interactive Mathematical Graph / Network Constellation Canvas
   ========================================================================== */
function initHeroGraph() {
  const canvas = document.getElementById('hero-graph-canvas');
  const heroSection = document.getElementById('inicio');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let animId = null;
  let isVisible = true;

  const mouse = { x: null, y: null };

  class Node {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      const speed = 0.2 + Math.random() * 0.3;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.isHub = Math.random() < 0.22;
      this.baseRadius = this.isHub ? (2.8 + Math.random() * 1.0) : (1.4 + Math.random() * 0.8);
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.025;

      // Wrap smoothly around canvas
      if (this.x < -15) this.x = width + 15;
      if (this.x > width + 15) this.x = -15;
      if (this.y < -15) this.y = height + 15;
      if (this.y > height + 15) this.y = -15;

      // Cursor magnetic interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 15) {
          const force = (1 - dist / 140) * 0.035;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      // Keep velocity restrained and graceful
      const speed = Math.hypot(this.vx, this.vy);
      const maxSpeed = 0.6;
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
    }

    draw(isLight) {
      const radius = this.baseRadius + (this.isHub ? Math.sin(this.pulse) * 0.5 : 0);
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);

      if (this.isHub) {
        ctx.fillStyle = isLight ? 'rgba(37, 99, 235, 0.85)' : 'rgba(6, 182, 212, 0.95)';
        ctx.shadowBlur = isLight ? 6 : 10;
        ctx.shadowColor = isLight ? 'rgba(37, 99, 235, 0.4)' : 'rgba(6, 182, 212, 0.6)';
      } else {
        ctx.fillStyle = isLight ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.45)';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
  }

  let nodes = [];

  function setCanvasDimensions() {
    const rect = heroSection.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Target node count based on display width
    const targetCount = width < 768 ? 20 : 42;
    if (nodes.length !== targetCount) {
      nodes = Array.from({ length: targetCount }, () => new Node());
    } else {
      nodes.forEach(n => {
        if (n.x > width) n.x = Math.random() * width;
        if (n.y > height) n.y = Math.random() * height;
      });
    }
  }

  setCanvasDimensions();

  function renderFrame() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const maxDist = width < 768 ? 95 : 130;

    // Connect node pairs
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isLight ? 0.18 : 0.28);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = isLight
            ? `rgba(37, 99, 235, ${alpha})`
            : `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 150) {
          const malpha = (1 - mdist / 150) * (isLight ? 0.3 : 0.45);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight
            ? `rgba(37, 99, 235, ${malpha})`
            : `rgba(56, 189, 248, ${malpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Draw all nodes
    nodes.forEach(node => {
      if (!prefersReducedMotion) node.update();
      node.draw(isLight);
    });
  }

  function loop() {
    if (!isVisible) return;
    renderFrame();
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(loop);
    }
  }

  // Handle Resize with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setCanvasDimensions();
      if (prefersReducedMotion) renderFrame();
    }, 150);
  });

  // Track cursor position inside Hero
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Auto-pause when Hero is not on screen (zero CPU waste)
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (!animId && !prefersReducedMotion) {
          animId = requestAnimationFrame(loop);
        } else if (prefersReducedMotion) {
          renderFrame();
        }
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  heroObserver.observe(heroSection);

  // If theme changes, re-render frame immediately
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTimeout(renderFrame, 50);
    });
  }
}

/* ==========================================================================
   Bento Glow: Reactive Holographic Spotlight & Border Glow Engine
   ========================================================================== */
function initBentoGlow() {
  // Disable on touch devices to conserve resources and avoid erratic touch coords
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glowCards = document.querySelectorAll(
    '.pillar-card, .project-card, .article-card, .skill-box, .bento-glow'
  );
  if (!glowCards.length) return;

  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-500px');
      card.style.setProperty('--mouse-y', '-500px');
    });
  });
}

/* ==========================================================================
   Command Palette (⌘K Spotlight) Engine
   ========================================================================== */
function initCommandPalette() {
  const overlay = document.getElementById('cmd-palette');
  const triggerBtn = document.getElementById('cmd-palette-trigger');
  const searchInput = document.getElementById('cmd-search-input');
  const resultsList = document.getElementById('cmd-results-list');
  const closeBtn = document.getElementById('cmd-close-btn');
  const resultsCount = document.getElementById('cmd-results-count');

  if (!overlay || !searchInput || !resultsList) return;

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
                navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

  // Adapt shortcut badges according to operating system
  if (!isMac) {
    document.querySelectorAll('.cmd-shortcut-badge').forEach(el => {
      el.textContent = 'Ctrl K';
    });
    if (triggerBtn) {
      const triggerText = triggerBtn.querySelector('.cmd-trigger-text');
      if (triggerText && triggerText.textContent.includes('⌘K')) {
        triggerText.textContent = triggerText.textContent.replace('⌘K', 'Ctrl K');
      }
    }
  }

  let selectedIndex = 0;
  let filteredCommands = [];

  function getCatalog() {
    const lang = localStorage.getItem('portfolio_lang') || 'es';
    const isArticle = document.body.classList.contains('article-page');
    const pathPrefix = isArticle ? '/' : '';

    return [
      // 1. Navigation
      {
        id: 'nav-inicio',
        category: 'nav',
        title: lang === 'es' ? 'Inicio' : (lang === 'en' ? 'Home' : 'Início'),
        desc: lang === 'es' ? 'Volver a la cabecera y presentación principal' : (lang === 'en' ? 'Return to top header and presentation' : 'Voltar ao cabeçalho e apresentação'),
        icon: '🏠',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'inicio home hero header perfil sebastian urzua presentacion',
        action: () => navigateTo(`${pathPrefix}#inicio`)
      },
      {
        id: 'nav-pilares',
        category: 'nav',
        title: lang === 'es' ? 'Pilares Estratégicos' : (lang === 'en' ? 'Strategic Pillars' : 'Pilares Estratégicos'),
        desc: lang === 'es' ? 'Optimización, Machine Learning y Estrategia de Negocio' : (lang === 'en' ? 'Optimization, Machine Learning, and Business Strategy' : 'Otimização, Machine Learning e Estratégia'),
        icon: '⚡',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'pilares triangulo de valor optimizacion ml negocio roi mba operaciones',
        action: () => navigateTo(`${pathPrefix}#pilares`)
      },
      {
        id: 'nav-proyectos',
        category: 'nav',
        title: lang === 'es' ? 'Casos de Impacto & Proyectos' : (lang === 'en' ? 'Impact Cases & Projects' : 'Casos de Impacto & Projetos'),
        desc: lang === 'es' ? 'Soluciones cuantitativas en Supply Chain, Banca y Retail' : (lang === 'en' ? 'Quantitative solutions in Supply Chain, Banking, and Retail' : 'Soluções quantitativas em Supply Chain, Bancos e Varejo'),
        icon: '💼',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'proyectos casos impacto supply chain retail banca open source portafolio',
        action: () => navigateTo(`${pathPrefix}#proyectos`)
      },
      {
        id: 'nav-articulos',
        category: 'nav',
        title: lang === 'es' ? 'Artículos & Ensayos Cuantitativos' : (lang === 'en' ? 'Articles & Quantitative Essays' : 'Artigos & Ensaios Quantitativos'),
        desc: lang === 'es' ? 'Investigaciones aplicadas, modelos causales y finanzas' : (lang === 'en' ? 'Applied research, causal models, and finance' : 'Pesquisas aplicadas, modelos causais e finanças'),
        icon: '📝',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'articulos blog ensayos publicaciones gridbreak hiporefi supply chain apagon causalidad',
        action: () => navigateTo(`${pathPrefix}#articulos`)
      },
      {
        id: 'nav-skills',
        category: 'nav',
        title: lang === 'es' ? 'Expertise & Stack Tecnológico' : (lang === 'en' ? 'Expertise & Tech Stack' : 'Expertise & Stack Tecnológico'),
        desc: lang === 'es' ? 'Python, Polars, Pyomo, GCP, AWS, Vertex AI, Scikit-Learn' : (lang === 'en' ? 'Python, Polars, Pyomo, GCP, AWS, Vertex AI, Scikit-Learn' : 'Python, Polars, Pyomo, GCP, AWS, Vertex AI, Scikit-Learn'),
        icon: '🛠️',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'skills tecnologias stack python polars pyomo gcp aws bigquery vertex ai mlops git',
        action: () => navigateTo(`${pathPrefix}#skills`)
      },
      {
        id: 'nav-trayectoria',
        category: 'nav',
        title: lang === 'es' ? 'Trayectoria & Formación' : (lang === 'en' ? 'Career & Education' : 'Trajetória & Formação'),
        desc: lang === 'es' ? 'Experiencia profesional y formación en U. de Chile (Nota 7.0)' : (lang === 'en' ? 'Professional experience & education at U. of Chile (7.0 GPA)' : 'Experiência profissional e formação na U. do Chile'),
        icon: '🎓',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'trayectoria experiencia educacion cv carrera smartjob retail-omnichannel itau kpmg cmm fcfm mba beauchef',
        action: () => navigateTo(`${pathPrefix}#trayectoria`)
      },
      {
        id: 'nav-contacto',
        category: 'nav',
        title: lang === 'es' ? 'Contacto Directo' : (lang === 'en' ? 'Direct Contact' : 'Contato Direto'),
        desc: 'seb.urzua91@gmail.com · Santiago, Chile',
        icon: '📬',
        badge: lang === 'es' ? 'Sección' : (lang === 'en' ? 'Section' : 'Seção'),
        keywords: 'contacto email correo santiago chile mensaje reunion linkedin fono',
        action: () => navigateTo(`${pathPrefix}#contacto`)
      },

      // 2. Featured Projects (Modal triggers)
      {
        id: 'proj-retail-omnichannel-genai',
        category: 'projects',
        title: 'Retail Omnicanal GenAI: Corrección de Catálogo (Pipeline Vertex AI)',
        desc: '> 7.7M USD anuales regional · A/B Testing Causal · LLMs Few-Shot',
        icon: '🤖',
        badge: 'Modal',
        keywords: 'retail-omnichannel genai retail catalogo vertex ai ab testing causal sku cubicaje fletes llm prompting smartjob',
        action: () => openProjectModalById('retail-omnichannel-genai')
      },
      {
        id: 'proj-retail-omnichannel-logistics',
        category: 'projects',
        title: 'Retail Omnicanal Logistics: Forecasting & Simplificación de Red',
        desc: '-2 p.p. en atrasos (Región Andina) · +100M CLP ventas protegidas (CyberDay)',
        icon: '🚚',
        badge: 'Modal',
        keywords: 'retail-omnichannel logistics supply chain forecasting series de tiempo red cross docking picking pyomo clustering',
        action: () => openProjectModalById('retail-omnichannel-logistics')
      },
      {
        id: 'proj-itau-recommender',
        category: 'projects',
        title: 'ItaúX: Motor Look-a-Likes e Hiperpersonalización Comercial',
        desc: '+50% tasa de contacto efectivo · Ganador Premio Transforma 2024',
        icon: '🎯',
        badge: 'Modal',
        keywords: 'itau itaux look a likes motor recomendador comercial arboles de decision lightgbm transforms banca',
        action: () => openProjectModalById('itau-recommender')
      },
      {
        id: 'proj-itau-pitch-llm',
        category: 'projects',
        title: 'Pitch Ganador: Argumentario Comercial con LLMs en Salesforce',
        desc: 'Speech Analytics · Discursos hiperpersonalizados en CRM',
        icon: '💬',
        badge: 'Modal',
        keywords: 'pitch ganador itau llms speech analytics salesforce crm llamadas argumentario comercial',
        action: () => openProjectModalById('itau-pitch-llm')
      },
      {
        id: 'proj-gridbreak-cl',
        category: 'projects',
        title: 'GridBreak-CL: Fragilidad Eléctrica ante Estrés Climático',
        desc: 'HR = 483.0 en Red Aérea · Análisis de Supervivencia & GLM Logit',
        icon: '⚡',
        badge: 'Modal',
        keywords: 'gridbreak cl fragilidad electrica supervivencia santiago temporal sec cox kaplan meier arbolado postes open meteo',
        action: () => openProjectModalById('gridbreak-cl')
      },
      {
        id: 'proj-hiporefi-cl',
        category: 'projects',
        title: 'HipoRefi-CL: Optimizador & Simulador Hipotecario en Chile',
        desc: 'Modelamiento en UF · VPN, TIR y Break-Even con Gastos Operacionales',
        icon: '🏦',
        badge: 'Modal',
        keywords: 'hiporefi cl hipotecario refinanciamiento tasas uf vpn tir simulador credito amortizacion prepago',
        action: () => openProjectModalById('hiporefi-cl')
      },
      {
        id: 'proj-credit-policy',
        category: 'projects',
        title: 'Credit Policy Optimizer: Frontera Eficiente de Riesgo',
        desc: 'Búsqueda de Cut-off Óptimo · Curva ROC & Maximización de Utilidad',
        icon: '📈',
        badge: 'Modal',
        keywords: 'credit policy optimizer riesgo financiero scoring roc cutoff utilidad morosidad default',
        action: () => openProjectModalById('credit-policy')
      },
      {
        id: 'proj-itau-digital-risk',
        category: 'projects',
        title: 'Scoring Alternativo con Psicometría & 2° Lugar Itaú Brasil',
        desc: 'Inclusión Financiera · Batalla de Datos Latinoamérica · PoC Cuenta Digital',
        icon: '🏆',
        badge: 'Modal',
        keywords: 'itau riesgo digital psicometria desbancarizados batalla de datos brasil nps inclusion financiera',
        action: () => openProjectModalById('itau-digital-risk')
      },
      {
        id: 'proj-kpmg-fraud-audit',
        category: 'projects',
        title: 'KPMG: Detección de Fraude en Retail & Vectorización Actuarial',
        desc: 'Scoring Multivariable de Fraude · Vectorización de Pasivos en R (IAS 19)',
        icon: '🔍',
        badge: 'Modal',
        keywords: 'kpmg fraude retail auditoria scoring r vectorizado ias 19 telepeaje k-prototypes dama',
        action: () => openProjectModalById('kpmg-fraud-audit')
      },

      // 3. Articles & Quantitative Essays
      {
        id: 'art-gridbreak',
        category: 'articles',
        title: 'El Umbral del Apagón: Fragilidad Eléctrica en Santiago',
        desc: 'Auditoría cuantitativa independiente · Telemetría SEC & Open-Meteo · Modelo de Cox',
        icon: '📄',
        badge: lang === 'es' ? 'Leer' : (lang === 'en' ? 'Read' : 'Ler'),
        keywords: 'articulo ensayo el umbral del apagon fragilidad electrica santiago sec open meteo cox supervivencia',
        action: () => { window.location.href = '/articulos/el-umbral-del-apagon-fragilidad-electrica-santiago/'; }
      },
      {
        id: 'art-hiporefi',
        category: 'articles',
        title: 'HipoRefi-CL: ¿Cuándo conviene refinanciar un crédito hipotecario?',
        desc: 'Modelamiento riguroso en UF · Gastos operacionales · Punto de equilibrio (VPN/TIR)',
        icon: '📄',
        badge: lang === 'es' ? 'Leer' : (lang === 'en' ? 'Read' : 'Ler'),
        keywords: 'articulo ensayo hiporefi cl refinanciar credito hipotecario chile tasas vpn tir',
        action: () => { window.location.href = '/articulos/hiporefi-cl-decision-refinanciamiento/'; }
      },
      {
        id: 'art-supply-chain',
        category: 'articles',
        title: 'Predicción de Demanda & Capacidad Logística en Redes Complejas',
        desc: 'Forecasting de series de tiempo, optimización MIP y balance de capacidades operativas',
        icon: '📄',
        badge: lang === 'es' ? 'Leer' : (lang === 'en' ? 'Read' : 'Ler'),
        keywords: 'articulo ensayo supply chain forecasting prediccion demanda logistica redes complejas mip pyomo',
        action: () => { window.location.href = '/articulos/blog_supply_chain_forecasting/'; }
      },

      // 4. Quick Actions
      {
        id: 'act-copy-email',
        category: 'actions',
        title: lang === 'es' ? 'Copiar Correo Electrónico' : (lang === 'en' ? 'Copy Email Address' : 'Copiar E-mail'),
        desc: 'seb.urzua91@gmail.com',
        icon: '📋',
        badge: lang === 'es' ? 'Acción' : (lang === 'en' ? 'Action' : 'Ação'),
        keywords: 'copiar email correo seb.urzua91@gmail.com contacto portapapeles clipboard copy',
        action: () => copyEmailToClipboard()
      },
      {
        id: 'act-toggle-theme',
        category: 'actions',
        title: lang === 'es' ? 'Alternar Tema Claro / Oscuro' : (lang === 'en' ? 'Toggle Light / Dark Theme' : 'Alternar Modo Claro / Escuro'),
        desc: lang === 'es' ? 'Cambiar el contraste visual de la interfaz' : (lang === 'en' ? 'Switch visual interface contrast' : 'Mudar o contraste visual da interface'),
        icon: '🌓',
        badge: lang === 'es' ? 'Tema' : (lang === 'en' ? 'Theme' : 'Tema'),
        keywords: 'tema dark mode light mode modo oscuro claro contraste toggle color',
        action: () => toggleTheme()
      },
      {
        id: 'act-lang-es',
        category: 'actions',
        title: 'Cambiar Idioma: Español (ES)',
        desc: 'Interfaz, métricas y proyectos en español',
        icon: '🇪🇸',
        badge: 'i18n',
        keywords: 'idioma espanol es spanish linguagem castellano',
        action: () => switchLanguage('es')
      },
      {
        id: 'act-lang-en',
        category: 'actions',
        title: 'Switch Language: English (EN)',
        desc: 'Interface, metrics, and project details in English',
        icon: '🇬🇧',
        badge: 'i18n',
        keywords: 'idioma english en ingles language translate translation',
        action: () => switchLanguage('en')
      },
      {
        id: 'act-lang-pt',
        category: 'actions',
        title: 'Mudar Idioma: Português (PT)',
        desc: 'Interface, métricas e projetos em português',
        icon: '🇧🇷',
        badge: 'i18n',
        keywords: 'idioma portugues pt portuguese linguagem traducao',
        action: () => switchLanguage('pt')
      },
      {
        id: 'act-open-github',
        category: 'actions',
        title: 'GitHub @surzua',
        desc: 'github.com/surzua · Repositorios, algoritmos & notebooks',
        icon: '🐙',
        badge: 'Link',
        keywords: 'github repositorio codigo fuente python open source surzua link',
        action: () => window.open('https://github.com/surzua', '_blank')
      },
      {
        id: 'act-open-linkedin',
        category: 'actions',
        title: 'LinkedIn: Sebastian Urzúa Bórquez',
        desc: 'linkedin.com/in/surzuab/ · Red profesional & trayectoria',
        icon: '💼',
        badge: 'Link',
        keywords: 'linkedin perfil profesional conectar mensaje surzuab red link',
        action: () => window.open('https://www.linkedin.com/in/surzuab/', '_blank')
      }
    ];
  }

  function navigateTo(target) {
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/${target}`;
      }
    } else {
      window.location.href = target;
    }
  }

  function copyEmailToClipboard() {
    const email = 'seb.urzua91@gmail.com';
    const lang = localStorage.getItem('portfolio_lang') || 'es';
    const toastTexts = {
      es: '¡Email copiado al portapapeles! (seb.urzua91@gmail.com)',
      en: 'Email copied to clipboard! (seb.urzua91@gmail.com)',
      pt: 'E-mail copiado para a área de transferência! (seb.urzua91@gmail.com)'
    };

    navigator.clipboard.writeText(email).then(() => {
      showToast(toastTexts[lang] || toastTexts.es);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  }

  function switchLanguage(lang) {
    if (typeof window.setPortfolioLanguage === 'function') {
      window.setPortfolioLanguage(lang);
    }
  }

  function normalize(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function filterCommands(query) {
    const catalog = getCatalog();
    const cleanQuery = normalize(query);

    if (!cleanQuery) {
      return catalog;
    }

    const tokens = cleanQuery.split(/\s+/).filter(Boolean);

    return catalog.filter(cmd => {
      const corpus = normalize(`${cmd.title} ${cmd.desc} ${cmd.keywords} ${cmd.category}`);
      return tokens.every(token => corpus.includes(token));
    });
  }

  function getCategoryLabel(catKey) {
    const lang = localStorage.getItem('portfolio_lang') || 'es';
    const labels = {
      nav: { es: 'Navegación Rápida', en: 'Quick Navigation', pt: 'Navegação Rápida' },
      projects: { es: 'Casos de Impacto & Proyectos', en: 'Impact Cases & Projects', pt: 'Casos de Impacto & Projetos' },
      articles: { es: 'Artículos & Ensayos', en: 'Articles & Essays', pt: 'Artigos & Ensaios' },
      actions: { es: 'Acciones & Configuración', en: 'Actions & Settings', pt: 'Ações & Configurações' }
    };
    return labels[catKey] ? (labels[catKey][lang] || labels[catKey].es) : catKey;
  }

  function renderResults() {
    const query = searchInput.value;
    filteredCommands = filterCommands(query);
    resultsList.innerHTML = '';

    const lang = localStorage.getItem('portfolio_lang') || 'es';

    if (resultsCount) {
      const resultText = lang === 'en' ? `${filteredCommands.length} results` : 
                        (lang === 'pt' ? `${filteredCommands.length} resultados` : `${filteredCommands.length} resultados`);
      resultsCount.textContent = resultText;
    }

    if (filteredCommands.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'cmd-empty-state';
      emptyDiv.innerHTML = `
        <div class="cmd-empty-icon">🔍</div>
        <div class="cmd-empty-title">
          ${lang === 'en' ? 'No matching commands found' : (lang === 'pt' ? 'Nenhum comando encontrado' : 'No se encontraron comandos')}
        </div>
        <div class="cmd-empty-hint">
          ${lang === 'en' ? 'Try searching for "Supply Chain", "Retail Omnicanal", "GenAI", or "Email"' : (lang === 'pt' ? 'Tente buscar por "Supply Chain", "Retail Omnicanal", "GenAI" ou "E-mail"' : 'Intenta con "Supply Chain", "Retail Omnicanal", "GenAI", "GridBreak" o "Email"')}
        </div>
      `;
      resultsList.appendChild(emptyDiv);
      return;
    }

    if (selectedIndex >= filteredCommands.length) {
      selectedIndex = 0;
    }

    const categoriesOrder = ['nav', 'projects', 'articles', 'actions'];
    let globalItemIndex = 0;

    categoriesOrder.forEach(cat => {
      const itemsInCat = filteredCommands.filter(c => c.category === cat);
      if (!itemsInCat.length) return;

      const groupLabel = document.createElement('div');
      groupLabel.className = 'cmd-group-label';
      groupLabel.textContent = getCategoryLabel(cat);
      resultsList.appendChild(groupLabel);

      itemsInCat.forEach(cmd => {
        const itemIndex = globalItemIndex++;
        const itemEl = document.createElement('div');
        itemEl.className = `cmd-item ${itemIndex === selectedIndex ? 'selected' : ''}`;
        itemEl.setAttribute('role', 'option');
        itemEl.setAttribute('aria-selected', itemIndex === selectedIndex ? 'true' : 'false');
        itemEl.setAttribute('data-index', itemIndex);

        itemEl.innerHTML = `
          <div class="cmd-item-left">
            <div class="cmd-item-icon">${cmd.icon}</div>
            <div class="cmd-item-info">
              <div class="cmd-item-title">${cmd.title}</div>
              <div class="cmd-item-desc">${cmd.desc}</div>
            </div>
          </div>
          <div class="cmd-item-badge">${cmd.badge}</div>
        `;

        itemEl.addEventListener('mouseenter', () => {
          setSelectedIndex(itemIndex);
        });

        itemEl.addEventListener('click', () => {
          executeCommand(itemIndex);
        });

        resultsList.appendChild(itemEl);
      });
    });

    scrollSelectedIntoView();
  }

  function setSelectedIndex(idx) {
    if (filteredCommands.length === 0) return;
    selectedIndex = idx;
    const items = resultsList.querySelectorAll('.cmd-item');
    items.forEach((item, i) => {
      const isSelected = i === selectedIndex;
      item.classList.toggle('selected', isSelected);
      item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }

  function scrollSelectedIntoView() {
    const selectedEl = resultsList.querySelector('.cmd-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  function executeCommand(idx) {
    if (filteredCommands[idx]) {
      closePalette();
      setTimeout(() => {
        filteredCommands[idx].action();
      }, 80);
    }
  }

  function openPalette() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    searchInput.value = '';
    selectedIndex = 0;
    renderResults();
    setTimeout(() => {
      searchInput.focus();
    }, 50);
  }

  function closePalette() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.blur();
  }

  // Event Listeners
  if (triggerBtn) {
    triggerBtn.addEventListener('click', openPalette);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closePalette);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePalette();
    }
  });

  searchInput.addEventListener('input', () => {
    selectedIndex = 0;
    renderResults();
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const isPaletteOpen = overlay.classList.contains('active');

    // Toggle shortcut: ⌘K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (isPaletteOpen) {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }

    // Power-user slash shortcut: '/' opens palette if not focusing an input
    if (e.key === '/' && !isPaletteOpen) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag !== 'input' && activeTag !== 'textarea') {
        e.preventDefault();
        openPalette();
        return;
      }
    }

    if (!isPaletteOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        setSelectedIndex((selectedIndex + 1) % filteredCommands.length);
        scrollSelectedIntoView();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        setSelectedIndex((selectedIndex - 1 + filteredCommands.length) % filteredCommands.length);
        scrollSelectedIntoView();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(selectedIndex);
    }
  });

  // Reactive re-render on language switch
  window.addEventListener('languageChanged', () => {
    if (overlay.classList.contains('active')) {
      renderResults();
    }
  });
}
