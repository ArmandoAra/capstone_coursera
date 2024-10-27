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
