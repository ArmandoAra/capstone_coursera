//function to filter the time array based on the date and time already booked
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

// Function to convert the date to a number ex: 2021-08-01 => 20210801
function convertDateToNumber(date) {
  return parseInt(date.replace(/-/g, ""), 10);
}

// Functin to validate the date format and not allow past dates
export function isValidDate(date) {
  const actualDate = new Date();
  // Regex format "YYYY-MM-DD"
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = date.match(regex);

  if (!match) return false; // If the date does not match the format

  // Extract the year, month and day values
  const [_, year, month, day] = match.map(Number);

  // Crear un objeto de date con los valores extraídos
  const dateObject = new Date(year, month - 1, day);

  // Verify that the date is not in the past
  const isNotPastDate =
    convertDateToNumber(date) >=
    convertDateToNumber(actualDate.toISOString().slice(0, 10));

  // Verify that the date is in the correct format
  const isValidFormat =
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month - 1 &&
    dateObject.getDate() === day;

  if (isValidFormat && isNotPastDate) return true;
  return false;
}
