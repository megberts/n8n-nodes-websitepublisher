import type { INodeProperties } from 'n8n-workflow';

export const integrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['integration'] } },
		options: [
			{
				name: 'Execute',
				value: 'execute',
				description: 'Execute an integration endpoint (e.g. Resend email, Mollie payment)',
				routing: {
					request: {
						method: 'POST',
						url: '=/iapi/project/{{$credentials.projectId}}/{{$parameter.serviceName}}/{{$parameter.endpointName}}',
					},
				},
				action: 'Execute an integration',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all available integrations for this project',
				routing: {
					request: {
						method: 'GET',
						url: '=/iapi/project/{{$credentials.projectId}}/integrations',
					},
				},
				action: 'List integrations',
			},
		],
		default: 'list',
	},
];

export const integrationFields: INodeProperties[] = [
	// ── Service name ──
	{
		displayName: 'Service',
		name: 'serviceName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'resend',
		description:
			'Integration service name (e.g. "resend", "mollie", "leads"). Use "List" to see available services.',
		displayOptions: { show: { resource: ['integration'], operation: ['execute'] } },
	},
	// ── Endpoint name ──
	{
		displayName: 'Endpoint',
		name: 'endpointName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'send-email',
		description:
			'Endpoint name within the service (e.g. "send-email", "create-payment"). Use "List" to see available endpoints.',
		displayOptions: { show: { resource: ['integration'], operation: ['execute'] } },
	},
	// ── Input data ──
	{
		displayName: 'Input Data (JSON)',
		name: 'inputData',
		type: 'json',
		required: true,
		default: '{}',
		description:
			'JSON input for the integration endpoint. Schema depends on the service/endpoint combination.',
		displayOptions: { show: { resource: ['integration'], operation: ['execute'] } },
		routing: { send: { type: 'body', property: '' } },
	},
];
