const saveToLocalStroage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = key => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

export { saveToLocalStroage, getFromLocalStorage };
