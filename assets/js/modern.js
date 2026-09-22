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
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
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
  'falabella-logistics': {
    title: 'Optimización de Red Logística & Forecasting de Capacidad',
    org: 'SmartJob – Grupo Falabella (Supply Chain Analytics)',
    domain: 'Supply Chain & Optimización',
    metric: '+100M en ventas protegidas · -2 p.p. en atrasos críticos',
    problem: 'En eventos de alta demanda y picos de tráfico en e-commerce y retail mayorista, los nodos logísticos sufrían saturaciones y cuellos de botella que generaban retrasos acumulativos y ponían en riesgo el cumplimiento comercial.',
    solution: 'Liderazgo analítico y construcción del Business Case para un modelo de forecasting cuantitativo de capacidad en nodos de transferencia, integrando datos transaccionales de órdenes, stock e inventario en tiempo real. Formulación de modelos matemáticos para consolidar y podar el 40% de rutas redundantes en la red de despacho.',
    impact: 'Reducción de los atrasos operativos en 2 puntos porcentuales en nodos críticos de la red, disminución de costos por fletes no eficientes y mitigación de fallas del sistema con un impacto estimado superior a +100M en ventas.',
    stack: 'Python, Polars, Pyomo (Mixed-Integer Programming), Modelos Cuantitativos de Inventario, AWS, CI/CD'
  },
  'itau-recommender': {
    title: 'ItaúX: Motor de Recomendación Hiperpersonalizado',
    org: 'Banco Itaú (Analytics – Banca Minorista)',
    domain: 'Banca & Machine Learning',
    metric: '+50% efectividad comercial · Ganador Premio Transforma 2024',
    problem: 'Los ejecutivos de cuenta comercializaban productos financieros de forma manual o mediante campañas genéricas estáticas, con baja tasa de conversión y fricción para el cliente.',
    solution: 'Diseño integral de la arquitectura del motor de recomendación ItaúX. Se integraron modelos de propensión de compra, análisis de actividad transaccional (RFM) y algoritmos de clustering de comercios para entregar al ejecutivo la oferta óptima en el momento oportuno.',
    impact: 'Incremento de la efectividad comercial de hasta un 50% superior al promedio de campañas estándar. Ganador corporativo absoluto en la categoría "Innovación Data-Driven" en el Premio Transforma 2024.',
    stack: 'Python, Scikit-Learn, LightGBM, SQL Avanzado, Arquitectura de Producción, Rediseño de Pitch Técnico'
  },
  'hiporefi-cl': {
    title: 'HipoRefi-CL: Simulador & Optimizador de Refinanciamiento Hipotecario',
    org: 'Open Source · github.com/surzua/HipoRefi-CL',
    domain: 'Herramientas Cuantitativas & Finanzas',
    metric: 'Simulación Estocástica de Flujos · Análisis de Break-Even',
    problem: 'El mercado hipotecario chileno opera en UF y con costos operacionales (tasación, estudio de títulos, conservador, gastos notariales) que dificultan evaluar si un refinanciamiento a menor tasa efectivamente genera ahorro financiero neto considerando la duración residual del crédito.',
    solution: 'Algoritmo cuantitativo en Python que proyecta tablas de amortización completas (sistema francés/UF), descuenta flujos a valor presente neto (VPN), calcula tasas internas de retorno (TIR) y determina con precisión el plazo de recupero (payback) del costo de refinanciamiento.',
    impact: 'Herramienta reproducible y de código abierto para que usuarios y analistas evalúen el punto óptimo de decisión de prepago y renegociación frente a la curva de tasas de mercado.',
    stack: 'Python, NumPy, Pandas, Modelamiento Financiero Cuantitativo'
  },
  'credit-policy': {
    title: 'Credit Policy Optimizer: Optimización de Frontera Eficiente de Crédito',
    org: 'Open Source · github.com/surzua/credit-policy-optimizer',
    domain: 'Riesgo Financiero & Optimización',
    metric: 'Búsqueda de Cut-off Óptimo · Maximización de Retorno Neto',
    problem: 'La fijación tradicional de cortes de scoring crediticio se basa en reglas estáticas que no equilibran simultáneamente el volumen de colocación deseado, la pérdida esperada (Expected Loss / PD) y el margen de intermediación financiera.',
    solution: 'Framework algorítmico que desacopla la probabilidad de default estimada del corte de decisión, simulando diferentes matrices de costo/beneficio y optimizando el umbral de aprobación para maximizar la función de utilidad del portafolio.',
    impact: 'Generación automatizada de curvas de trade-off entre riesgo y volumen para la toma de decisiones ágil en comités de crédito.',
    stack: 'Python, SciPy Optimize, Matplotlib, Scikit-Learn, Risk Analytics'
  },
  'digital-account-risk': {
    title: 'Scoring de Riesgo Crediticio con Psicometría & Huella Digital',
    org: 'Banco Itaú (Analytics – Banca Minorista)',
    domain: 'Inclusión Financiera & Riesgo Alternativo',
    metric: '2° Lugar Regional Batalla de Datos Itaú Brasil',
    problem: 'Una gran proporción de la población joven y segmentos no bancarizados carecen de historial financiero en bureaus de crédito tradicionales, impidiendo su acceso a cuentas digitales y microcréditos.',
    solution: 'Desarrollo de un modelo de riesgo crediticio alternativo que combinó variables psicométricas (evaluaciones de comportamiento y toma de decisiones) con variables transaccionales digitales incipientes para predecir propensión de pago y morosidad.',
    impact: 'Habilitación de la originación de la Cuenta Digital para segmentos antes no atendidos, manteniendo controlada la tasa de default. El proyecto y equipo obtuvieron el 2° lugar en la Batalla de Datos Regional de Itaú Brasil compitiendo contra equipos de toda Latinoamérica.',
    stack: 'Python, LightGBM, Modelos Estadísticos No Lineales, Variables Psicométricas, SQL'
  },
  'fraud-retail': {
    title: 'Detección de Fraude & Anomalías en Retail Mayorista',
    org: 'KPMG (Data & Analytics – Insights Center)',
    domain: 'Supply Chain & Analítica Forense',
    metric: 'Detección Estocástica en Tiempo Real · Gobernanza DAMA',
    problem: 'Vulnerabilidades operativas en el proceso de pago a proveedores de retail y emisión anómala de notas de crédito en cajas de supermercados mayoristas generaban pérdidas directas no detectadas por auditorías manuales.',
    solution: 'Implementación de algoritmos de Machine Learning no supervisados y de cálculo estocástico para detección de outliers y patrones fraudulentos en flujos de transacciones masivas. Integración de visión computacional y OCR para validar certificados digitales y cédulas.',
    impact: 'Detección temprana de fraudes multimillonarios, cuantificación de riesgo y establecimiento de directrices de gobernanza de datos bajo la metodología DAMA para la industria.',
    stack: 'Machine Learning, Computer Vision (OCR), Cálculo Estocástico, DAMA Governance, SQL'
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
