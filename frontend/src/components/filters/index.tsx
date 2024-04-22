import React from 'react';
import type { PageProps } from 'gatsby';
import { Layout, Typography, Skeleton } from 'antd';
import FilterMenu from 'components/filterMenu';

const { Sider } = Layout;
const { Title } = Typography;

import './index.scss';
import { toFormData } from 'axios';

const Filters: React.FC<PageProps> = (props) => {
	const { data, showSkeleton } = props;

	return (
		<div className="feeds-filters">
			{
				! showSkeleton ? (
					<Sider className="feeds-filters__sidebar border-radius shadow">
						<Title level={3} className="feeds-filters__title">
							Filters
						</Title>
						<FilterMenu data={data} />
					</Sider>
				) : <Skeleton active/>
			}
		</div>
	);
};

export default Filters;
