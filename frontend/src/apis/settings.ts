import axios from 'axios';
import { getCookie } from 'helpers/cookies';

const url = process.env.GATSBY_BE_API_URL;

axios.defaults.baseURL = `${ url }/api`;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const authCookie = getCookie('authToken');

// This is required for laravel sanctum middle auth.
if ( authCookie !== false ) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${ authCookie }`;
}

export default axios;
