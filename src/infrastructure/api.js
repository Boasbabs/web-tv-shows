import axios from 'axios';
import { FETCH_SHOWS_URL } from '../constants';

const api = {
  getShows: async () => {
    const response = await axios.get(FETCH_SHOWS_URL);
    return response.data;
  },
};

export default api;
