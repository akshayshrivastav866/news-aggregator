import React from 'react';
import type { PageProps } from 'gatsby';
import { Layout } from 'antd';

const { Footer } = Layout;

import './index.scss';

const WebFooter: React.FC<PageProps> = () => {
	return (
		<div className="feeds-footer">
			<Footer className="feeds-footer__wrapper border-radius shadow">
				©{new Date().getFullYear()} Created by Akshay Shrivastav
				<br />
				I hope you love this customized news feed!
			</Footer>
		</div>
	);
};

export default WebFooter;
