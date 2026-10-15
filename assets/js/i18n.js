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

"trajectory.exp1_role": "Data Scientist Senior (Consultor)",
    "trajectory.exp1_company": "SmartJob · Consultoría para Grupo Retail Omnicanal (Retail Tech – Advanced Analytics)",
    "trajectory.exp1_period": "Ene 2026 – Sep 2026 · Alcance Regional",
    "trajectory.exp1_desc": "<ul><li><strong>Liderazgo Analítico & Alcance Regional:</strong> Consultor senior especializado en analítica avanzada para Retail Omnicanal Tecnológico Corporativo (Retail Tech), liderando el dominio de Supply Chain en el portafolio corporativo <em>Motor de Promesa Logística</em> con cobertura en Chile, Perú y Región Andina (picking 1P/3P, centros de distribución, cross-docking y despacho), colaborando con Product Owners de Red Logística y Catálogo.</li><li><strong>Corrección Automatizada de Catálogo (Pipeline GenAI & A/B Testing):</strong> Pipeline productivo de 5 fases en GCP / Vertex AI para resolver la falta de ground truth en dimensiones y peso: normalización textual, clustering semántico con LLMs, rangos sintéticos e imputación estadística. Validación causal con A/B Testing multivariable: <strong>impacto validado en > 7.7M USD anuales regional (> 3.8M USD en Chile)</strong>.</li><li><strong>Forecasting de Capacidades y Mitigación de Cuellos de Botella:</strong> Modelamiento predictivo de series de tiempo para proyectar capacidades y anticipar saturaciones, logrando una <strong>reducción de atrasos operativos en 2 puntos porcentuales</strong> sobre ~500.000 órdenes/mes en Región Andina.</li><li><strong>Simplificación Topológica de la Red Logística:</strong> Clustering espacial origen-destino para consolidar y dar de baja el <strong>40% de rutas redundantes</strong>. Prevención de caídas en CyberDay, <strong>protegiendo +100M CLP en ventas</strong> y reduciendo en 70% el tiempo de parametrización.</li><li><strong>Stack Tecnológico:</strong> GCP (BigQuery, Vertex AI), Python (Pandas, Polars, Scikit-Learn), LLMs / Prompt Engineering, Git, CI/CD.</li></ul>",

    "trajectory.exp2_role": "Data Scientist Senior",
    "trajectory.exp2_company": "Banco Itaú (Analytics Banca Minorista – Laboratorio ItaúX)",
    "trajectory.exp2_period": "Ene 2022 – Sep 2025 · Santiago, Chile",
    "trajectory.exp2_desc": "<ul><li><strong>Motor Look-a-Likes e Hiperpersonalización (Ganador Premio Transforma 2024):</strong> Algoritmo multiclase en árboles de decisión balanceados por el margen financiero histórico para definir canastas óptimas de productos bancarios. <strong>Incremento del +50% en tasa de contacto efectivo</strong> y galardonado con el <strong>Premio corporativo Transforma 2024 en Innovación Data-Driven</strong>.</li><li><strong>Generador de Argumentario Comercial 'Pitch Ganador' (LLMs en CRM):</strong> Sistema discursivo con LLMs que sintetiza variables sociodemográficas y transcripciones de llamadas para generar pitches comerciales hiperpersonalizados en Salesforce CRM.</li><li><strong>Modelos Core de Clientes y Automatización MLOps:</strong> Modelos de propensión transaccional productivizados sobre AWS MLOps y segmentaciones analíticas recurrentes en BigQuery y Salesforce.</li><li><strong>Competencia Regional (Batalla de Datos Itaú Brasil):</strong> <strong>2do lugar regional</strong> en Latinoamérica con modelo predictivo proxy de NPS para anticipar insatisfacciones.</li><li><strong>Scoring Alternativo (PoC Cuenta Digital):</strong> Modelos de riesgo crediticio con encuestas psicométricas para segmentos desbancarizados.</li><li><strong>Stack Tecnológico:</strong> AWS (MLOps framework), Google BigQuery, SQL avanzado, Python (Scikit-Learn, Pandas), LLMs / Prompt Engineering, Salesforce CRM.</li></ul>",

    "trajectory.exp3_role": "Data Scientist Engineer",
    "trajectory.exp3_company": "Moneda Asset Management (Procesos y Sistemas, TI)",
    "trajectory.exp3_period": "May 2021 – Ene 2022 · Santiago, Chile",
    "trajectory.exp3_desc": "<ul><li><strong>Monitoreo Automatizado de Divisas (FX):</strong> Pipeline diario en Python para la extracción, conciliación y seguimiento de tipos de cambio internacionales y locales, con detección automática de desfases operativos entre mesas de dinero y tableros en Power BI.</li><li><strong>Data Governance & Optimización de Consultas:</strong> Estandarización de flujos y gobierno de datos en SQL Server corporativo, mejorando significativamente tiempos de ejecución de reportes financieros críticos.</li><li><strong>Stack Tecnológico:</strong> Python, SQL Server, Power BI (DAX, Power Query), Git.</li></ul>",

    "trajectory.exp4_role": "Data Scientist",
    "trajectory.exp4_company": "KPMG (Data & Analytics – Insights Center)",
    "trajectory.exp4_period": "Oct 2017 – May 2021 · Santiago, Chile",
    "trajectory.exp4_desc": "<ul><li><strong>Detección de Fraude y Auditoría Cuantitativa en Retail / Mayoristas:</strong> Co-diseño de más de 20 reglas de negocio y motor de scoring multivariable para priorizar transacciones sospechosas en cientos de miles de registros de notas de crédito y pagos.</li><li><strong>Perfilamiento de Morosidad (Autopistas):</strong> Segmentación de usuarios con algoritmos K-Prototypes para conducta de pago de telepeaje (TAG) y riesgo de incobrabilidad.</li><li><strong>Modernización y Vectorización de Modelos Actuariales:</strong> Reingeniería del cálculo de pasivos laborales (PIAS / IAS 19), migrando hojas de cálculo a scripts vectorizados en R con drástica optimización de cómputo y trazabilidad matemática.</li><li><strong>Visión Computacional y OCR:</strong> Scripts de extracción automatizada con OpenCV y Tesseract OCR para formularios legales y tributarios.</li><li><strong>Data Governance:</strong> Asesoría e implementación de marcos de gobernanza bajo estándar DAMA para aseguradoras y AFPs.</li><li><strong>Stack Tecnológico:</strong> Python, R, OpenCV, Tesseract OCR, SQL, Power BI, Metodología DAMA.</li></ul>",

    "trajectory.exp5_role": "Profesor Auxiliar",
    "trajectory.exp5_company": "Universidad de Chile (Facultad de Ciencias Físicas y Matemáticas)",
    "trajectory.exp5_period": "Mar 2011 – Jul 2017 · Santiago, Chile",
    "trajectory.exp5_desc": "Docencia y cátedras de ejercicios para cursos formativos y avanzados de ingeniería: Cálculo Diferencial e Integral, Cálculo en Varias Variables, Álgebra Lineal y Cálculo Avanzado. Preparación de material pedagógico, diseño y corrección de evaluaciones para grupos de más de 80 alumnos por semestre.",

    "trajectory.edu1_role": "Master of Business Administration (MBA)",
    "trajectory.edu1_company": "Universidad de Chile – FCFM / DCS",
    "trajectory.edu1_period": "Graduación: Jul 2025",
    "trajectory.edu1_grade": "Nota de Graduación: 6.3 / 7.0",
    "trajectory.edu1_desc": "Formación directiva en estrategia corporativa, finanzas, diseño de modelos de negocio y liderazgo de equipos de alto rendimiento. Integración de visión de negocio con capacidades técnicas avanzadas.",

    "trajectory.edu2_role": "Magíster en Ciencias de la Ingeniería, mención Matemática Aplicada",
    "trajectory.edu2_company": "Universidad de Chile – Centro de Modelamiento Matemático (CMM)",
    "trajectory.edu2_period": "Graduación: Jun 2017",
    "trajectory.edu2_grade": "Nota de Graduación: 6.6 / 7.0",
    "trajectory.edu2_desc": "Tesis de postgrado: <em>'Escurrimiento de Fluidos Newtonianos y no Newtonianos en medios porosos'</em> (Profesor Guía: Dr. Raúl Gormaz). Modelamiento de ecuaciones diferenciales en derivadas parciales y simulación numérica avanzada.",

    "trajectory.edu3_role": "Ingeniería Civil Matemática",
    "trajectory.edu3_company": "Universidad de Chile (FCFM - Beauchef)",
    "trajectory.edu3_period": "Graduación: Jun 2017",
    "trajectory.edu3_grade": "Nota de Graduación: 7.0 / 7.0 (Distinción Máxima)",
    "trajectory.edu3_desc": "<strong>Hub Surficación máxima histórica en examen de titulación y defensa de grado.</strong> Rigor analítico en análisis matemático, teoría de probabilidades, optimización continua y discreta, y análisis numérico.",

    "article.back": "Volver a Artículos y Portafolio",
    "article.author_role": "Senior Data Scientist & Ing. Civil Matemático (MBA)",
    "article.read_time": "15 min de lectura",
    "article.about_author": "Sobre el Autor: Sebastian Urzúa Bórquez",
    "article.author_bio": "Ingeniero Civil Matemático (U. de Chile, Nota 7.0 / Distinción Máxima), MBA y Senior Data Scientist. Especialista en optimización matemática rigurosa, modelos predictivos avanzados, pipelines con LLMs y evaluación de impacto de negocio (ROI) en Supply Chain, Banca y Retail.",
    "article.lang_notice": "🌐 <i>Este ensayo técnico fue redactado originalmente en español con notación matemática formal.</i>",

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

"trajectory.exp1_role": "Senior Data Scientist (Consultant)",
    "trajectory.exp1_company": "SmartJob · Consulting for Retail Omnicanal Group (Retail Tech – Advanced Analytics)",
    "trajectory.exp1_period": "Jan 2026 – Sep 2026 · Regional Scope",
    "trajectory.exp1_desc": "<ul><li><strong>Analytical Leadership & Regional Scope:</strong> Senior advanced analytics consultant for Retail Omnicanal Technological Corporate (Retail Tech), leading the Supply Chain domain within the corporate <em>Motor de Promesa Logística</em> across Chile, Peru, and Región Andina (1P/3P picking, distribution centers, cross-docking, dispatch, and click & collect), partnering with Product Owners of Logistics Network and Catalog.</li><li><strong>Automated Catalog Correction (GenAI & A/B Testing Pipeline):</strong> Designed a 5-phase production pipeline in GCP / Vertex AI to resolve missing ground truth in physical dimensions and weight: textual normalization, few-shot LLM semantic clustering, synthetic feasible ranges, and statistical median imputation. Experimentally validated with stratified multivariable A/B Testing: <strong>> $7.7M USD annual validated impact regionally (> $3.8M USD in Retail Omnicanal Chile)</strong>.</li><li><strong>Capacity Forecasting & Bottleneck Mitigation:</strong> Time series forecasting to project operational capacities and anticipate node bottlenecks, delivering a <strong>2 p.p. reduction in operational delays</strong> over ~500,000 monthly orders in Región Andina.</li><li><strong>Logistics Network Topological Simplification:</strong> Spatial origin-destination clustering to decommission <strong>40% of redundant routes</strong>. Prevented engine crashes during CyberDay, <strong>protecting +$100M CLP in sales</strong> and cutting network configuration operational time by 70%.</li><li><strong>Tech Stack:</strong> GCP (BigQuery, Vertex AI), Python (Pandas, Polars, Scikit-Learn), LLMs / Prompt Engineering, Git, CI/CD.</li></ul>",

    "trajectory.exp2_role": "Senior Data Scientist",
    "trajectory.exp2_company": "Banco Itaú (Retail Banking Analytics – ItaúX Lab)",
    "trajectory.exp2_period": "Jan 2022 – Sep 2025 · Santiago, Chile",
    "trajectory.exp2_desc": "<ul><li><strong>Look-a-Likes Engine & Commercial Hyperpersonalization (Transforma 2024 Winner):</strong> Built inside the ItaúX innovation lab to replace mass campaigns. Decision tree multi-class algorithm balanced by historic financial margin defining optimal product bundles (loans, mortgages, credit cards, mutual funds, insurance). Delivered a <strong>+50% increase in effective contact rate</strong> and awarded the <strong>Transforma 2024 Corporate Innovation Award</strong>.</li><li><strong>Commercial Pitch Generator with LLMs in Salesforce CRM:</strong> Discursive recommendation system combining client financial profiles with audio transcriptions of calls to generate hyperpersonalized sales pitches integrated directly into Salesforce.</li><li><strong>Core Customer Models & MLOps Automation:</strong> Production transactional propensity models on AWS MLOps framework. Recurrent analytical segmentations (RFM, merchant clustering) via scheduled BigQuery jobs syncing with Salesforce.</li><li><strong>Regional Competition (Itaú Brazil Data Battle):</strong> <strong>2nd place regionally</strong> across Latin America with a predictive proxy model for Net Promoter Score (NPS) to anticipate dissatisfaction and trigger retention workflows.</li><li><strong>Alternative Credit Scoring (Digital Account PoC):</strong> Risk models for unbanked demographics leveraging psychometric surveys as compliance proxies.</li><li><strong>Tech Stack:</strong> AWS (MLOps framework), Google BigQuery, Advanced SQL, Python (Scikit-Learn, Pandas), LLMs / Prompt Engineering, Salesforce CRM.</li></ul>",

    "trajectory.exp3_role": "Data Scientist Engineer",
    "trajectory.exp3_company": "Moneda Asset Management (Processes & Systems, IT)",
    "trajectory.exp3_period": "May 2021 – Jan 2022 · Santiago, Chile",
    "trajectory.exp3_desc": "<ul><li><strong>Automated FX Currency Monitoring:</strong> Daily Python reconciliation pipeline tracking local and international exchange rates, detecting execution lags between trading desks, spread controls, and volatility alerts with executive Power BI dashboards.</li><li><strong>Data Governance & Query Optimization:</strong> Pipeline standardization and data governance on corporate SQL Server, significantly accelerating critical financial reporting query performance.</li><li><strong>Tech Stack:</strong> Python, SQL Server, Power BI (DAX, Power Query), Git.</li></ul>",

    "trajectory.exp4_role": "Data Scientist",
    "trajectory.exp4_company": "KPMG (Data & Analytics – Insights Center)",
    "trajectory.exp4_period": "Oct 2017 – May 2021 · Santiago, Chile",
    "trajectory.exp4_desc": "<ul><li><strong>Retail Wholesale Fraud Detection & Quantitative Audit:</strong> Co-designed 20+ business heuristics and constructed a statistical multivariable scoring engine prioritizing suspicious supplier invoices and credit notes across hundreds of thousands of records.</li><li><strong>Highway Toll Delinquency Profiling:</strong> Unsupervised user segmentation with K-Prototypes clustering combining numeric and categorical variables for urban electronic toll collection (TAG) default risk.</li><li><strong>Actuarial Model Vectorization:</strong> Re-engineered severance indemnity liability valuation (IAS 19 / PIAS), migrating spreadsheet models into vectorized R scripts, drastically optimizing computing time and ensuring mathematical traceability for audit committees.</li><li><strong>Computer Vision & OCR:</strong> Automated document data extraction scripts with OpenCV and Tesseract OCR for legal and tax forms.</li><li><strong>Data Governance:</strong> Designed DAMA-aligned data governance frameworks for insurance companies and pension fund administrators (AFPs).</li><li><strong>Tech Stack:</strong> Python, R, OpenCV, Tesseract OCR, SQL, Power BI, DAMA Methodology.</li></ul>",

    "trajectory.exp5_role": "Teaching Assistant / Adjunct Lecturer",
    "trajectory.exp5_company": "Universidad de Chile (Faculty of Physical & Mathematical Sciences)",
    "trajectory.exp5_period": "Mar 2011 – Jul 2017 · Santiago, Chile",
    "trajectory.exp5_desc": "Lecturing and problem sessions for core and advanced undergraduate engineering courses: Differential & Integral Calculus, Multivariable Calculus, Linear Algebra, and Advanced Real Analysis. Course design and evaluation grading for classes of 80+ students per semester.",

    "trajectory.edu1_role": "Master of Business Administration (MBA)",
    "trajectory.edu1_company": "Universidad de Chile – FCFM / DCS",
    "trajectory.edu1_period": "Graduation: Jul 2025",
    "trajectory.edu1_grade": "Graduation GPA: 6.3 / 7.0",
    "trajectory.edu1_desc": "Executive training in corporate strategy, finance, business model design, and high-performance team leadership. Blending strategic business acumen with deep technical expertise.",

    "trajectory.edu2_role": "M.Sc. in Engineering Sciences, Applied Mathematics",
    "trajectory.edu2_company": "Universidad de Chile – Center for Mathematical Modeling (CMM)",
    "trajectory.edu2_period": "Graduation: Jun 2017",
    "trajectory.edu2_grade": "Graduation GPA: 6.6 / 7.0",
    "trajectory.edu2_desc": "Graduate Thesis: <em>'Flow of Newtonian and Non-Newtonian Fluids in Porous Media'</em> (Advisor: Dr. Raúl Gormaz). Partial differential equations modeling and advanced numerical simulation.",

    "trajectory.edu3_role": "Mathematical Civil Engineering",
    "trajectory.edu3_company": "Universidad de Chile (FCFM - Beauchef)",
    "trajectory.edu3_period": "Graduation: Jun 2017",
    "trajectory.edu3_grade": "Graduation GPA: 7.0 / 7.0 (Highest Honors / Distinción Máxima)",
    "trajectory.edu3_desc": "<strong>Historic maximum grade in final degree defense and graduation examination.</strong> Rigorous foundation in real analysis, probability theory, continuous and discrete optimization, and numerical analysis.",

    "article.back": "Back to Articles & Portfolio",
    "article.author_role": "Senior Data Scientist & Mathematical Civil Engineer (MBA)",
    "article.read_time": "15 min read",
    "article.about_author": "About the Author: Sebastian Urzúa Bórquez",
    "article.author_bio": "Mathematical Civil Engineer (U. of Chile, 7.0 GPA / Highest Honors), MBA, and Senior Data Scientist. Specialist in rigorous mathematical optimization, advanced predictive modeling, LLM pipelines, and business impact assessment (ROI) across Supply Chain, Banking, and Retail.",
    "article.lang_notice": "🌐 <i>This technical paper was originally authored in Spanish with formal mathematical notation.</i>",

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

"trajectory.exp1_role": "Data Scientist Sênior (Consultor)",
    "trajectory.exp1_company": "SmartJob · Consultoria para Grupo Retail Omnicanal (Retail Tech – Advanced Analytics)",
    "trajectory.exp1_period": "Jan 2026 – Set 2026 · Escopo Regional",
    "trajectory.exp1_desc": "<ul><li><strong>Liderança Analítica & Escopo Regional:</strong> Consultor sênior em analítica avançada para Retail Omnicanal Tecnológico Corporativo (Retail Tech), atuando no domínio de Supply Chain no portfólio corporativo <em>Motor de Promesa Logística</em> com cobertura no Chile, Peru e América Latina (picking 1P/3P, centros de distribuição, cross-docking e despacho).</li><li><strong>Correção Automatizada de Catálogo (Pipeline GenAI & Testes A/B):</strong> Pipeline produtivo em 5 fases no GCP / Vertex AI para sanar inconsistências de dimensões e peso: normalização textual, agrupamento semântico com LLMs, faixas sintéticas e imputação estatística. Validação causal com Testes A/B multivariáveis: <strong>> 7,7M USD anuais de impacto regional validado (> 3,8M USD no Chile)</strong>.</li><li><strong>Forecasting de Capacidades & Gargalos:</strong> Modelagem preditiva de séries temporais para antecipar saturação em nós críticos, obtendo <strong>redução de 2 p.p. em atrasos operacionais</strong> sobre ~500.000 pedidos/mês na rede da América Latina.</li><li><strong>Simplificação Topológica da Rede Logística:</strong> Clustering espacial origem-destino para consolidar e desativar <strong>40% das rotas redundantes</strong>. Prevenção de quedas no motor de promessa no CyberDay, <strong>protegendo +100M CLP em vendas</strong>.</li><li><strong>Stack Tecnológico:</strong> GCP (BigQuery, Vertex AI), Python (Pandas, Polars, Scikit-Learn), LLMs / Prompt Engineering, Git, CI/CD.</li></ul>",

    "trajectory.exp2_role": "Data Scientist Sênior",
    "trajectory.exp2_company": "Banco Itaú (Analytics Varejo – Laboratório ItaúX)",
    "trajectory.exp2_period": "Jan 2022 – Set 2025 · Santiago, Chile",
    "trajectory.exp2_desc": "<ul><li><strong>Motor Look-a-Likes e Hiperpersonalização (Vencedor Prêmio Transforma 2024):</strong> Algoritmo multicluster balanceado pela margem financeira histórica de cada produto bancário para recomendar cestas ideais. <strong>Aumento de +50% na taxa de contato efetivo</strong> e vencedor do <strong>Prêmio corporativo Transforma 2024 de Inovação Data-Driven</strong>.</li><li><strong>Gerador de Argumentário Comercial 'Pitch Vencedor' (LLMs no CRM):</strong> Sistema discursivo com LLMs combinando perfil de clientes e transcrições de áudio para gerar pitches comerciais hiperpersonalizados integrados diretamente ao Salesforce CRM.</li><li><strong>Modelos Core de Clientes e MLOps:</strong> Modelos de propensão produtivizados em arquitetura AWS MLOps e segmentações recorrentes integradas ao Salesforce via BigQuery.</li><li><strong>Competição Regional (Batalha de Dados Itaú Brasil):</strong> <strong>2º lugar regional</strong> da América Latina com modelo preditivo proxy do NPS para antecipar insatisfações e retenção.</li><li><strong>Scoring Alternativo (PoC Conta Digital):</strong> Modelos de risco de crédito com pesquisas psicométricas para clientes sem histórico bancário tradicional.</li><li><strong>Stack Tecnológico:</strong> AWS (MLOps framework), Google BigQuery, SQL avançado, Python (Scikit-Learn, Pandas), LLMs / Prompt Engineering, Salesforce CRM.</li></ul>",

    "trajectory.exp3_role": "Engenheiro Data Scientist",
    "trajectory.exp3_company": "Moneda Asset Management (Processos e Sistemas, TI)",
    "trajectory.exp3_period": "Mai 2021 – Jan 2022 · Santiago, Chile",
    "trajectory.exp3_desc": "<ul><li><strong>Monitoramento Automatizado de Câmbio (FX):</strong> Pipeline diário em Python para conciliação de taxas de câmbio, detecção de defasagens operacionais entre mesas de operações e dashboards no Power BI.</li><li><strong>Governança de Dados & Otimização:</strong> Padronização de fluxos e governança no SQL Server corporativo, otimizando o processamento de relatórios financeiros críticos.</li><li><strong>Stack Tecnológico:</strong> Python, SQL Server, Power BI (DAX, Power Query), Git.</li></ul>",

    "trajectory.exp4_role": "Data Scientist",
    "trajectory.exp4_company": "KPMG (Data & Analytics – Insights Center)",
    "trajectory.exp4_period": "Out 2017 – Mai 2021 · Santiago, Chile",
    "trajectory.exp4_desc": "<ul><li><strong>Detecção de Fraude e Auditoria em Varejo / Atacado:</strong> Motor estatístico de scoring multivariável com mais de 20 regras de negócio para priorizar transações suspeitas em centenas de milhares de notas de crédito e pagamentos.</li><li><strong>Modelagem de Inadimplência em Rodovias:</strong> Clusterização K-Prototypes para comportamento de pagamento de pedágio eletrônico (TAG) e risco de crédito.</li><li><strong>Vetorização de Modelos Atuariais:</strong> Engenharia de cálculo de provisões trabalhistas (PIAS / IAS 19), migrando planilhas manuais para rotinas vetorizadas em R com alta eficiência computacional e rastreabilidade para auditoria.</li><li><strong>Visão Computacional e OCR:</strong> Extração automatizada de texto com OpenCV e Tesseract OCR para documentos tributários.</li><li><strong>Governança de Dados (DAMA):</strong> Implementação de frameworks DAMA para seguradoras e fundos de pensão.</li><li><strong>Stack Tecnológico:</strong> Python, R, OpenCV, Tesseract OCR, SQL, Power BI, Metodologia DAMA.</li></ul>",

    "trajectory.exp5_role": "Professor Assistente",
    "trajectory.exp5_company": "Universidad de Chile (Faculdade de Ciências Físicas e Matemáticas)",
    "trajectory.exp5_period": "Mar 2011 – Jul 2017 · Santiago, Chile",
    "trajectory.exp5_desc": "Aulas de exercícios e tutoria para cursos avançados de engenharia: Cálculo Diferencial e Integral, Cálculo em Várias Variáveis, Álgebra Linear e Análise Real para turmas de mais de 80 alunos por semestre.",

    "trajectory.edu1_role": "Master of Business Administration (MBA)",
    "trajectory.edu1_company": "Universidad de Chile – FCFM / DCS",
    "trajectory.edu1_period": "Formatura: Jul 2025",
    "trajectory.edu1_grade": "Nota de Conclusão: 6.3 / 7.0",
    "trajectory.edu1_desc": "Formação executiva em estratégia corporativa, finanças, modelos de negócios e liderança de equipes de alta performance.",

    "trajectory.edu2_role": "Mestrado em Ciências da Engenharia, Matemática Aplicada",
    "trajectory.edu2_company": "Universidad de Chile – Centro de Modelagem Matemática (CMM)",
    "trajectory.edu2_period": "Formatura: Jun 2017",
    "trajectory.edu2_grade": "Nota de Conclusão: 6.6 / 7.0",
    "trajectory.edu2_desc": "Dissertação de mestrado: <em>'Escoamento de Fluidos Newtonianos e Não-Newtonianos em Meios Porosos'</em> (Orientador: Dr. Raúl Gormaz). Modelagem com equações diferenciais parciais e simulação numérica.",

    "trajectory.edu3_role": "Engenharia Civil Matemática",
    "trajectory.edu3_company": "Universidad de Chile (FCFM - Beauchef)",
    "trajectory.edu3_period": "Formatura: Jun 2017",
    "trajectory.edu3_grade": "Nota de Conclusão: 7.0 / 7.0 (Distinção Máxima)",
    "trajectory.edu3_desc": "<strong>Nota máxima histórica na defesa de graduação e exame de título.</strong> Formação rigorosa em análise matemática, probabilidades, otimização contínua e discreta, e cálculo numérico.",

    "article.back": "Voltar para Artigos e Portfólio",
    "article.author_role": "Senior Data Scientist & Eng. Civil Matemático (MBA)",
    "article.read_time": "15 min de leitura",
    "article.about_author": "Sobre o Autor: Sebastian Urzúa Bórquez",
    "article.author_bio": "Engenheiro Civil Matemático (U. do Chile, Nota 7.0 / Distinção Máxima), MBA e Senior Data Scientist. Especialista em otimização matemática rigorosa, modelos preditivos avançados, pipelines de LLMs e avaliação de impacto financeiro (ROI) em Supply Chain, Bancos e Varejo.",
    "article.lang_notice": "🌐 <i>Este ensaio técnico foi redigido originalmente em espanhol com notação matemática formal.</i>",

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

  // Handle article language notice visibility
  const langNotice = document.getElementById('article-lang-notice');
  if (langNotice) {
    langNotice.style.display = lang === 'es' ? 'none' : 'flex';
  }

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
