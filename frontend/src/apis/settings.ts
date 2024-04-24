import axios from 'axios';
import { getCookie } from 'helpers/cookies';

const url = 'http://127.0.0.1:8000';
axios.defaults.baseURL = `${ url }/api`;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const authCookie = getCookie('authToken');

// This is required for laravel sanctum middle auth.
if ( authCookie !== false ) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${ authCookie }`;
}

export default axios;
