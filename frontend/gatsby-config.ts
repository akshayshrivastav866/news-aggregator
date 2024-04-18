import type { GatsbyConfig } from 'gatsby';

const path = require('path');

const config: GatsbyConfig = {
	siteMetadata: {
		title: 'news aggregator',
		siteUrl: 'https://www.akshayshrivastav.me',
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-image',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/assets/images/icon.png',
			},
			__key: 'manifest',
		},
		'gatsby-plugin-mdx',
		'gatsby-transformer-remark',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/assets/images/',
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages`,
			},
			__key: 'filesystem',
		},
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				resolveModules: [path.join(__dirname, 'node_modules')],
				root: path.join(__dirname, 'src'),
				scss: path.join(__dirname, 'src', 'scss'),
				components: path.join(__dirname, 'src', 'components'),
				images: path.join(__dirname, 'src', 'assets', 'images'),
			},
			__key: 'root-imports',
		},
		{
			resolve: 'gatsby-plugin-less',
		},
	],
};

export default config;
