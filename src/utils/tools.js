//Funcion para filtrar las horas que no estan disponibles segun la fecha que se escoja
export function filterTime(date, bookingData, timeArray) {
  let newTimeArray = timeArray;

  bookingData.forEach((item) => {
    if (item.Date === date) {
      newTimeArray = newTimeArray.filter((time) => time !== item.Time);
    }
  });

  return newTimeArray;
}

//function to validate the form data is not empty
export function checkFormData(date, time, guests, occasion) {
  if (date && time?.length !== 0 && guests && occasion) {
    return true;
  }
  return false;
}

// Functin to validate the date format and not allow past dates
export function isValidDate(date) {
  const actualDate = new Date(); // Fecha actual
  // Expresión regular para el formato "YYYY-MM-DD"
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = date.match(regex);

  if (!match) return false; // Si no coincide con el formato, retorna false

  // Extrae año, mes y día
  const [_, year, month, day] = match.map(Number);

  // Crear un objeto de date con los valores extraídos
  const dateObject = new Date(year, month - 1, day);

  // Verificar que los valores de año, mes y día sean válidos
  const isValidFormat =
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month - 1 &&
    dateObject.getDate() === day;
  if (isValidFormat && dateObject >= actualDate) return true;
  return false;
}
