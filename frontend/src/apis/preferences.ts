import axios from './settings';

export const setPreferences = async ( preferences ) => {
	try {
		const _endpoint = 'locahost:8000';

		const _response = await axios.post( '/setPreferences', preferences );

		if ( _response.ok ) {
			const _responsePromiseData = await _response.json();
			console.log( _responsePromiseData );
		} else {
			console.log( _response );
		}
	} catch ( error ) {
		console.error( 'Error sending form data:', error );
	}
};
