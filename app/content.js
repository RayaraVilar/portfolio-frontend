export const contact = {
  email: "ravtra301@gmail.com",
  linkedin: "https://www.linkedin.com/in/rayara-vilar",
  github: "https://github.com/RayaraVilar",
  resume: "/curriculo-rayara-vilar.pdf",
  whatsapp: "5583999287661",
};

export const story = [
  ["Code2", "João Pessoa · UFPB", "A internet por dentro", "Em Comunicação em Mídias Digitais, encontrei HTML, CSS e JavaScript e comecei a entender como as escolhas de linguagem e design ganham forma na tela. Na Cruzeiro do Sul, aprofundei essa curiosidade em Sistemas para Internet."],
  ["Plane", "Mirandela e Bragança · Portugal", "Seis meses de novas perspectivas", "O intercâmbio no Instituto Politécnico de Bragança ampliou meu jeito de olhar o mundo. Estudar e viver em outro país me ensinou a perguntar melhor, me adaptar e confiar mais nas minhas escolhas."],
  ["Layers3", "Do back-end aos dados", "Curiosidade que virou repertório", "Depois de construir minha base em front-end, explorei back-end e dados. Passei a enxergar as decisões e os sistemas que sustentam aquilo que o usuário vê."],
  ["Sparkles", "Patos · Paraíba", "De volta à interface", "A comunicação, o UX/UI e as ferramentas de IA fazem parte de como trabalho hoje. Voltei ao front-end com mais perguntas sobre quem usa uma interface e mais recursos para responder a elas em código."],
];

export const strengths = [
  ["LayoutGrid", "Design com intenção", "Hierarquia e ritmo visual para deixar evidente o que merece atenção."],
  ["BookOpen", "Narrativa na interface", "Do primeiro título ao último clique, cada etapa ajuda a pessoa a entender onde está e o que fazer."],
  ["ScanFace", "Escuta de quem usa", "A prática de lidar com diferentes públicos me ajuda a traduzir necessidades em decisões de interface."],
  ["Braces", "Código com olhar visual", "Levo ao navegador a mesma atenção que dou a espaçamento, estados e leitura no protótipo."],
];

export const experience = [
  ["ZiveAi – Inteligência Artificial", "Customer Success", "ago/2026 – atual", "Patos, PB", "Acompanho clientes no uso de soluções de IA e colaboro com equipes multidisciplinares para entender demandas. A rotina aproxima meu olhar de produto das dúvidas que aparecem no uso real."],
  ["HS Marketing", "Estrategista de mídias sociais", "jul/2025 – abr/2026", "", "Planejei e organizei conteúdos para diferentes marcas, criando narrativas e adaptando a comunicação aos objetivos, formatos e públicos de cada projeto."],
  ["Universidade Federal da Paraíba", "Designer e Social Media · PPGCJ", "jul/2023 – out/2025", "João Pessoa, PB", "Adaptei pesquisas, eventos e atividades acadêmicas para canais digitais, com atenção à clareza da informação e às necessidades de cada público."],
  ["Revista Prim@ Facie", "Design", "fev/2023 – out/2025", "", "Atuei no design da revista vinculada à UFPB, em um contexto de comunicação acadêmica e editorial."],
  ["Universidade Federal da Paraíba", "Social Media", "jul/2023 – set/2025", "João Pessoa, PB", "Produzi peças institucionais, banners e apresentações. Também participei do planejamento, da produção de textos, do acompanhamento de métricas e da interação com o público."],
  ["Ellos Design", "Estrategista de mídias sociais", "mar/2022 – jun/2023", "João Pessoa, PB", "Planejei conteúdos e gerenciei redes sociais para diferentes empresas, ajustando linguagem e apresentação aos canais e públicos."],
  ["MR3 Comunicação", "Estagiária de marketing de mídias sociais", "set/2020 – mar/2022", "Patos, PB", "Produzi conteúdos, apoiei campanhas digitais e interagi com o público em projetos com demandas de diferentes clientes."],
];

export const education = [
  ["UFPB", "Comunicação em Mídias Digitais", "Universidade Federal da Paraíba"],
  ["IPB", "Intercâmbio acadêmico", "Instituto Politécnico de Bragança · 6 meses"],
  ["UNICSUL", "Sistemas para Internet", "Universidade Cruzeiro do Sul"],
];

// Fill these fields with verified project information as it becomes available.
export const projects = [
  {
    name: "Portfólio Python", theme: "pyfolio", icon: "Code2", image: "/projetos/portfolio-python.webp",
    stack: ["HTML", "CSS", "JavaScript"],
    context: "Portfólio pessoal com foco nas vagas de Desenvolvedora Python Júnior e Backend Developer Júnior.",
    solution: "Apresenta a transição da comunicação digital para o desenvolvimento Python, backend e IA, com projetos, tecnologias, experiência e formação.",
    process: "HTML, CSS e JavaScript puro, sem build, com ícones flutuantes, header dinâmico, navegação circular e revelação ao rolar.",
    repository: "https://github.com/RayaraVilar/rayara-vilar-portfolio",
  },
  {
    name: "Planner de Concursos", theme: "planner", icon: "CalendarDays", image: "/projetos/planner-concursos.webp",
    stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Recharts", "FullCalendar"],
    context: "Plataforma de estudos para quem se prepara para concursos.",
    solution: "Organiza ciclos de estudo, metas e evolução em um só lugar, com calendário, quadros que se arrastam e gráficos de desempenho.",
    process: "Interface em React com Vite e Tailwind CSS, dados no Supabase, gráficos com Recharts e agenda com FullCalendar.",
    repository: "https://github.com/RayaraVilar/Planner_concursos",
  },
  {
    name: "EduMetrics", theme: "edu", icon: "GraduationCap", image: "/projetos/edumetrics.webp",
    stack: ["Django", "Django REST", "Pandas", "PyTorch"],
    context: "Plataforma de análise educacional para gerenciar métricas acadêmicas.",
    solution: "Painel com frequência, notas e engajamento dos estudantes e predição de risco de evasão com resultado explicado em linguagem simples.",
    process: "Django e Django REST Framework no back-end, Pandas para importar e tratar os dados e PyTorch no modelo preditivo.",
    repository: "https://github.com/RayaraVilar/proj_python_02_edumetrics",
  },
].map(project => ({
  context: "", problem: "", solution: "", stack: [], role: "", process: "",
  result: "", website: "", repository: "", image: "", ...project,
}));

export const skills = [
  ["Code2", "Frontend", ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]],
  ["PenTool", "Design e UX/UI", ["Figma", "UI Design", "UX Thinking", "Prototipação", "Hierarquia visual", "Storytelling visual"]],
  ["Database", "Outras bases", ["Git / GitHub", "Python", "SQL", "Back-end", "Dados"]],
];

export const interests = [
  ["Cat", "Gatos"], ["Globe2", "Viagens"], ["Waves", "Natação"],
  ["Dumbbell", "Musculação"], ["Activity", "Crossfit"],
  ["Sparkles", "Aprender e explorar experiências digitais"],
];
