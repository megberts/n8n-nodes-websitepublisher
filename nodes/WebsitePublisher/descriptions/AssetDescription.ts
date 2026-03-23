import type { INodeProperties } from 'n8n-workflow';

export const assetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['asset'] } },
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an asset by slug',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/papi/project/{{$credentials.projectId}}/assets/{{$parameter.assetSlug}}',
					},
				},
				action: 'Delete an asset',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get asset metadata by slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/papi/project/{{$credentials.projectId}}/assets/{{$parameter.assetSlug}}',
					},
				},
				action: 'Get an asset',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all assets in the project',
				routing: {
					request: {
						method: 'GET',
						url: '=/papi/project/{{$credentials.projectId}}/assets',
					},
				},
				action: 'List all assets',
			},
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload an asset (image, CSS, JS, etc.)',
				routing: {
					request: {
						method: 'POST',
						url: '=/papi/project/{{$credentials.projectId}}/assets',
					},
				},
				action: 'Upload an asset',
			},
		],
		default: 'list',
	},
];

export const assetFields: INodeProperties[] = [
	// ── Asset slug for get/delete ──
	{
		displayName: 'Asset Slug',
		name: 'assetSlug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'images/hero.jpg',
		description: 'Asset path/slug (e.g. "logo.png", "images/hero.jpg", "css/style.css")',
		displayOptions: {
			show: { resource: ['asset'], operation: ['get', 'delete'] },
		},
	},
	// ── Upload: slug ──
	{
		displayName: 'Asset Slug',
		name: 'assetSlug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'images/logo.png',
		description:
			'Target path for the uploaded asset (e.g. "images/logo.png"). Determines the URL path on CDN.',
		displayOptions: { show: { resource: ['asset'], operation: ['upload'] } },
		routing: { send: { type: 'body', property: 'slug' } },
	},
	// ── Upload: content (base64) ──
	{
		displayName: 'Content (Base64)',
		name: 'assetContent',
		type: 'string',
		typeOptions: { rows: 5 },
		required: true,
		default: '',
		description:
			'Base64-encoded file content. In n8n workflows, use an expression to read binary data from a previous node.',
		displayOptions: { show: { resource: ['asset'], operation: ['upload'] } },
		routing: { send: { type: 'body', property: 'content' } },
	},
	// ── Upload: alt text ──
	{
		displayName: 'Alt Text',
		name: 'assetAlt',
		type: 'string',
		default: '',
		description: 'Alternative text for images (accessibility / SEO)',
		displayOptions: { show: { resource: ['asset'], operation: ['upload'] } },
		routing: { send: { type: 'body', property: 'alt' } },
	},
];
