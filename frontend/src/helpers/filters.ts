export const filters = [
	{
		key: 'categories',
		label: 'Categories',
		children: [
			{ key: 'general', label: 'General' },
			{ key: 'health', label: 'Health' },
			{ key: 'business', label: 'Business' },
		],
	},
	{
		key: 'sources',
		label: 'Sources',
		children: [
			{ key: '4', label: '1 source' },
			{ key: '5', label: '2 source' },
			{ key: '6', label: '3 source' },
		],
	},
	{
		key: 'authors',
		label: 'Authors',
		children: [
			{ key: '1', label: 'abc' },
			{ key: '2', label: 'asd' },
			{ key: '3', label: 'sdjhsdf' },
		],
	}
];

export const openKeys = ['authors', 'sources', 'categories' ];
