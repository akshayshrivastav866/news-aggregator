import React from 'react';
import type { PageProps } from 'gatsby';
import { Menu, Checkbox } from 'antd';
import { filters, openKeys } from 'helpers/filters';

import './index.scss';

const FilterMenu: React.FC<PageProps> = () => {
	return (
		<div className="feeds-filter-menu">
			<Menu mode="inline" defaultOpenKeys={openKeys}>
				{
					filters.map( ( filter ) => (
						<Menu.SubMenu key={filter.key} title={filter.label}>
							{
								filter.children.map( ( child ) => (
									<Menu.Item key={child.key}>
										<label htmlFor={child.key} className="feeds-filter-menu__checkbox-label">
											<Checkbox id={child.key}>{child.label}</Checkbox>
										</label>
									</Menu.Item>
								))
							}
						</Menu.SubMenu>
					))
				}
			</Menu>
		</div>
	);
};

export default FilterMenu;
