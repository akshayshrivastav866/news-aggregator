import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import 'scss/index.scss';

const seoProps: { [key: string]: string } = {
	title: 'Pro news feed - Your customized news feed!',
	description: '',
	keywords: '',
};

const ContactPage: React.FC<PageProps> = () => {
	return (
		<div>
			feed
		</div>
	);
};

export default ContactPage;

export const Head: HeadFC = () => <title>{seoProps?.title}</title>;
