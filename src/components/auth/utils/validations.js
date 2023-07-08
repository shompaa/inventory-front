export const validateAuthForm = () => {
  return {
    email: {
      required: {
        value: true,
        message: "El email es requerido",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email no válido",
      },
    },
    password: {
      required: {
        value: true,
        message: "La contraseña es requerida",
      },
      minLength: {
        value: 4,
        message: "La contraseña debe tener al menos 6 caracteres",
      },
    },
  };
};
