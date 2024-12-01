export const translations = {
  "en": {
    title: "Join waitlist",
    subtitle: "Be notified when we launch.",
    name: "Name",
    email: "you@example.com",
    join: "Join",
    joining: "Joining...",
    success: (name: string) => `Thanks for joining, ${name}! We'll be in touch soon.`,
    error: {
      default: "An unexpected error occurred.",
      prefix: "Error: ",
    },
  },
  "pt-BR": {
    title: "Entre na lista de espera",
    subtitle: "Seja notificado quando lançarmos.",
    name: "Nome",
    email: "voce@exemplo.com",
    join: "Participar",
    joining: "Participando...",
    success: (name: string) => `Obrigado por participar, ${name}! Entraremos em contato em breve.`,
    error: {
      default: "Ocorreu um erro inesperado.",
      prefix: "Erro: ",
    },
  },
} as const; 