import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;
const API_KEY = '9534498-01df2148594d3f0d4c2aed4f3';
const IMAGES_PER_PAGE = 12;

axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: IMAGES_PER_PAGE,
};

export const getImages = async (query, page) => {
  const config = {
    params: {
      q: query,
      page: page,
    },
  };
  const response = await axios.get('', config);
  return response.data;
};
