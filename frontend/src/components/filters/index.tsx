import React from 'react';
import type { PageProps } from 'gatsby';
import { Layout, Typography } from 'antd';
import FilterMenu from 'components/filterMenu';

const { Sider } = Layout;
const { Title } = Typography;

import './index.scss';

const Filters: React.FC<PageProps> = () => {
	return (
		<div className="feeds-filters">
			<Sider className="feeds-filters__sidebar border-radius shadow">
				<Title level={3} className="feeds-filters__title">
							Filters
				</Title>
				<FilterMenu />
			</Sider>
		</div>
	);
};

export default Filters;
