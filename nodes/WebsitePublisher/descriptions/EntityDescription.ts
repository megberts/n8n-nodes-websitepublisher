import type { INodeProperties } from 'n8n-workflow';

export const entityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['entity'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new data entity (e.g. blogpost, product)',
				routing: {
					request: {
						method: 'POST',
						url: '=/mapi/project/{{$credentials.projectId}}/entities',
					},
				},
				action: 'Create an entity',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an entity and ALL its data (irreversible!)',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/mapi/project/{{$credentials.projectId}}/entities/{{$parameter.entityName}}',
					},
				},
				action: 'Delete an entity',
			},
			{
				name: 'Get Schema',
				value: 'getSchema',
				description: 'Get the schema definition of an entity',
				routing: {
					request: {
						method: 'GET',
						url: '=/mapi/project/{{$credentials.projectId}}/entities/{{$parameter.entityName}}/schema',
					},
				},
				action: 'Get entity schema',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all entities in the project',
				routing: {
					request: {
						method: 'GET',
						url: '=/mapi/project/{{$credentials.projectId}}/entities',
					},
				},
				action: 'List all entities',
			},
		],
		default: 'list',
	},
];

export const entityFields: INodeProperties[] = [
	// ── Entity name for create ──
	{
		displayName: 'Entity Name',
		name: 'entityName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'blogpost',
		description:
			'Singular name for the entity (lowercase, letters/numbers/underscores only). Example: "blogpost", "product", "team_member".',
		displayOptions: { show: { resource: ['entity'], operation: ['create'] } },
		routing: { send: { type: 'body', property: 'name' } },
	},
	// ── Entity name for schema/delete ──
	{
		displayName: 'Entity Name',
		name: 'entityName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'blogpost',
		description: 'Name of the entity to get schema for or delete',
		displayOptions: { show: { resource: ['entity'], operation: ['getSchema', 'delete'] } },
	},
	// ── Plural name ──
	{
		displayName: 'Plural Name',
		name: 'entityPlural',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'blogposts',
		description:
			'Plural name for the REST endpoint (e.g. "blogposts", "products"). This is used in record URLs.',
		displayOptions: { show: { resource: ['entity'], operation: ['create'] } },
		routing: { send: { type: 'body', property: 'plural' } },
	},
	// ── Properties (JSON) ──
	{
		displayName: 'Properties (JSON)',
		name: 'properties',
		type: 'json',
		required: true,
		default:
			'[\n  {"name": "title", "type": "varchar", "length": 255, "required": true},\n  {"name": "content", "type": "text", "required": false}\n]',
		description:
			'Array of property definitions. Types: varchar (max 255), text (unlimited), int, datetime, tinyint (boolean 0/1). Reserved names: id, created_at, updated_at.',
		displayOptions: { show: { resource: ['entity'], operation: ['create'] } },
		routing: { send: { type: 'body', property: 'properties' } },
	},
];
