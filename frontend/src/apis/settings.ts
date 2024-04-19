import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8001/api';

axios.defaults.headers.common['Authorization'] = 'token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
