import { navigate } from 'gatsby';
import { deleteCookie } from '../helpers/cookies';
import axios from '../apis/settings';

export const logout = async () => {
	try {
		const _response = await axios.get('/logout');

		if (_response.status === 200) {
			const _responsePromiseData = _response.data;

			if (_responsePromiseData?.status) {
				deleteCookie( 'authToken' );
				navigate('/');
				return { type: 'success', message: '', title: _responsePromiseData?.message };
			}

			return { type: 'error', message: '', title: _responsePromiseData?.message };
		}

		return { type: 'error', message: 'Please try again after sometime.', title: 'Something went wrong!' };
	} catch (error) {
		return { type: 'error', message: error?.message || '', title: 'Something went wrong!' };
	}
};

export const validateToken = async () => {

};
