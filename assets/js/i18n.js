/**
 * SEBASTIAN URZÚA BÓRQUEZ — INTERNATIONALIZATION (i18n) ENGINE
 * Supported languages: Spanish ('es'), English ('en'), Portuguese ('pt')
 * Instantaneous client-side switching with smooth opacity transitions & localStorage persistence.
 */

const i18nTranslations = {
  es: {
    "nav.inicio": "Inicio",
    "nav.impacto": "Métricas",
    "nav.pilares": "Pilares",
    "nav.proyectos": "Casos de Impacto",
    "nav.articulos": "Artículos",
    "nav.skills": "Expertise",
    "nav.trayectoria": "Trayectoria",
    "nav.contacto": "Contacto",
    "nav.contact_btn": "Contactar",

    "hero.status": "<span class=\"status-dot\"></span> Senior Data Scientist &amp; Consultor Cuantitativo · Disponible para proyectos",
    "hero.subtitle": "Senior Data Scientist & <span class=\"tag-highlight\">Ingeniero Civil Matemático</span> (MBA)",
    "hero.desc": "Convierto problemas operativos y comerciales de alta complejidad en soluciones analíticas de alto impacto. Especialista en la formulación y despliegue de soluciones cuantitativas de extremo a extremo: desde <strong>optimización matemática rigurosa</strong> y <strong>experimentación causal (A/B Testing)</strong>, hasta <strong>pipelines productivos con LLMs (GenAI)</strong> y <strong>articulación estratégica de negocio (MBA)</strong> para Supply Chain, Retail y Banca.",
    "hero.cred1": "<span>🎓</span> <b>Distinción Máxima (7.0 / 7.0)</b> Ing. Civil Matemática · U. de Chile",
    "hero.cred2": "<span>📊</span> <b>Magíster en Cs. de la Ingeniería (6.6 / 7.0)</b> CMM U. de Chile",
    "hero.cred3": "<span>💼</span> <b>MBA (6.3 / 7.0)</b> FCFM / DCS U. de Chile",
    "hero.cred4": "<span>🏆</span> <b>Premio Transforma 2024</b> Innovación Data-Driven",
    "hero.btn_projects": "Explorar Casos de Impacto <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline></svg>",
    "hero.btn_github": "GitHub @surzua",

    "metrics.m1_title": "Impacto Validado (GenAI)",
    "metrics.m1_desc": "Pipeline de inferencia con LLMs y A/B Testing multivariable para Grupo Retail Omnicanal (>3.8M USD en Chile).",
    "metrics.m2_title": "Efectividad Comercial",
    "metrics.m2_desc": "Motor Look-a-Likes e hiperpersonalización ItaúX (Ganador Premio Transforma 2024).",
    "metrics.m3_title": "Ventas Protegidas (CyberDay)",
    "metrics.m3_desc": "Clustering espacial y baja del 40% de rutas redundantes en red de promesa logística.",
    "metrics.m4_title": "Atrasos Operativos en Nodos",
    "metrics.m4_desc": "Forecasting predictivo de capacidad sobre ~500.000 órdenes/mes en red Región Andina.",
    "metrics.m5_title": "Distinción Máxima (Beauchef)",
    "metrics.m5_desc": "Ingeniería Civil Matemática, Universidad de Chile (Hub Surficación máxima histórica).",
    "metrics.m6_title": "2° Lugar Regional",
    "metrics.m6_desc": "Batalla de Datos Itaú Brasil vs. equipos analíticos avanzados de toda Latinoamérica.",

    "pillars.tag": "Capacidades Estratégicas",
    "pillars.title": "El Triángulo de Valor",
    "pillars.subtitle": "La combinación sinérgica entre matemática rigurosa, despliegue computacional moderno y retorno económico medible.",
    "pillars.p1_title": "Optimización Matemática & Operaciones",
    "pillars.p1_desc": "Investigación operativa aplicada a la toma de decisiones complejas: programación lineal, entera y mixta (MIP), ruteo de vehículos (VRP), simulación numérica y gestión cuantitativa de inventarios.",
    "pillars.p2_title": "Machine Learning & Analytics en Producción",
    "pillars.p2_desc": "Diseño, hub-surbración y puesta en marcha de sistemas analíticos: motores de recomendación hiperpersonalizados, scoring de riesgo crediticio alternativo, propensión de compra y detección de anomalías en tiempo real.",
    "pillars.p3_title": "Estrategia Ejecutiva & Retorno de Negocio (MBA)",
    "pillars.p3_desc": "Traducción fluida entre algoritmos complejos y el P&L de la compañía. Formulación de Business Cases, evaluación de riesgo financiero, gobernanza de datos bajo metodología DAMA e interlocución con C-Level.",

    "projects.tag": "Portafolio Seleccionado",
    "projects.title": "Casos de Impacto & Proyectos",
    "projects.subtitle": "Iniciativas donde la formulación matemática y el modelamiento predictivo generaron ventajas competitivas comprobables.",
    "filter.all": "Todos los Casos",
    "filter.supply_chain": "Supply Chain & Redes",
    "filter.genai": "GenAI & LLMs",
    "filter.finance": "Banca & Finanzas",
    "filter.opensource": "Open Source",

    "articles.tag": "Pensamiento Técnico",
    "articles.title": "Artículos & Ensayos Cuantitativos",
    "articles.subtitle": "Análisis profundos sobre optimización, sistemas estocásticos y ciencia de datos aplicada a la industria.",

    "skills.tag": "Capacidades Técnicas",
    "skills.title": "Stack Tecnológico & Expertise",
    "skills.subtitle": "Herramientas de vanguardia para modelamiento computacional, desarrollo productivo y despliegue en la nube.",

    "trajectory.tag": "Experiencia Profesional",
    "trajectory.title": "Trayectoria & Educación de Excelencia",
    "trajectory.subtitle": "Un recorrido equilibrado entre rigor académico de primer nivel y liderazgo analítico en las mayores corporaciones de la región.",
    "trajectory.tab_exp": "Experiencia Profesional",
    "trajectory.tab_edu": "Formación Académica",

    "contact.title": "Iniciemos una Conversación",
    "contact.subtitle": "Abierto a intercambiar perspectivas sobre optimización matemática, proyectos estratégicos de Data Science y oportunidades de alto impacto.",
    "contact.location": "📍 Santiago, Chile · Disponible para proyectos estratégicos de analítica avanzada",
    "contact.toast": "¡Email copiado al portapapeles!",

    "footer.rights": "© Sebastian Urzúa Bórquez · Portafolio Profesional",
    "footer.top": "Volver arriba ↑",

    "modal.metrics": "Métricas de impacto",
    "modal.challenge": "El Desafío / Problema de Negocio",
    "modal.solution": "La Solución Matemática & Algorítmica",
    "modal.impact": "Impacto Cuantitativo Generado",
    "modal.stack": "Stack & Tecnologías Utilizadas",

    "cmd.trigger_btn": "Buscar o ⌘K",
    "cmd.placeholder": "Escribe un comando o busca...",
    "cmd.key_nav": "Navegar",
    "cmd.key_select": "Seleccionar",
    "cmd.key_close": "Cerrar",
    "cmd.cat_nav": "Navegación",
    "cmd.cat_projects": "Casos de Impacto & Proyectos",
    "cmd.cat_articles": "Artículos & Ensayos",
    "cmd.cat_actions": "Acciones Rápidas",
    "cmd.no_results": "No se encontraron comandos coincidentes"
  },

  en: {
    "nav.inicio": "Home",
    "nav.impacto": "Metrics",
    "nav.pilares": "Pillars",
    "nav.proyectos": "Impact Cases",
    "nav.articulos": "Articles",
    "nav.skills": "Expertise",
    "nav.trayectoria": "Trajectory",
    "nav.contacto": "Contact",
    "nav.contact_btn": "Get in Touch",

    "hero.status": "<span class=\"status-dot\"></span> Senior Data Scientist &amp; Quantitative Consultant · Available for projects",
    "hero.subtitle": "Senior Data Scientist & <span class=\"tag-highlight\">Mathematical Civil Engineer</span> (MBA)",
    "hero.desc": "Translating high-complexity operational and commercial challenges into high-impact analytical solutions. Specialist in end-to-end quantitative formulations and deployments: from <strong>rigorous mathematical optimization</strong> and <strong>causal experimentation (A/B Testing)</strong>, to <strong>production LLM pipelines (GenAI)</strong> and <strong>strategic business acumen (MBA)</strong> across Supply Chain, Retail, and Banking.",
    "hero.cred1": "<span>🎓</span> <b>Highest Honors (7.0 / 7.0)</b> Mathematical Civil Eng. · U. of Chile",
    "hero.cred2": "<span>📊</span> <b>M.Sc. in Engineering Sciences (6.6 / 7.0)</b> CMM U. of Chile",
    "hero.cred3": "<span>💼</span> <b>MBA (6.3 / 7.0)</b> FCFM / DCS U. of Chile",
    "hero.cred4": "<span>🏆</span> <b>Transforma 2024 Award</b> Data-Driven Innovation",
    "hero.btn_projects": "Explore Impact Cases <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline></svg>",
    "hero.btn_github": "GitHub @surzua",

    "metrics.m1_title": "Validated Impact (GenAI)",
    "metrics.m1_desc": "Production LLM inference pipeline & multivariable A/B Testing for Retail Omnicanal Group (>3.8M USD in Chile).",
    "metrics.m2_title": "Commercial Effectiveness",
    "metrics.m2_desc": "Look-a-Likes engine & ItaúX hyperpersonalization (Transforma 2024 Innovation Award Winner).",
    "metrics.m3_title": "Protected Sales (CyberDay)",
    "metrics.m3_desc": "Spatial clustering & 40% reduction in redundant routes across logistics promise network.",
    "metrics.m4_title": "Hub Operational Delays",
    "metrics.m4_desc": "Predictive capacity forecasting over ~500,000 orders/month in Región Andina logistics network.",
    "metrics.m5_title": "Highest Distinction (Beauchef)",
    "metrics.m5_desc": "Mathematical Civil Engineering, University of Chile (All-time historical maximum score).",
    "metrics.m6_title": "2nd Place Regional",
    "metrics.m6_desc": "Itaú Brazil Data Battle vs. top advanced analytics teams across Latin America.",

    "pillars.tag": "Strategic Superpowers",
    "pillars.title": "The Value Triangle",
    "pillars.subtitle": "The synergistic bridge between rigorous mathematics, modern computing deployments, and measurable economic ROI.",
    "pillars.p1_title": "Mathematical Optimization & Operations",
    "pillars.p1_desc": "Operations research applied to high-stakes decision making: linear, integer, and mixed-integer programming (MIP), vehicle routing (VRP), numerical simulation, and quantitative inventory control.",
    "pillars.p2_title": "Machine Learning & Production Analytics",
    "pillars.p2_desc": "Design, hub-surbration, and rollout of production analytical engines: hyperpersonalized recommendation systems, alternative credit scoring, purchase propensity, and real-time anomaly detection.",
    "pillars.p3_title": "Executive Strategy & Business ROI (MBA)",
    "pillars.p3_desc": "Seamless translation between complex algorithms and corporate P&L. Business Case formulation, financial risk assessment, DAMA data governance, and high-stakes C-Level stakeholder alignment.",

    "projects.tag": "Selected Portfolio",
    "projects.title": "Impact Cases & Projects",
    "projects.subtitle": "High-leverage initiatives where mathematical formulation and predictive modeling delivered proven competitive advantages.",
    "filter.all": "All Cases",
    "filter.supply_chain": "Supply Chain & Networks",
    "filter.genai": "GenAI & LLMs",
    "filter.finance": "Banking & Finance",
    "filter.opensource": "Open Source",

    "articles.tag": "Technical Thought Leadership",
    "articles.title": "Articles & Quantitative Essays",
    "articles.subtitle": "In-depth explorations on optimization, stochastic systems, and production data science applied to industry.",

    "skills.tag": "Technical Capabilities",
    "skills.title": "Technology Stack & Expertise",
    "skills.subtitle": "Cutting-edge tools for computational modeling, production software, and cloud orchestration.",

    "trajectory.tag": "Professional Background",
    "trajectory.title": "Experience & Academic Excellence",
    "trajectory.subtitle": "A balanced track record blending top-tier academic rigor with analytical leadership across the region's largest corporations.",
    "trajectory.tab_exp": "Professional Experience",
    "trajectory.tab_edu": "Academic Education",

    "contact.title": "Let's Start a Conversation",
    "contact.subtitle": "Open to exchanging perspectives on mathematical optimization, strategic Data Science initiatives, and high-impact challenges.",
    "contact.location": "📍 Santiago, Chile · Available for strategic advanced analytics initiatives",
    "contact.toast": "Email copied to clipboard!",

    "footer.rights": "© Sebastian Urzúa Bórquez · Professional Portfolio",
    "footer.top": "Back to top ↑",

    "modal.metrics": "Impact metrics",
    "modal.challenge": "The Challenge / Business Problem",
    "modal.solution": "Mathematical & Algorithmic Solution",
    "modal.impact": "Quantitative Impact Delivered",
    "modal.stack": "Stack & Technologies Deployed",

    "cmd.trigger_btn": "Search or ⌘K",
    "cmd.placeholder": "Type a command or search...",
    "cmd.key_nav": "Navigate",
    "cmd.key_select": "Select",
    "cmd.key_close": "Close",
    "cmd.cat_nav": "Navigation",
    "cmd.cat_projects": "Impact Cases & Projects",
    "cmd.cat_articles": "Articles & Essays",
    "cmd.cat_actions": "Quick Actions",
    "cmd.no_results": "No matching commands found"
  },

  pt: {
    "nav.inicio": "Início",
    "nav.impacto": "Métricas",
    "nav.pilares": "Pilares",
    "nav.proyectos": "Casos de Impacto",
    "nav.articulos": "Artigos",
    "nav.skills": "Expertise",
    "nav.trayectoria": "Trajetória",
    "nav.contacto": "Contato",
    "nav.contact_btn": "Fale Comigo",

    "hero.status": "<span class=\"status-dot\"></span> Senior Data Scientist &amp; Consultor Quantitativo · Disponível para projetos",
    "hero.subtitle": "Senior Data Scientist & <span class=\"tag-highlight\">Engenheiro Civil Matemático</span> (MBA)",
    "hero.desc": "Transformo problemas operacionais e comerciais de alta complexidade em soluções analíticas de alto impacto. Especialista na formulação e implementação de soluções quantitativas de ponta a ponta: de <strong>otimização matemática rigorosa</strong> e <strong>experimentação causal (A/B Testing)</strong> até <strong>pipelines produtivos com LLMs (GenAI)</strong> e <strong>visão estratégica de negócios (MBA)</strong> para Supply Chain, Varejo e Bancos.",
    "hero.cred1": "<span>🎓</span> <b>Distinção Máxima (7.0 / 7.0)</b> Eng. Civil Matemática · U. do Chile",
    "hero.cred2": "<span>📊</span> <b>Mestrado em Ciências da Eng. (6.6 / 7.0)</b> CMM U. do Chile",
    "hero.cred3": "<span>💼</span> <b>MBA (6.3 / 7.0)</b> FCFM / DCS U. do Chile",
    "hero.cred4": "<span>🏆</span> <b>Prêmio Transforma 2024</b> Inovação Data-Driven",
    "hero.btn_projects": "Explorar Casos de Impacto <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline></svg>",
    "hero.btn_github": "GitHub @surzua",

    "metrics.m1_title": "Impacto Validado (GenAI)",
    "metrics.m1_desc": "Pipeline de inferência com LLMs e A/B Testing multivariável para Grupo Retail Omnicanal (>3.8M USD no Chile).",
    "metrics.m2_title": "Eficácia Comercial",
    "metrics.m2_desc": "Motor Look-a-Likes e hiperpersonalização ItaúX (Vencedor Prêmio Transforma 2024).",
    "metrics.m3_title": "Vendas Protegidas (CyberDay)",
    "metrics.m3_desc": "Clustering espacial e redução de 40% das rotas redundantes na rede de promessa logística.",
    "metrics.m4_title": "Atrasos Operacionais em Nodos",
    "metrics.m4_desc": "Previsão preditiva de capacidade sobre ~500.000 pedidos/mês na rede América Latina.",
    "metrics.m5_title": "Distinção Máxima (Beauchef)",
    "metrics.m5_desc": "Engenharia Civil Matemática, Universidade do Chile (Nota máxima histórica).",
    "metrics.m6_title": "2° Lugar Regional",
    "metrics.m6_desc": "Batalha de Dados Itaú Brasil vs. equipes analíticas avançadas da América Latina.",

    "pillars.tag": "Capacidades Estratégicas",
    "pillars.title": "O Triângulo de Valor",
    "pillars.subtitle": "A combinação sinérgica entre matemática rigorosa, implementação computacional moderna e retorno econômico mensurável.",
    "pillars.p1_title": "Otimização Matemática & Operações",
    "pillars.p1_desc": "Pesquisa operacional aplicada a decisões complexas: programação linear, inteira e mista (MIP), roteamento de veículos (VRP), simulação numérica e gestão quantitativa de estoques.",
    "pillars.p2_title": "Machine Learning & Analytics em Produção",
    "pillars.p2_desc": "Desenho, hub-surbração e implementação de sistemas analíticos: motores de recomendação hiperpersonalizados, scoring de risco de crédito alternativo, propensão de compra e detecção de anomalias em tempo real.",
    "pillars.p3_title": "Estratégia Executiva & Retorno de Negócios (MBA)",
    "pillars.p3_desc": "Tradução fluida entre algoritmos complexos e o DRE (P&L) da empresa. Formulação de Business Cases, avaliação de risco financeiro, governança de dados (DAMA) e interlocução com C-Level.",

    "projects.tag": "Portfólio Selecionado",
    "projects.title": "Casos de Impacto & Projetos",
    "projects.subtitle": "Iniciativas onde a formulação matemática e a modelagem preditiva geraram vantagens competitivas comprovadas.",
    "filter.all": "Todos os Casos",
    "filter.supply_chain": "Supply Chain & Redes",
    "filter.genai": "GenAI & LLMs",
    "filter.finance": "Bancos & Finanças",
    "filter.opensource": "Open Source",

    "articles.tag": "Pensamento Técnico",
    "articles.title": "Artigos & Ensaios Quantitativos",
    "articles.subtitle": "Análises aprofundadas sobre otimização, sistemas estocásticos e ciência de dados aplicada à indústria.",

    "skills.tag": "Capacidades Técnicas",
    "skills.title": "Stack Tecnológico & Expertise",
    "skills.subtitle": "Ferramentas de ponta para modelagem computacional, engenharia produtiva e nuvem.",

    "trajectory.tag": "Experiência Profissional",
    "trajectory.title": "Trajetória & Formação de Excelência",
    "trajectory.subtitle": "Uma trajetória equilibrada entre rigor acadêmico de ponta e liderança analítica nas maiores corporações da região.",
    "trajectory.tab_exp": "Experiência Profissional",
    "trajectory.tab_edu": "Formação Acadêmica",

    "contact.title": "Vamos Iniciar uma Conversa",
    "contact.subtitle": "Aberto a debater perspectivas sobre otimização matemática, projetos estratégicos de Data Science e oportunidades de alto impacto.",
    "contact.location": "📍 Santiago, Chile · Disponível para projetos estratégicos de analítica avançada",
    "contact.toast": "E-mail copiado para a área de transferência!",

    "footer.rights": "© Sebastian Urzúa Bórquez · Portfólio Profissional",
    "footer.top": "Voltar ao topo ↑",

    "modal.metrics": "Métricas de impacto",
    "modal.challenge": "O Desafio / Problema de Negócio",
    "modal.solution": "A Solução Matemática & Algorítmica",
    "modal.impact": "Impacto Quantitativo Gerado",
    "modal.stack": "Stack & Tecnologias Utilizadas",

    "cmd.trigger_btn": "Buscar ou ⌘K",
    "cmd.placeholder": "Digite um comando ou busque...",
    "cmd.key_nav": "Navegar",
    "cmd.key_select": "Selecionar",
    "cmd.key_close": "Fechar",
    "cmd.cat_nav": "Navegação",
    "cmd.cat_projects": "Casos de Impacto & Projetos",
    "cmd.cat_articles": "Artigos & Ensaios",
    "cmd.cat_actions": "Ações Rápidas",
    "cmd.no_results": "Nenhum comando correspondente encontrado"
  }
};

/**
 * i18n Controller
 */
function setLanguage(lang) {
  if (!i18nTranslations[lang]) {
    lang = 'es';
  }

  // Persist preference
  localStorage.setItem('portfolio_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update button active states in desktop and mobile pills
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Apply translations to text nodes
  const translatableElements = document.querySelectorAll('[data-i18n]');
  translatableElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nTranslations[lang] && i18nTranslations[lang][key] !== undefined) {
      el.style.opacity = '0';
      setTimeout(() => {
        el.innerHTML = i18nTranslations[lang][key];
        el.style.opacity = '1';
      }, 120);
    }
  });

  // Apply translations to placeholders
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18nTranslations[lang] && i18nTranslations[lang][key] !== undefined) {
      el.setAttribute('placeholder', i18nTranslations[lang][key]);
    }
  });

  // Dispatch custom event for extensible reactive components
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Global exposure
window.setPortfolioLanguage = setLanguage;
window.i18nTranslations = i18nTranslations;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('portfolio_lang') || 'es';

  // Attach click listeners to all language selector buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Initial apply
  setLanguage(savedLang);
});
