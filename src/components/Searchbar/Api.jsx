import axios from 'axios';

const REACT_API_KEY = 214124124;

axios.defaults.baseURL = `https://api.thedogapi.com/v1`;
axios.defaults.headers.common['x-api-key'] = REACT_API_KEY;

export const fetchBreeds = async () => {
  const response = await axios.get('/breeds');
  return response.data;
};

export const fetchDogByBreed = async breedId => {
  const response = await axios.get('/images/search)', {
    params: { breed_id: breedId },
  });
  axios.get();
  return response.data[0];
};
