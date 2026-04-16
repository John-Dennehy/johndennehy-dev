import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const requestHeaders = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers: requestHeaders })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] p-8 md:p-16 font-sans selection:bg-[#f5c2e7] selection:text-[#1e1e2e]">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-[#313244] pb-8">
          <img
            src="https://placehold.co/120x120/313244/cdd6f4/png?text=JD"
            alt="John Dennehy Placeholder"
            width={120}
            height={120}
            className="rounded-full border-2 border-[#b4befe] shadow-lg"
          />
          <div className="text-center md:text-left space-y-2 mt-2">
            <h1 className="text-4xl md:text-5xl font-bold text-[#b4befe] tracking-tight">
              John Dennehy
            </h1>
            <h2 className="text-xl text-[#a6adc8] font-medium">
              Software Engineer | TypeScript, React, Next.js
            </h2>
          </div>
        </header>

        {/* Bio */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-[#bac2de]">
            Welcome to my digital sandbox. This site is currently under active development
            as a skills refresher, built on Next.js 16.2 and Payload CMS 3.0. It serves
            as both a portfolio and a transparent look at my engineering process.
          </p>
        </section>

        {/* Focus & Links Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-[#181825] p-6 rounded-xl border border-[#313244]">
            <h3 className="text-xl font-semibold text-[#89b4fa] mb-4">Current Focus</h3>
            <ul className="space-y-3 text-[#bac2de]">
              <li className="flex items-start gap-2">
                <span className="text-[#a6e3a1]">▹</span> Architecting unified deployment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#a6e3a1]">▹</span> Integrating serverless Postgres (Neon)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#a6e3a1]">▹</span> Functional programming patterns
              </li>
            </ul>
          </section>

          <section className="bg-[#181825] p-6 rounded-xl border border-[#313244] flex flex-col justify-center gap-6">
            <h3 className="text-xl font-semibold text-[#89b4fa]">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com/john-dennehy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 text-center py-2 px-4 bg-[#313244] hover:bg-[#45475a] text-[#cdd6f4] rounded-lg transition-colors font-medium"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/johnfdennehy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 text-center py-2 px-4 bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b] rounded-lg transition-colors font-medium"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>

        {/* Payload Status */}
        <section className="border-t border-[#313244] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#a6adc8]">
           <div className="flex items-center gap-3">
             <Image alt="Payload Logo" height={20} src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" width={20} />
             <span>
               {user ? `Authenticated as ${user.email}` : 'Payload CMS 3.0 Ready'}
             </span>
           </div>
           <div className="flex gap-4">
             <a href={payloadConfig.routes.admin} className="hover:text-[#89b4fa] transition-colors border-b border-transparent hover:border-[#89b4fa]">Admin Panel</a>
             <a href={fileURL} className="hover:text-[#89b4fa] transition-colors border-b border-transparent hover:border-[#89b4fa]">Edit Code</a>
           </div>
        </section>

      </div>
    </main>
  )
}