import type { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['project'] } },
		options: [
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get the current status and page count of the project',
				routing: {
					request: {
						method: 'GET',
						url: '=/papi/project/{{$credentials.projectId}}/status',
					},
				},
				action: 'Get project status',
			},
			{
				name: 'List Projects',
				value: 'listProjects',
				description: 'List all projects accessible with this API token',
				routing: {
					request: {
						method: 'GET',
						url: '/papi/projects',
					},
				},
				action: 'List projects',
			},
		],
		default: 'getStatus',
	},
];

export const projectFields: INodeProperties[] = [];
