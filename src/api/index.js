import { BASE_URL } from 'constants/api-key';

const api = {
  getAllData: async (callback) => {
    await fetch(BASE_URL)
      .then((res) => res.json())
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  },
  editData: async (id, data) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  },
  getDataById: async (id, callback) => {
    await fetch(`${BASE_URL}/${id}`)
      .then((res) => res.json())
      .then(callback)
      .catch((error) => {
        console.log(error);
      });
  },
};

export default api;
