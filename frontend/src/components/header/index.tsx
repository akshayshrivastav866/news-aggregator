import React from 'react';
import { Link } from 'gatsby';
import type { PageProps } from 'gatsby';
import type { MenuProps } from 'antd';
import { Col, Layout, Row, Avatar, Menu } from 'antd';
import { logout } from '../../redux/auths';

const { Header } = Layout;

import './index.scss';

const items: MenuProps['items'] = [
	{
		label: (
			<Link
				to="/feeds"
				activeClassName="feeds-header__active"
			>
				Home
			</Link>
		),
		key: 'home',
	},
	{
		label: (
			<Link
				to="/preferences"
				activeClassName="feeds-header__active"
			>
				Preferences
			</Link>
		),
		key: 'preferences',
	},
	{
		label: (
			<span
				className="feeds-header__link"
				onClick={() => logout()}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						logout();
					}
				}}
				role="button"
				tabIndex={0}
			>
      Logout
			</span>
		),
		key: 'logout',
	}
];

const Navigation: React.FC<PageProps> = () => {
	return (
		<div className="feeds-header">
			<Header className="feeds-header__navigation border-radius shadow">
				<Row justify="space-evenly" align="middle" className="feeds-header__wrapper">
					<Col span={23}>
						<Menu
							className="feeds-header__menu"
							mode="horizontal"
							items={items}
						/>
					</Col>
					<Col span={1}>
						{/* <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" /> */}
					</Col>
				</Row>
			</Header>
		</div>
	);
};

export default Navigation;
