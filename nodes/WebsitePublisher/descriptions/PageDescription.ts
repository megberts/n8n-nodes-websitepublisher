import type { INodeProperties } from 'n8n-workflow';

export const pageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['page'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new HTML page',
				routing: {
					request: {
						method: 'POST',
						url: '=/papi/project/{{$credentials.projectId}}/pages',
					},
				},
				action: 'Create a page',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a page by slug',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/papi/project/{{$credentials.projectId}}/pages/{{$parameter.slug}}',
					},
				},
				action: 'Delete a page',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a page by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/papi/project/{{$credentials.projectId}}/pages/{{$parameter.slug}}',
					},
				},
				action: 'Get a page',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all pages in the project',
				routing: {
					request: {
						method: 'GET',
						url: '=/papi/project/{{$credentials.projectId}}/pages',
					},
				},
				action: 'List all pages',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing page (full replace)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/papi/project/{{$credentials.projectId}}/pages/{{$parameter.slug}}',
					},
				},
				action: 'Update a page',
			},
		],
		default: 'create',
	},
];

export const pageFields: INodeProperties[] = [
	// ── Slug for create ──
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'index.html',
		description:
			'Page slug including .html extension (e.g. "index.html", "about.html", "blog/post1.html")',
		displayOptions: { show: { resource: ['page'], operation: ['create'] } },
		routing: { send: { type: 'body', property: 'slug' } },
	},
	// ── Slug for get/update/delete ──
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'about.html',
		description: 'Page slug to retrieve, update, or delete',
		displayOptions: { show: { resource: ['page'], operation: ['get', 'update', 'delete'] } },
	},
	// ── HTML Content ──
	{
		displayName: 'HTML Content',
		name: 'content',
		type: 'string',
		typeOptions: { rows: 15 },
		required: true,
		default: '',
		description: 'Full HTML content of the page (complete document with DOCTYPE)',
		displayOptions: { show: { resource: ['page'], operation: ['create', 'update'] } },
		routing: { send: { type: 'body', property: 'content' } },
	},
	// ── Meta fields ──
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Page title shown in the WebSumo builder menu',
		displayOptions: { show: { resource: ['page'], operation: ['create', 'update'] } },
		routing: { send: { type: 'body', property: 'meta.title' } },
	},
	{
		displayName: 'Is Landing Page',
		name: 'isLandingPage',
		type: 'boolean',
		default: false,
		description: 'Whether this page is the main landing page of the project',
		displayOptions: { show: { resource: ['page'], operation: ['create', 'update'] } },
		routing: { send: { type: 'body', property: 'meta.landingpage' } },
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		placeholder: 'en',
		description: 'ISO language code for this page (e.g. "en", "nl", "de")',
		displayOptions: { show: { resource: ['page'], operation: ['create', 'update'] } },
		routing: { send: { type: 'body', property: 'meta.language' } },
	},
	// ── SEO fields ──
	{
		displayName: 'SEO Options',
		name: 'seoOptions',
		type: 'collection',
		placeholder: 'Add SEO Field',
		default: {},
		displayOptions: { show: { resource: ['page'], operation: ['create', 'update'] } },
		options: [
			{
				displayName: 'SEO Title',
				name: 'seotitle',
				type: 'string',
				default: '',
				description:
					'Browser tab / search result title. Overrides AI-generated <title> when PAPI SEO is set.',
				routing: { send: { type: 'body', property: 'seo.title' } },
			},
			{
				displayName: 'SEO Description',
				name: 'seodescription',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				description: 'Meta description for search engines (max ~160 characters)',
				routing: { send: { type: 'body', property: 'seo.description' } },
			},
			{
				displayName: 'SEO Keywords',
				name: 'seokeywords',
				type: 'string',
				default: '',
				description: 'Comma-separated keywords',
				routing: { send: { type: 'body', property: 'seo.keywords' } },
			},
			{
				displayName: 'Robots',
				name: 'seorobots',
				type: 'options',
				options: [
					{ name: 'Index, Follow', value: 'index, follow' },
					{ name: 'Index, No Follow', value: 'index, nofollow' },
					{ name: 'No Index, Follow', value: 'noindex, follow' },
					{ name: 'No Index, No Follow', value: 'noindex, nofollow' },
				],
				default: 'index, follow',
				description: 'Search engine indexing directive',
				routing: { send: { type: 'body', property: 'seo.robots' } },
			},
		],
	},
	// ── List filters ──
	{
		displayName: 'Page Type',
		name: 'pageType',
		type: 'options',
		options: [
			{ name: 'All Pages', value: '' },
			{ name: 'Regular Pages', value: 'page' },
			{ name: 'Fragments', value: 'fragment' },
		],
		default: '',
		description: 'Filter pages by type',
		displayOptions: { show: { resource: ['page'], operation: ['list'] } },
		routing: {
			send: { type: 'query', property: 'type' },
		},
	},
	// ── Project ID override ──
	{
		displayName: 'Project ID Override',
		name: 'projectIdOverride',
		type: 'string',
		default: '',
		description:
			'Override the default project ID from credentials. Leave empty to use the credential default.',
		displayOptions: { show: { resource: ['page'] } },
	},
];
