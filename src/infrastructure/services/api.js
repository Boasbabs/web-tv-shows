import axios from 'axios';
import { FETCH_SHOWS_URL } from '../../constants';

const api = {
  getShows: async () => {
    const response = await axios.get(FETCH_SHOWS_URL);
    return response.data;
  },
  getEpisodes: async (id) => {
    const response = await axios.get(`${FETCH_SHOWS_URL}/${id}/episodes`);
    return response.data;
  },
};

export default api;
