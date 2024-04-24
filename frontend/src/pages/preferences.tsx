import React, { useState, useEffect } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, Card, Typography, Flex, Tag, Button, Divider, Skeleton, notification, Col, Row } from 'antd';
import Navigation from 'components/header';
import WebFooter from 'components/footer';
import axios from '../apis/settings';
import withAuth from 'components/authWrapper';
import { updateUserPreferences } from '../apis/preferences';

const { Title } = Typography;
const { Content } = Layout;

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Choose your preferences!',
	description: '',
	keywords: '',
};

const PreferencesPage: React.FC<PageProps> = () => {
	const [loading, setLoading] = useState(true);
	const [userPreferences, setUserPreferences] = useState([]);
	const [api, contextHolder ] = notification.useNotification();
	const [userNotification, setUserNotification ] = useState( {} );
	const [selectedPreferences, setSelectedPreferences] = useState([]);

	const handleSelectionChange = (type, item, checked) => {
		setSelectedPreferences((prevState) => {
			const updatedPreferences = { ...prevState };

			if (!Array.isArray(updatedPreferences[type])) {
				updatedPreferences[type] = [];
			}
			if (checked) {
				updatedPreferences[type].push(item);
			} else {
				updatedPreferences[type] = updatedPreferences[type].filter(
					(selectedItem) => selectedItem !== item
				);
			}
			return updatedPreferences;
		});
	};


	const getUserPreferences = async () => {
		try {
			const _response = await axios.get('/getPreferences');

			if (_response.status === 200) {
				setUserPreferences({..._response?.data?.data});
				setSelectedPreferences({..._response?.data?.data?.selected});
				setLoading(false);
			}

		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const setPreferences = async () => {
		const _preferences = {
			categories: selectedPreferences.categories,
			authors: selectedPreferences.authors,
			sources: selectedPreferences.sources
		};

		const _response = await updateUserPreferences( _preferences );
		setUserNotification( _response );
	};

	useEffect(() => {
		getUserPreferences();
	}, []);

	useEffect( () => {
		if (!api || !userNotification) {
			return;
		}

		const { type, title, message } = userNotification;

		if ( title ) {
			api[type || 'info']({
				message: title || '',
				description: message || ''
			});
		}
	}, [ userNotification, api ] );


	return (
		<Layout className="feeds-layout">
			{ contextHolder }
			<Navigation />
			<Content>
				<Layout style={{ margin: '30px 0' }}>
					<Title level={2}>
						Select your preferences for a customized news feed!
					</Title>
					<Divider />
					<Content>
						{
							! loading ? (
								<Row gutter={ [16, 16] } justify="space-evenly">
									{(!selectedPreferences || selectedPreferences.length === 0) ? (
									// Display defined data
										Object.keys(userPreferences?.defined || {}).map((type, mainIndex) => (
											<Col key={mainIndex} span={24}>
												<Card key={type} title={type.charAt(0).toUpperCase() + type.slice(1)} className="shadow feeds-layout__preferences-card">
													<Flex gap="20px" wrap="wrap">
														{(userPreferences?.defined[type] || []).map((item, index) => (
															<Tag.CheckableTag
																key={index}
																checked={false}
																className="feeds-layout__tags"
																onChange={(checked) => handleSelectionChange(type, item, checked)}
															>
																{item}
															</Tag.CheckableTag>
														))}
													</Flex>
												</Card>
											</Col>
										))
									) : (
									// Display defined data and check selected items
										Object.keys(userPreferences?.defined || {}).map((type, mainIndex) => (
											<Col key={mainIndex} span={24}>
												<Card key={type} title={type.charAt(0).toUpperCase() + type.slice(1)} className="shadow feeds-layout__preferences-card">
													<Flex gap="20px" wrap="wrap">
														{(userPreferences?.defined[type] || []).map((item, index) => (
															<Tag.CheckableTag
																key={index}
																checked={selectedPreferences?.[type]?.includes(item)}
																className="feeds-layout__tags"
																onChange={(checked) => handleSelectionChange(type, item, checked)}
															>
																{item}
															</Tag.CheckableTag>
														))}
													</Flex>
												</Card>
											</Col>
										))
									)}
								</Row>
							) : <Skeleton />
						}
						<Divider />
						<Button type="primary" onClick={setPreferences}>Save Preferences!</Button>
					</Content>
				</Layout>
			</Content>
			<WebFooter />
		</Layout>
	);
};

export default withAuth( PreferencesPage );

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
