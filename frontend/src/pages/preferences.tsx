import React, { useState } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Breadcrumb, Layout, Card, Typography, Flex } from 'antd';
import Navigation from 'components/header';
import WebFooter from 'components/footer';

const { Title } = Typography;

const { Content } = Layout;

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Choose your preferences!',
	description: '',
	keywords: '',
};

const PreferencesPage: React.FC<PageProps> = () => {
	return (
		<Layout className="feeds-layout">
			<Navigation />
			<Content>
				{/* <Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>News Feed</Breadcrumb.Item>
				</Breadcrumb> */}
				<Layout style={{ margin: '30px 0' }}>
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						<Flex gap="20px" wrap="wrap">

						</Flex>
					</Content>
				</Layout>
			</Content>
			<WebFooter />
		</Layout>
	);
};

export default PreferencesPage;

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
