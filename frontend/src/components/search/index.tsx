import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchDataWithKeyword } from '../../redux/slice';

import './index.scss';

const { Search } = Input;

const SearchBar: React.FC = () => {
	const dispatch = useDispatch();
	const urlSearchParams = new URLSearchParams(window.location.search);
	const searchKeywordFromURL = urlSearchParams.get('search');

	useEffect( () => {
		if ( ! searchKeywordFromURL ) {
			return;
		}

		dispatch(fetchDataWithKeyword(searchKeywordFromURL));
	}, [dispatch, searchKeywordFromURL]);

	const onSearch = (value: string) => {
		if ( value === '' ) {
			handleClearSearch();
			dispatch(fetchDataWithKeyword(value));
			return;
		}

		dispatch(fetchDataWithKeyword(value));
		updateURLParameter(value);
	};

	const updateURLParameter = (searchTerm: string) => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.set('search', encodeURIComponent(searchTerm));
		const newURL = `${window.location.pathname}?${urlSearchParams.toString()}`;
		window.history.pushState({ path: newURL }, '', newURL);
	};

	const handleClearSearch = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.delete('search');

		let newURL = `${window.location.origin}${window.location.pathname}`;

		if (urlSearchParams.toString()) {
			newURL += `?${urlSearchParams.toString()}`;
		}

		window.history.pushState({ path: newURL }, '', newURL);
	};

	return (
		<div className="feed-search">
			<Search
				className="feed-search__search"
				placeholder="What's on your mind?"
				onSearch={onSearch}
				enterButton
				allowClear
				defaultValue={ searchKeywordFromURL || '' }
			/>
		</div>
	);
};

export default SearchBar;
