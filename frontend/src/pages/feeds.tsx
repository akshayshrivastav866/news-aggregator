import React, { useState, useEffect } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, Card, Typography, Tag, Flex, Skeleton } from 'antd';
import Filters from 'components/filters';
import SearchBar from 'components/search';
import Navigation from 'components/header';
import WebFooter from 'components/footer';
import withAuth from 'components/authWrapper';
import axios from '../apis/settings';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { Title } = Typography;
const { Content } = Layout;

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Your customized news feed!',
	description: '',
	keywords: '',
};

const FeedsPage: React.FC<PageProps> = () => {
	const { loading, data } = useSelector((state: RootState) => state.data);

	const [filters, setFilters] = useState({});
	const [filterLoading, setFiltersLoading] = useState(false);

	const getFilters = async () => {
		try {
			const _response = await axios.get('/filters');

			if (_response.status === 200) {
				setFilters({..._response?.data?.data});
				setFiltersLoading(false);
			}

		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setFiltersLoading(false);
		}
	};

	useEffect(() => {
		getFilters();
	}, []);

	return (
		<Layout className="feeds-layout">
			<Navigation />
			<Content>
				<Layout style={{ margin: '30px 0' }}>
					<Filters
						data={ filters }
						showSkeleton={ filterLoading }
					/>
					<Content style={{ padding: '0 0 0 24px', minHeight: 280 }}>
						<SearchBar />
						<Flex gap="20px" wrap="wrap">
							{
								! loading && data?.data ? (
									data?.data?.map((item, index) => (
										<Card
											key={index}
											loading={false}
											style={{ width: 300 }}
											className="shadow"
											cover={
												<img
													alt={item?.title}
													src={item?.thumbnail}
												/>
											}
											actions={[
												<a key={index} rel="noreferrer" href={item?.url} target="_blank">
													View More <DoubleRightOutlined />
												</a>,
											]}
										>
											<Flex gap="4px 0" wrap="wrap">
												<Tag color="magenta">{item?.source || 'N/A'}</Tag>
												<Tag color="cyan">{item?.apiSource}</Tag>
											</Flex>
											<Title className="feeds-layout__h3" level={3}>{item?.title}</Title>
										</Card>
									))
								) : <Skeleton active />
							}
						</Flex>
					</Content>
				</Layout>
			</Content>
			<WebFooter />
		</Layout>
	);
};

export default withAuth( FeedsPage );

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
