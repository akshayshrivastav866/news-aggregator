import React, { useState, useEffect } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, Card, Typography, Flex, Tag, Button, Divider } from 'antd';
import Navigation from 'components/header';
import WebFooter from 'components/footer';
import { setPreferences } from '../apis/preferences';
import axios from '../apis/settings';

const { Title } = Typography;
const { Content } = Layout;

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Choose your preferences!',
	description: '',
	keywords: '',
};

const PreferencesPage: React.FC<PageProps> = () => {
	const [userPreferences, setUserPreferences] = useState([]);
	const [loading, setLoading] = useState(true);

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [selectedSources, setSelectedSources] = useState([]);

	const handleSave = () => {
		const preferences = [
			{ category: selectedCategories },
			{ author: selectedAuthors },
			{ source: selectedSources }
		];

		setUserPreferences( preferences );
		// console.log('Selected Preferences:', preferences);
		// You can perform further processing with the preferences array here
	};

	const handleCategoryChange = (category, checked) => {
		const nextSelectedCategories = checked
			? [...selectedCategories, category]
			: selectedCategories.filter((c) => c !== category);
		setSelectedCategories(nextSelectedCategories);
	};

	const handleAuthorChange = (author, checked) => {
		const nextSelectedAuthors = checked
			? [...selectedAuthors, author]
			: selectedAuthors.filter((a) => a !== author);
		setSelectedAuthors(nextSelectedAuthors);
	};

	const handleSourceChange = (source, checked) => {
		const nextSelectedSources = checked
			? [...selectedSources, source]
			: selectedSources.filter((s) => s !== source);
		setSelectedSources(nextSelectedSources);
	};

	const getPreferences = async () => {
		try {
			const response = await axios.get('/getData');

			if (response?.ok ) {
				setPreferences({...response?.data});
				setLoading(false);
			} else {
				setLoading(false);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// Use useEffect hook to fetch data when the component mounts
	useEffect(() => {
		getPreferences();
	}, []);

	return (
		<Layout className="feeds-layout">
			<Navigation />
			<Content>
				<Layout style={{ margin: '30px 0' }}>
					<Title level={2}>
						Select your preferences for a customized news feed!
					</Title>
					<Divider />
					<Content>
						<Flex gap="20px" wrap="wrap">
							{
								! loading && userPreferences?.categories && (
									<Card title="Categories" className="shadow">
										{userPreferences?.categories?.map((category) => (
											<Tag.CheckableTag
												key={category}
												checked={selectedCategories.includes(category)}
												onChange={(checked) => handleCategoryChange(category, checked)}
											>
												{category}
											</Tag.CheckableTag>
										))}
									</Card>
								)
							}
							{
								! loading && userPreferences?.authors && (
									<Card title="Authors" className="shadow">
										{userPreferences?.authors?.map((author) => (
											<Tag.CheckableTag
												key={author}
												checked={selectedAuthors.includes(author)}
												onChange={(checked) => handleAuthorChange(author, checked)}
											>
												{author}
											</Tag.CheckableTag>
										))}
									</Card>
								)
							}
							{
								! loading && userPreferences?.sources && (
									<Card title="Sources" className="shadow">
										{userPreferences?.sources?.map((source) => (
											<Tag.CheckableTag
												key={source}
												checked={selectedSources.includes(source)}
												onChange={(checked) => handleSourceChange(source, checked)}
											>
												{source}
											</Tag.CheckableTag>
										))}
									</Card>
								)
							}
						</Flex>
						<Divider />
						<Button type="primary" onClick={handleSave}>Save Preferences!</Button>
					</Content>
				</Layout>
			</Content>
			<WebFooter />
		</Layout>
	);
};

export default PreferencesPage;

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
