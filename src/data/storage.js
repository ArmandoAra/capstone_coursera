//function that stores the data in the local storage

export const storeData = (value) => {
  try {
    const data = localStorage.getItem("tableReserve");
    let updatedData;

    if (data === null) {
      // Si no hay datos previos, guarda el nuevo valor como el primer elemento en un arreglo
      updatedData = [value];
    } else {
      const parsedData = JSON.parse(data);
      // Asegúrate de que `parsedData` sea un arreglo antes de agregar el nuevo valor
      updatedData = Array.isArray(parsedData)
        ? [...parsedData, value]
        : [parsedData, value];
    }

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem("tableReserve", JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

//function that gets the data from the local storage
export const getAllData = async () => {
  try {
    const data = localStorage.getItem("tableReserve");
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getDateAndTime = () => {
  try {
    const data = localStorage.getItem("tableReserve");
    const parsedData = JSON.parse(data);
    const unavailableTime = [];
    for (let item of parsedData) {
      unavailableTime.push({ Date: item.Date, Time: item.Time });
    }
    return unavailableTime;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getLastItem = () => {
  try {
    const data = localStorage.getItem("tableReserve");
    const parsedData = JSON.parse(data);
    return parsedData[parsedData.length - 1];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
