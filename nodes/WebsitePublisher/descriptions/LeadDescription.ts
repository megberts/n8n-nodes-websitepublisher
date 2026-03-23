import type { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['lead'] } },
		options: [
			{
				name: 'Get Leads',
				value: 'getLeads',
				description: 'Retrieve leads with optional filters',
				routing: {
					request: {
						method: 'POST',
						url: '=/iapi/project/{{$credentials.projectId}}/leads/get-leads',
					},
				},
				action: 'Get leads',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				description: 'Update the status of a lead (new → contacted → converted)',
				routing: {
					request: {
						method: 'POST',
						url: '=/iapi/project/{{$credentials.projectId}}/leads/update-status',
					},
				},
				action: 'Update lead status',
			},
		],
		default: 'getLeads',
	},
];

export const leadFields: INodeProperties[] = [
	// ── Get Leads: filters ──
	{
		displayName: 'Filters',
		name: 'leadFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['lead'], operation: ['getLeads'] } },
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'New', value: 'new' },
					{ name: 'Contacted', value: 'contacted' },
					{ name: 'Converted', value: 'converted' },
				],
				default: '',
				description: 'Filter by lead status',
				routing: { send: { type: 'body', property: 'status' } },
			},
			{
				displayName: 'Form Name',
				name: 'formName',
				type: 'string',
				default: '',
				description: 'Filter by the form that captured the lead',
				routing: { send: { type: 'body', property: 'form_name' } },
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2026-01-01',
				description: 'Filter leads from this date (YYYY-MM-DD)',
				routing: { send: { type: 'body', property: 'date_from' } },
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2026-12-31',
				description: 'Filter leads until this date (YYYY-MM-DD)',
				routing: { send: { type: 'body', property: 'date_to' } },
			},
			{
				displayName: 'Page Number',
				name: 'page',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 1,
				description: 'Page number for pagination',
				routing: { send: { type: 'body', property: 'page' } },
			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 25,
				description: 'Number of leads per page (max 100)',
				routing: { send: { type: 'body', property: 'per_page' } },
			},
		],
	},
	// ── Update Status: lead ID ──
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'number',
		required: true,
		default: 0,
		description: 'ID of the lead to update',
		displayOptions: { show: { resource: ['lead'], operation: ['updateStatus'] } },
		routing: { send: { type: 'body', property: 'lead_id' } },
	},
	// ── Update Status: new status ──
	{
		displayName: 'New Status',
		name: 'newStatus',
		type: 'options',
		required: true,
		options: [
			{ name: 'New', value: 'new' },
			{ name: 'Contacted', value: 'contacted' },
			{ name: 'Converted', value: 'converted' },
		],
		default: 'contacted',
		description: 'The new status for this lead',
		displayOptions: { show: { resource: ['lead'], operation: ['updateStatus'] } },
		routing: { send: { type: 'body', property: 'status' } },
	},
];
