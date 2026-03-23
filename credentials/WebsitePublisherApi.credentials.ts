import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WebsitePublisherApi implements ICredentialType {
	name = 'websitePublisherApi';
	displayName = 'WebsitePublisher API';
	documentationUrl = 'https://www.websitepublisher.ai/docs/papi';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your WebsitePublisher API token (starts with wpa_). Find it in your dashboard at dashboard.websitepublisher.ai.',
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			required: true,
			description:
				'Default project ID. Find it in your dashboard. Can be overridden per node action.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.websitepublisher.ai',
			url: '=/papi/project/{{$credentials.projectId}}/pages',
			method: 'GET',
		},
	};
}
