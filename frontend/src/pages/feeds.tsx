import React, { useState } from 'react';
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
	EditOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { HeadFC, PageProps } from 'gatsby';
import { Breadcrumb, Layout, Menu, Card, Avatar, Typography } from 'antd';

const { Title } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Your customized news feed!',
	description: '',
	keywords: '',
};

const { Meta } = Card;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
	key,
	label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
].map((icon, index) => {
	const key = String(index + 1);

	return {
		key: `sub${key}`,
		icon: React.createElement(icon),
		label: `subnav ${key}`,

		children: new Array(4).fill(null).map((_, j) => {
			const subKey = index * 4 + j + 1;
			return {
				key: subKey,
				label: `option${subKey}`,
			};
		}),
	};
});

const FeedsPage: React.FC<PageProps> = () => {
	const [loading, setLoading] = useState(false);

	return (
		<Layout>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className="demo-logo" />
				<Menu
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={items1}
					style={{ flex: 1, minWidth: 0 }}
				/>
				<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" /> Profile Dropdown
			</Header>
			<Content style={{ padding: '0 48px' }}>
				{/* <Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>News Feed</Breadcrumb.Item>
				</Breadcrumb> */}
				<Layout style={{ padding: '24px 0' }}>
					<Sider width={250}>
						<Title level={3}>
							Filters
						</Title>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1', 'sub2', 'sub3' ]}
							style={{ height: '100%' }}
							items={items2}
						/>
					</Sider>
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						<Card
							loading={loading}
							style={{ width: 300 }}
							cover={
								<img
									alt="example"
									src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
								/>
							}
							actions={[
								<SettingOutlined key="setting" />,
								<EditOutlined key="edit" />,
							]}
						>
							<Meta
								title="Card title"
								description="This is the description"
							/>
						</Card>
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: 'right' }}>
				©{new Date().getFullYear()} Created by Akshay Shrivastav
				<br />
				We hope you love this customized news feed!
			</Footer>
		</Layout>
	);
};

export default FeedsPage;

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
