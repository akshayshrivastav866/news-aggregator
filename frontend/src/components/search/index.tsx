import React, { useState } from 'react';
import type { PageProps } from 'gatsby';
import type { SearchProps } from 'antd/es/input/Search';
import { Input } from 'antd';

const { Search } = Input;

import './index.scss';

const SearchBar: React.FC<PageProps> = () => {
	const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

	return (
		<div className="feed-search">
			<Search
				className="feed-search__search"
				placeholder="What's on your mind?"
				onSearch={onSearch} enterButton
			/>
		</div>
	);
};

export default SearchBar;

