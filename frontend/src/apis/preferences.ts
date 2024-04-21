import axios from './settings';

export const updateUserPreferences = async ( preferences ) => {
	try {
		const _response = await axios.post('/setPreferences', { preferences: preferences });

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
