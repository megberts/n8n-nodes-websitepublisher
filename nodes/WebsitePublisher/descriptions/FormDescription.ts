import type { INodeProperties } from 'n8n-workflow';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['form'] } },
		options: [
			{
				name: 'Configure',
				value: 'configure',
				description:
					'Configure a contact form on a page. Important: always send ALL fields — no partial updates.',
				routing: {
					request: {
						method: 'POST',
						url: '=/sapi/project/{{$credentials.projectId}}/forms',
					},
				},
				action: 'Configure a form',
			},
		],
		default: 'configure',
	},
];

export const formFields: INodeProperties[] = [
	// ── Page slug ──
	{
		displayName: 'Page Slug',
		name: 'pageSlug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'contact.html',
		description: 'Slug of the page to attach the form to',
		displayOptions: { show: { resource: ['form'], operation: ['configure'] } },
		routing: { send: { type: 'body', property: 'page_slug' } },
	},
	// ── Fields (JSON) ──
	{
		displayName: 'Form Fields (JSON)',
		name: 'formFields',
		type: 'json',
		required: true,
		default:
			'[\n  {"name": "name", "type": "text", "required": true, "label": "Your Name"},\n  {"name": "email", "type": "email", "required": true, "label": "Email"},\n  {"name": "message", "type": "textarea", "required": true, "label": "Message"}\n]',
		description:
			'Array of field definitions. Types: text, email, textarea, tel, select, checkbox, hidden.',
		displayOptions: { show: { resource: ['form'], operation: ['configure'] } },
		routing: { send: { type: 'body', property: 'fields' } },
	},
	// ── Submit label ──
	{
		displayName: 'Submit Button Label',
		name: 'submitLabel',
		type: 'string',
		default: 'Send Message',
		description: 'Text for the submit button',
		displayOptions: { show: { resource: ['form'], operation: ['configure'] } },
		routing: { send: { type: 'body', property: 'submit_label' } },
	},
	// ── Success message ──
	{
		displayName: 'Success Message',
		name: 'successMessage',
		type: 'string',
		default: 'Thank you! We will get back to you shortly.',
		description: 'Message shown after successful submission',
		displayOptions: { show: { resource: ['form'], operation: ['configure'] } },
		routing: { send: { type: 'body', property: 'success_message' } },
	},
	// ── Notification email ──
	{
		displayName: 'Notification Email',
		name: 'notificationEmail',
		type: 'string',
		default: '',
		placeholder: 'hello@example.com',
		description: 'Email address to receive form submission notifications',
		displayOptions: { show: { resource: ['form'], operation: ['configure'] } },
		routing: { send: { type: 'body', property: 'notification_email' } },
	},
];
