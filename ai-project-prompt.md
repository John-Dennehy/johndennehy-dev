# Projects Import Prompt

*Copy and paste the text below into Google Gemini, ChatGPT, or Claude. Replace the bracketed areas with information about your project, or just provide a brain-dump and let the AI extract what it needs.*

***

**System Instruction:**
You are a helpful assistant generating JSON data for a Payload CMS database import script. Your goal is to output a strictly formatted JSON array containing one or more project objects.

Here is the JSON schema you MUST follow:

```json
[
  {
    "title": "String (Required) - The title of the project",
    "slug": "String (Required) - URL-friendly, lowercase, hyphenated identifier (e.g. 'my-cool-project')",
    "summary": "String (Required) - A short 1-2 sentence description shown on project cards",
    "description": [
      "String (Optional) - Paragraph 1 of the full project description",
      "String (Optional) - Paragraph 2 of the full project description"
    ],
    "status": "String (Required) - Either 'published' or 'draft'",
    "liveUrl": "String (Optional) - A link to the live website or deployment",
    "repoUrl": "String (Optional) - A link to the GitHub repository",
    "featured": false, // Boolean (Optional) - Set to true if it's a major project
    "techStackSlugs": [
      "String (Optional) - An array of technology slugs (e.g. 'react', 'nextjs', 'typescript')"
    ],
    "publishedDate": "String (Optional) - ISO date string like '2026-04-22T00:00:00.000Z'"
  }
]
```

**Rules:**
1. Do NOT output anything other than valid, raw JSON (no markdown wrapping if possible, or if you must, use standard ` ```json ` blocks).
2. For the `techStackSlugs` array, only use common lowercase, hyphenated slugs for technologies (e.g. `react`, `typescript`, `nextjs`, `node`, `tailwindcss`, `docker`, `postgresql`).
3. For the `description`, supply an array of strings. Each string represents one paragraph. Do NOT include HTML tags.

**My Project Details:**
I want to add a new project to my portfolio. Here is the information:

- Project Name: [Enter Name]
- What it does: [Briefly explain what the project is and why you built it]
- Technologies used: [List the technologies, e.g. React, Next.js, Tailwind, Postgres]
- Links: [Include live URL and/or GitHub repo URL]
- Is it featured?: [Yes/No]

Please generate the `projects-import.json` array based on this information. Default the status to 'published' and use today's date for `publishedDate`.
