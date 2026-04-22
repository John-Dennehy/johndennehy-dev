import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../../')

dotenv.config({ path: path.join(rootDir, '.env.local') })
dotenv.config({ path: path.join(rootDir, '.env') })

console.log('PAYLOAD_SECRET is loaded:', !!process.env.PAYLOAD_SECRET)

import { getPayload } from 'payload'
import fs from 'node:fs'

async function run() {
	const { default: config } = await import('@payload-config')
	const payload = await getPayload({ config })

	const importFilePath = path.join(__dirname, '../../projects-import.json')

	if (!fs.existsSync(importFilePath)) {
		console.error(`Import file not found at ${importFilePath}`)
		console.error('Please ensure projects-import.json exists in the root of the project.')
		process.exit(1)
	}

	const rawData = fs.readFileSync(importFilePath, 'utf-8')
	let projectsToImport: any[]

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

		// Process description into Lexical format
		let lexicalDescription = null
		if (projectData.description) {
			const paragraphs = Array.isArray(projectData.description)
				? projectData.description
				: [projectData.description]

			lexicalDescription = {
				root: {
					type: 'root',
					format: '',
					indent: 0,
					version: 1,
					children: paragraphs.map((text: string) => ({
						type: 'paragraph',
						format: '',
						indent: 0,
						version: 1,
						children: [
							{
								mode: 'normal',
								text: text,
								type: 'text',
								style: '',
								detail: 0,
								format: 0,
								version: 1,
							},
						],
						direction: 'ltr',
					})),
				},
			}
		}

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
					...(lexicalDescription ? { description: lexicalDescription } : {}),
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
