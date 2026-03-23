import type {
	IPollFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class WebsitePublisherTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WebsitePublisher Trigger',
		name: 'websitePublisherTrigger',
		icon: 'file:websitepublisher.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '=New {{$parameter["triggerEvent"]}}',
		description:
			'Triggers when new leads are captured on your WebsitePublisher.ai website. Polls the leads API at the configured interval.',
		defaults: {
			name: 'WebsitePublisher Trigger',
		},
		polling: true,
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'websitePublisherApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Trigger Event',
				name: 'triggerEvent',
				type: 'options',
				options: [
					{
						name: 'New Lead',
						value: 'newLead',
						description: 'Trigger when a new lead is captured from a form submission',
					},
				],
				default: 'newLead',
				required: true,
			},
			{
				displayName: 'Form Name Filter',
				name: 'formNameFilter',
				type: 'string',
				default: '',
				description:
					'Only trigger for leads from this specific form. Leave empty for all forms.',
			},
		],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const credentials = await this.getCredentials('websitePublisherApi');
		const projectId = credentials.projectId as string;
		const apiToken = credentials.apiToken as string;
		const formNameFilter = this.getNodeParameter('formNameFilter', '') as string;

		// Get the last poll date from workflow static data
		const workflowStaticData = this.getWorkflowStaticData('node');
		const lastPollDate = (workflowStaticData.lastPollDate as string) || '';

		// Build request body
		const body: Record<string, unknown> = {
			page: 1,
			per_page: 100,
			status: 'new',
		};

		if (lastPollDate) {
			body.date_from = lastPollDate;
		}

		if (formNameFilter) {
			body.form_name = formNameFilter;
		}

		// Call the leads API
		const response = await this.helpers.httpRequest({
			method: 'POST',
			url: `https://api.websitepublisher.ai/iapi/project/${projectId}/leads/get-leads`,
			headers: {
				Authorization: `Bearer ${apiToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body,
			json: true,
		});

		// Update the last poll timestamp
		const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
		workflowStaticData.lastPollDate = now;

		// Extract leads from response
		const leads = response?.result?.data || response?.data || [];

		if (!Array.isArray(leads) || leads.length === 0) {
			return null;
		}

		// Filter out leads we've already seen (by ID)
		const lastSeenId = (workflowStaticData.lastSeenId as number) || 0;
		const newLeads = leads.filter(
			(lead: Record<string, unknown>) => (lead.id as number) > lastSeenId,
		);

		if (newLeads.length === 0) {
			return null;
		}

		// Update the highest seen ID
		const maxId = Math.max(...newLeads.map((l: Record<string, unknown>) => l.id as number));
		workflowStaticData.lastSeenId = maxId;

		// Return new leads as execution items
		const returnData = newLeads.map(
			(lead: Record<string, unknown>) => ({
				json: lead,
			} as INodeExecutionData),
		);

		return [returnData];
	}
}
