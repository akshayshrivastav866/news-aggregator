export const setCookie = (name, value, days = 7) => {
	const date = new Date();

	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

	const expires = `expires=${date.toUTCString()}`;

	document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name) => {
	const cookieName = `${name}=`;
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split(';');

	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(cookieName) === 0) {
			return cookie.substring(cookieName.length, cookie.length);
		}
	}
	return false;
};

export const deleteCookie = (name) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setSecureCookie = (name, value, days = 7) => {
	const secureFlag = ';Secure'; // Will only work on HTTPS

	setCookie(name, value, days);
	document.cookie = `${name}=${value}${secureFlag};`;
};

export const deleteSecureCookie = (name) => {
	deleteCookie(name);
	const secureFlag = ';Secure'; // Will only work on HTTPS
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${secureFlag}`;
};
