export const moneyFormat = (value) => {
  value = Math.trunc(value);
  return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const dateFormat = (date, timeZone = 'America/Santiago') => {
  const fecha = new Date(date);

  const opciones = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false,
    timeZone: timeZone 
  };

  return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
};

