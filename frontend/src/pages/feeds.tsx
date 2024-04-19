import React, { useState } from 'react';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import type { HeadFC, PageProps } from 'gatsby';
import { Breadcrumb, Layout, Card, Typography, Tag, Flex } from 'antd';
import Filters from 'components/filters';
import Search from 'components/search';
import Navigation from 'components/header';
import WebFooter from 'components/footer';

const { Title } = Typography;

const { Content, Footer, Sider } = Layout;

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

const { Meta } = Card;

const FeedsPage: React.FC<PageProps> = () => {
	const [loading, setLoading] = useState(false);

	return (
		<Layout className="feeds-layout">
			<Navigation />
			<Content>
				{/* <Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>News Feed</Breadcrumb.Item>
				</Breadcrumb> */}
				<Layout style={{ margin: '30px 0' }}>
					<Filters />
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						<Search />
						<Flex gap="20px" wrap="wrap">
							{
								data.map((item, index) => (
									<Card
										key={index}
										loading={loading}
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

export default FeedsPage;

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
