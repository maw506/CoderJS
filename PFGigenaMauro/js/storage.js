// Función para guardar en localStorage
export function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Función para recuperar desde localStorage
export function getDataFromLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : {};
  }
