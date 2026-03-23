# n8n-nodes-websitepublisher

![n8n community node](https://img.shields.io/badge/n8n-community%20node-ff6d5a)
![npm version](https://img.shields.io/npm/v/n8n-nodes-websitepublisher)
![license](https://img.shields.io/npm/l/n8n-nodes-websitepublisher)

This is an n8n community node for **[WebsitePublisher.ai](https://websitepublisher.ai)** — The AI Web Platform. Build and manage AI-powered websites directly from your n8n automation workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## What is WebsitePublisher.ai?

WebsitePublisher.ai is infrastructure that enables AI assistants (Claude, ChatGPT, Gemini, Copilot, and 9+ platforms) to publish complete websites directly via API — no WordPress, no hosting setup, no CMS configuration. This n8n node brings that same power to event-driven automation workflows.

## Features

### WebsitePublisher Node (Action)

| Resource | Operations | API Layer |
|----------|-----------|-----------|
| **Page** | Create, Get, Update, Delete, List | PAPI |
| **Asset** | Upload, Get, Delete, List | PAPI |
| **Entity** | Create, Delete, Get Schema, List | MAPI |
| **Record** | Create, Get, Update, Delete, List, Search | MAPI |
| **Lead** | Get Leads, Update Status | IAPI |
| **Form** | Configure | SAPI |
| **Integration** | Execute, List | IAPI |
| **Project** | Get Status, List Projects | PAPI |

### WebsitePublisher Trigger

Polls for new leads captured on your website. Configurable per form with adjustable polling interval.

## Installation

### n8n Cloud / Desktop

1. Go to **Settings → Community Nodes**
2. Enter `n8n-nodes-websitepublisher`
3. Click **Install**

### Self-hosted (npm)

```bash
cd ~/.n8n
npm install n8n-nodes-websitepublisher
```

Then restart n8n.

### Self-hosted (Docker)

Add to your Dockerfile:

```dockerfile
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-websitepublisher
```

## Setup

1. Sign up at [dashboard.websitepublisher.ai](https://dashboard.websitepublisher.ai)
2. Create a project and copy your **API Token** (starts with `wpa_`) and **Project ID**
3. In n8n, go to **Credentials → New → WebsitePublisher API**
4. Enter your API Token and Project ID
5. Click **Test** to verify the connection

## Example Workflows

### Automatic Blog Publishing

```
Webhook (new post JSON)
  → WebsitePublisher: Create Record (entity: blogposts)
  → WebsitePublisher: Create Page (HTML from template)
  → Slack: Notify team
```

### Lead Notification Pipeline

```
WebsitePublisher Trigger (new lead)
  → WebsitePublisher: Update Lead Status → "contacted"
  → Slack: Post to #leads channel
  → Google Sheets: Append row
```

### Scheduled Content Update

```
Cron (every Monday 09:00)
  → HTTP Request: Fetch external product data
  → WebsitePublisher: List Records
  → Code: Compare and determine updates
  → WebsitePublisher: Update Records
  → WebsitePublisher: Update Page
```

### Multi-Site Content Syndication

```
Webhook (content update)
  → Split: For each project
  → WebsitePublisher: Update Page (same content to multiple projects)
```

An importable example workflow is included: see `example-workflow.json`.

## Resource Reference

### Pages (PAPI)

Create and manage HTML pages. Full SEO field support (title, description, keywords, robots directive). Supports regular pages and fragments.

| Field | Description |
|-------|-------------|
| Slug | Page path with `.html` extension (e.g. `index.html`, `blog/post1.html`) |
| HTML Content | Complete HTML document |
| SEO Options | Title, description, keywords, robots |
| Is Landing Page | Mark as the project's main page |

### Entities & Records (MAPI)

Entities are data models (like database tables). Records are rows in those tables.

**Entity property types:** `varchar` (max 255), `text` (unlimited), `int`, `datetime`, `tinyint` (boolean).

**Important:** Record endpoints use the **plural** entity name (e.g. `/blogposts` not `/blogpost`).

### Leads (IAPI)

Built-in lead capture from website forms. Filter by status (`new`, `contacted`, `converted`), form name, and date range.

### Forms (SAPI)

Configure contact forms on pages. Field types: `text`, `email`, `textarea`, `tel`, `select`, `checkbox`, `hidden`.

**Important:** `configure_form` requires ALL fields on every call — no partial updates.

### Integrations (IAPI)

Execute any configured integration. Use the **List** operation first to discover available services and endpoints for your project.

## Compatibility

- **n8n version:** 1.0.0+
- **Node.js:** 18+

## Documentation

- [WebsitePublisher.ai Docs](https://www.websitepublisher.ai/docs/papi)
- [SKILL.md](https://www.websitepublisher.ai/skill.md) — AI agent skill reference
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## Development

```bash
# Clone the repo
git clone https://github.com/megberts/n8n-nodes-websitepublisher.git
cd n8n-nodes-websitepublisher

# Install dependencies
npm install

# Build
npm run build

# Link to local n8n for testing
npm link
cd ~/.n8n
npm link n8n-nodes-websitepublisher

# Watch mode
npm run dev
```

## License

[MIT](LICENSE.md)

## About

Built by [M25](https://m25.nl) — the company behind WebsitePublisher.ai.
