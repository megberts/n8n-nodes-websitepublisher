import type { INodeProperties } from 'n8n-workflow';

export const recordOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['record'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new record in an entity',
				routing: {
					request: {
						method: 'POST',
						url: '=/mapi/project/{{$credentials.projectId}}/{{$parameter.entityPlural}}',
					},
				},
				action: 'Create a record',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a record by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/mapi/project/{{$credentials.projectId}}/{{$parameter.entityPlural}}/{{$parameter.recordId}}',
					},
				},
				action: 'Delete a record',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single record by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/mapi/project/{{$credentials.projectId}}/{{$parameter.entityPlural}}/{{$parameter.recordId}}',
					},
				},
				action: 'Get a record',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List records with optional pagination',
				routing: {
					request: {
						method: 'GET',
						url: '=/mapi/project/{{$credentials.projectId}}/{{$parameter.entityPlural}}',
					},
				},
				action: 'List records',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search records with filters',
				routing: {
					request: {
						method: 'POST',
						url: '=/mapi/project/{{$credentials.projectId}}/{{$parameter.entityPlural}}/search',
					},
				},
				action: 'Search records',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing record',
				routing: {
					request: {
						method: 'PUT',
						url: '=/mapi/project/{{$credentials.projectId}}/{{$parameter.entityPlural}}/{{$parameter.recordId}}',
					},
				},
				action: 'Update a record',
			},
		],
		default: 'list',
	},
];

export const recordFields: INodeProperties[] = [
	// ── Entity plural name (all operations) ──
	{
		displayName: 'Entity (Plural)',
		name: 'entityPlural',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'blogposts',
		description:
			'Plural entity name for the REST endpoint. Important: use the PLURAL form (e.g. "blogposts", not "blogpost").',
		displayOptions: { show: { resource: ['record'] } },
	},
	// ── Record ID for get/update/delete ──
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		default: '',
		description: 'Numeric ID of the record',
		displayOptions: {
			show: { resource: ['record'], operation: ['get', 'update', 'delete'] },
		},
	},
	// ── Record data for create/update ──
	{
		displayName: 'Record Data (JSON)',
		name: 'recordData',
		type: 'json',
		required: true,
		default: '{}',
		description:
			'JSON object with field values matching the entity schema. Example: {"title": "My Post", "content": "Hello world"}',
		displayOptions: {
			show: { resource: ['record'], operation: ['create', 'update'] },
		},
		routing: { send: { type: 'body', property: '' } },
	},
	// ── Search filters ──
	{
		displayName: 'Search Filters (JSON)',
		name: 'searchFilters',
		type: 'json',
		required: true,
		default: '{}',
		description:
			'JSON search filter object. Example: {"field": "status", "operator": "=", "value": "published"}',
		displayOptions: { show: { resource: ['record'], operation: ['search'] } },
		routing: { send: { type: 'body', property: '' } },
	},
	// ── Pagination for list ──
	{
		displayName: 'Pagination',
		name: 'paginationOptions',
		type: 'collection',
		placeholder: 'Add Pagination',
		default: {},
		displayOptions: { show: { resource: ['record'], operation: ['list'] } },
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 25,
				description: 'Number of records per page (max 100)',
				routing: { send: { type: 'query', property: 'limit' } },
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: { minValue: 0 },
				default: 0,
				description: 'Number of records to skip',
				routing: { send: { type: 'query', property: 'offset' } },
			},
		],
	},
];
