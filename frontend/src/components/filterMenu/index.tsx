import React from 'react';
import type { PageProps } from 'gatsby';
import { Menu, Checkbox } from 'antd';
import { openKeys } from 'helpers/filters';

import './index.scss';

const FilterMenu: React.FC<PageProps> = (props) => {
	const { data = {} } = props;

	console.log( 'here : ', data );

	return (
		<div className="feeds-filter-menu">
			<Menu mode="inline" defaultOpenKeys={openKeys}>
				{Object.keys(data).map((category) => (
					<Menu.SubMenu key={category} title={category.charAt(0).toUpperCase() + category.slice(1)}>
						{data[category].map((item, index) => (
							<Menu.Item key={`${category}-${index}`}>
								<label htmlFor={`${category}-${index}`} className="feeds-filter-menu__checkbox-label">
									<Checkbox id={`${category}-${index}`}>{item}</Checkbox>
								</label>
							</Menu.Item>
						))}
					</Menu.SubMenu>
				))}
			</Menu>
		</div>
	);
};

export default FilterMenu;
