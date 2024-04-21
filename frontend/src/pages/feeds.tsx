import React, { useState, useEffect } from 'react';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, Card, Typography, Tag, Flex } from 'antd';
import Filters from 'components/filters';
import Search from 'components/search';
import Navigation from 'components/header';
import WebFooter from 'components/footer';
import withAuth from 'components/authWrapper';
import axios from '../apis/settings';

const { Title } = Typography;
const { Content } = Layout;
const { Meta } = Card;

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Your customized news feed!',
	description: '',
	keywords: '',
};

const data = [
	{
		img: {
			src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
			alt: 'example',
		},
		category: 'health',
		source: 'BBC',
		author: 'sourcer',
		title: 'Card Title',
		excerpt: 'This is the description',
		link: '/'
	},
	{
		img: {
			src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
			alt: 'example',
		},
		category: 'health',
		source: 'BBC',
		author: 'sourcer',
		title: 'Card Title',
		excerpt: 'This is the description',
		link: '/'
	}
];

const FeedsPage: React.FC<PageProps> = () => {
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
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						<Search />
						<Flex gap="20px" wrap="wrap">
							{
								data.map((item, index) => (
									<Card
										key={index}
										loading={false}
										style={{ width: 300 }}
										className="shadow"
										cover={
											<img
												alt={item.img.alt}
												src={item.img.src}
											/>
										}
										actions={[
											<SettingOutlined key="setting" />,
											<EditOutlined key="edit" />,
										]}
									>
										<Flex gap="4px 0" wrap="wrap">
											<Tag color="purple">{item.category}</Tag>
											<Tag color="magenta">{item.source}</Tag>
											<Tag color="cyan">{item.author}</Tag>
										</Flex>
										<Title level={1}>{item.title}</Title>
										<Meta description={item.excerpt} />
									</Card>
								))
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
