import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../../')

dotenv.config({ path: path.join(rootDir, '.env.local') })
dotenv.config({ path: path.join(rootDir, '.env') })

console.log('PAYLOAD_SECRET is loaded:', !!process.env.PAYLOAD_SECRET)

import fs from 'node:fs'
import { getPayload } from 'payload'

type LexicalRoot = Record<string, unknown> & {
	root: {
		type: string
		children: { [k: string]: unknown; type: string; version: number }[]
		direction: 'ltr' | 'rtl' | null
		format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
		indent: number
		version: number
	}
}

/** Turns plain paragraphs into Lexical rich text. */
function toLexical(text: string | string[]): LexicalRoot {
	const paragraphs = Array.isArray(text) ? text : [text]
	return {
		root: {
			type: 'root',
			format: '',
			indent: 0,
			version: 1,
			direction: 'ltr',
			children: paragraphs.map((paragraph) => ({
				type: 'paragraph',
				format: '',
				indent: 0,
				version: 1,
				direction: 'ltr',
				children: [
					{
						mode: 'normal',
						text: paragraph,
						type: 'text',
						style: '',
						detail: 0,
						format: 0,
						version: 1,
					},
				],
			})),
		},
	}
}

async function run() {
	const { default: config } = await import('@payload-config')
	const payload = await getPayload({ config })

	// Optional path argument, e.g. `pnpm import:projects content/projects/wordball.json`
	const importFilePath = process.argv[2]
		? path.resolve(rootDir, process.argv[2])
		: path.join(__dirname, '../../projects-import.json')

	if (!fs.existsSync(importFilePath)) {
		console.error(`Import file not found at ${importFilePath}`)
		console.error('Pass a JSON file path, or create projects-import.json in the project root.')
		process.exit(1)
	}

	const rawData = fs.readFileSync(importFilePath, 'utf-8')
	interface ImportProject {
		title: string
		slug: string
		summary: string
		description?: string | string[]
		buildNotes?: string | string[]
		stage?: 'in-progress' | 'live' | 'archived'
		status?: 'published' | 'draft'
		liveUrl?: string
		repoUrl?: string
		featured?: boolean
		techStackSlugs?: string[]
		publishedDate?: string
	}

	let projectsToImport: ImportProject[]

	try {
		projectsToImport = JSON.parse(rawData)
	} catch (err) {
		console.error('Failed to parse projects-import.json. Ensure it is valid JSON.', err)
		process.exit(1)
	}

	if (!Array.isArray(projectsToImport)) {
		console.error('projects-import.json must contain an array of projects.')
		process.exit(1)
	}

	console.log(`Found ${projectsToImport.length} projects to import.`)

	for (const projectData of projectsToImport) {
		console.log(`Processing project: ${projectData.title}`)

		// Check if slug already exists to prevent duplicates
		const { docs: existingProjects } = await payload.find({
			collection: 'projects',
			where: { slug: { equals: projectData.slug } },
			limit: 1,
		})

		if (existingProjects.length > 0) {
			console.log(`  ⚠️ Project with slug '${projectData.slug}' already exists. Skipping.`)
			continue
		}

		// Process techStack
		const techIds: number[] = []
		if (projectData.techStackSlugs && Array.isArray(projectData.techStackSlugs)) {
			for (const slug of projectData.techStackSlugs) {
				const { docs: techs } = await payload.find({
					collection: 'technologies',
					where: { slug: { equals: slug } },
					limit: 1,
				})
				if (techs.length > 0) {
					techIds.push(techs[0].id)
				} else {
					console.warn(`  ⚠️ Warning: Technology slug '${slug}' not found in DB. Skipping.`)
				}
			}
		}

		const lexicalDescription = projectData.description ? toLexical(projectData.description) : null
		const lexicalBuildNotes = projectData.buildNotes ? toLexical(projectData.buildNotes) : null

		try {
			await payload.create({
				collection: 'projects',
				data: {
					title: projectData.title,
					slug: projectData.slug,
					summary: projectData.summary,
					status: projectData.status || 'draft',
					liveUrl: projectData.liveUrl,
					repoUrl: projectData.repoUrl,
					featured: projectData.featured || false,
					techStack: techIds,
					...(projectData.stage ? { stage: projectData.stage } : {}),
					...(lexicalDescription ? { description: lexicalDescription } : {}),
					...(lexicalBuildNotes ? { buildNotes: lexicalBuildNotes } : {}),
					...(projectData.publishedDate ? { publishedDate: projectData.publishedDate } : {}),
				},
			})
			console.log(`  ✅ Successfully imported: ${projectData.title}`)
		} catch (err) {
			console.error(`  ❌ Failed to import: ${projectData.title}`, err)
		}
	}

	console.log('Import complete.')
	process.exit(0)
}

run()
