import axios from 'axios';

const BASE_URL = 'http://devapp.bonusmoney.pro';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['TOKEN'] = '123';
