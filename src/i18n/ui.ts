export const languages = {
    es: 'Spanish',
    en: 'English',
};
  
export const defaultLang = 'en';

export const ui = {
    es: {
        'profile.greeting': 'Hey, soy',
        'profile.description': 'Estudiante de Ingeniería Informática',
        'about.title': 'Sobre mí',
        'about.description': 'Apasionado por la tecnología y la computación, he llevado a cabo múltiples proyectos personales que abarcan desde la programación web hasta la inteligencia artificial, siempre aprendiendo de forma autodidacta.',
        'projects.title': 'Proyectos más recientes'
    },
    en: {
        'profile.greeting': 'Hi! I\'m',
        'profile.description': 'A Computer Science student',
        'about.title': 'About me',
        'about.description': 'I\'m a passionate about technology and computing, I have carried out multiple personal projects ranging from web development to artificial intelligence, always learning in a self-taught manner.',
        'projects.title': 'Most recent projects'
    },
} as const;