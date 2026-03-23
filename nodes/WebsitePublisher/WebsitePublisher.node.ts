import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { pageOperations, pageFields } from './descriptions/PageDescription';
import { entityOperations, entityFields } from './descriptions/EntityDescription';
import { recordOperations, recordFields } from './descriptions/RecordDescription';
import { assetOperations, assetFields } from './descriptions/AssetDescription';
import { leadOperations, leadFields } from './descriptions/LeadDescription';
import { formOperations, formFields } from './descriptions/FormDescription';
import {
	integrationOperations,
	integrationFields,
} from './descriptions/IntegrationDescription';
import { projectOperations, projectFields } from './descriptions/ProjectDescription';

export class WebsitePublisher implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WebsitePublisher',
		name: 'websitePublisher',
		icon: 'file:websitepublisher.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Build and manage AI-powered websites via WebsitePublisher.ai. Create pages, manage data entities, upload assets, capture leads, configure forms, and execute integrations.',
		defaults: {
			name: 'WebsitePublisher',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'websitePublisherApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.websitepublisher.ai',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// ── Resource selector ──
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Asset',
						value: 'asset',
						description: 'Upload and manage files (images, CSS, JS)',
					},
					{
						name: 'Entity',
						value: 'entity',
						description: 'Manage data models (create/delete entity schemas)',
					},
					{
						name: 'Form',
						value: 'form',
						description: 'Configure contact forms on pages',
					},
					{
						name: 'Integration',
						value: 'integration',
						description: 'Execute third-party integrations (Resend, Mollie, etc.)',
					},
					{
						name: 'Lead',
						value: 'lead',
						description: 'Retrieve and manage captured leads',
					},
					{
						name: 'Page',
						value: 'page',
						description: 'Create and manage HTML pages',
					},
					{
						name: 'Project',
						value: 'project',
						description: 'Get project status and info',
					},
					{
						name: 'Record',
						value: 'record',
						description: 'CRUD operations on entity data records',
					},
				],
				default: 'page',
			},
			// ── Operations per resource ──
			...pageOperations,
			...entityOperations,
			...recordOperations,
			...assetOperations,
			...leadOperations,
			...formOperations,
			...integrationOperations,
			...projectOperations,
			// ── Fields per operation ──
			...pageFields,
			...entityFields,
			...recordFields,
			...assetFields,
			...leadFields,
			...formFields,
			...integrationFields,
			...projectFields,
		],
	};
}
