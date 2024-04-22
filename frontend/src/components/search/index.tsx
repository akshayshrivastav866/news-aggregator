import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchDataWithKeyword } from '../../redux/slice';

import './index.scss';

const { Search } = Input;

const SearchBar: React.FC = () => {
	const dispatch = useDispatch();

	const onSearch = (value: string) => {
		dispatch(fetchDataWithKeyword(value));
	};

	return (
		<div className="feed-search">
			<Search
				className="feed-search__search"
				placeholder="What's on your mind?"
				onSearch={onSearch}
				enterButton
			/>
		</div>
	);
};

export default SearchBar;
