import axios from './settings';
import { setCookie } from 'helpers/cookies';

/**
 * @param {object} values - value holding form inputs.
 * @returns {Promise<{ type: string, message: string, title: string }>} - Notification details
 */
export const login = async (values) => {
	try {
		const _response = await axios.post('/login', { email: values?.username, password: values?.password });

		if (_response.status === 200) {
			const _responsePromiseData = _response.data;

			if (_responsePromiseData?.status) {
				setCookie('authToken', _responsePromiseData?.token);
				// Set authorization header immediately after login
				axios.defaults.headers.common['Authorization'] = `Bearer ${_responsePromiseData?.token}`;
				return { type: 'success', message: '', title: 'Login Successful!' };
			}

			return { type: 'error', message: '', title: _responsePromiseData?.message };
		}

		return { type: 'error', message: 'Please try again after sometime.', title: 'Something went wrong!' };
	} catch (error) {
		return { type: 'error', message: error?.message || '', title: 'Something went wrong!' };
	}
};

/**
 * @param {object} values - value holding form inputs.
 * @returns {Promise<{ type: string, message: string, title: string }>} - Notification details
 */
export const register = async (values) => {
	try {
		const _response = await axios.post('/register', { name: values?.name, email: values?.username, password: values?.password });

		if (_response.status === 200) {
			const _responsePromiseData = _response.data;

			if (_responsePromiseData?.status) {
				return { type: 'success', message: '', title: _responsePromiseData?.message };
			}

			return { type: 'error', message: '', title: _responsePromiseData?.message };
		}

		return { type: 'error', message: 'Please try again after sometime.', title: 'Something went wrong!' };
	} catch (error) {
		return { type: 'error', message: error?.message || '', title: 'Something went wrong!' };
	}
};
