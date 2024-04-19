import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:800/api';

axios.defaults.headers.common['Authorization'] = 'token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
