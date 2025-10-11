import { api } from './axiosConfig';

function debouncer(func, delay) {
  let timeout;
  let response;
  return (...args) => {
    return new Promise(resolve => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        response = await func(...args);
        resolve(response);
      }, delay);
    });
  };
}

async function getUsers(userEmail) {
  try {
    const response = await api.get(`/search/users?email=${userEmail}`);
    return response.data.body;
  } catch (err) {
    console.log(err);
  }
}

const inputDeboucer = debouncer(getUsers, 750);

export { inputDeboucer };
