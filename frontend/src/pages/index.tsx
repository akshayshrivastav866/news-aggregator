import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import 'scss/index.scss';

const seoProps: { [ key: string ]: string } = {
	title: 'Pro News Feed - News just as you want!!',
	description: '',
	keywords: '',
};

const IndexPage: React.FC<PageProps> = () => {
	return (
		<div>
			hi
		</div>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>{ seoProps?.title }</title>;
