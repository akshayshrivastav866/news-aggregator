import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { getCookie } from 'helpers/cookies';

const isAuthTokenValid = async () => {
	if (getCookie('authToken') === false) {
		return false;
	} else {
		// try {
		// 	const response = await fetch('/api/isTokenValid'); // Adjust the endpoint as per your server
		// 	if (!response.ok) {
		// 		throw new Error('Failed to check authentication token validity');
		// 	}
		// 	const data = await response.json();
		// 	return data.valid === true;
		// } catch (error) {
		// 	console.error('Error checking authentication token validity:', error);
		// 	return false;
		// }
		return true;
	}
};

const withAuth = (WrappedComponent: React.FC<any>) => {
	const WithAuth: React.FC<any> = (props) => {
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const checkAuthToken = async () => {
				const _isValid = await isAuthTokenValid();

				if (!_isValid) {
					navigate('/');
				}

				setLoading( false );
			};

			checkAuthToken();
		}, []);

		if (loading) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	return WithAuth;
};

export default withAuth;
