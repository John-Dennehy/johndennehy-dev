import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
	slug: 'contact-messages',
	defaultSort: '-createdAt',
	admin: {
		useAsTitle: 'subject',
		defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
		group: 'Content',
	},
	access: {
		// Anyone can send a message
		create: () => true,
		// Only authenticated users can read/update/delete messages
		read: ({ req: { user } }) => Boolean(user),
		update: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
	},
	hooks: {
		beforeValidate: [
			({ data }) => {
				// Honeypot spam protection
				if (data?.website && String(data.website).trim().length > 0) {
					throw new Error('Spam detected.')
				}
				return data
			},
		],
		afterChange: [
			async ({ doc, req, operation }) => {
				if (operation === 'create') {
					const contactEmail = process.env.CONTACT_EMAIL || 'john@johndennehy.dev'

					// 1. Send notification to John
					try {
						await req.payload.sendEmail({
							to: contactEmail,
							replyTo: doc.email,
							subject: `New Message: ${doc.subject}`,
							html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0f; color: #f0f0f5; padding: 40px; border-radius: 16px;">
                  <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 30px;">
                    <h1 style="margin: 0; color: #6366f1; font-size: 24px;">New Contact Form Submission</h1>
                  </div>
                  <div style="background-color: #111119; padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 15px 0;"><strong style="color: #6366f1;">From:</strong> ${doc.name} (${doc.email})</p>
                    <p style="margin: 0 0 15px 0;"><strong style="color: #6366f1;">Subject:</strong> ${doc.subject}</p>
                    <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.05);">
                      <p style="margin: 0 0 10px 0; color: #a0a0b8; font-size: 14px; text-transform: uppercase; font-weight: bold;">Message Content</p>
                      <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${doc.message}</p>
                    </div>
                  </div>
                  <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #5a5a72;">
                    <p>This message was sent from the contact form on johndennehy.dev</p>
                  </div>
                </div>
              `,
						})
					} catch (error) {
						req.payload.logger.error({ err: error }, 'Error sending contact email notification')
					}

					// 2. Send auto-responder to the sender
					try {
						await req.payload.sendEmail({
							to: doc.email,
							subject: `Thanks for reaching out!`,
							html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; padding: 40px; line-height: 1.6;">
                  <h1 style="color: #6366f1; font-size: 24px;">Hello ${doc.name.split(' ')[0]},</h1>
                  <p>Thanks for reaching out! I've received your message regarding <strong>"${doc.subject}"</strong> and I'll get back to you as soon as I can.</p>
                  <p>In the meantime, feel free to check out my latest projects on my <a href="${process.env.NEXT_PUBLIC_SERVER_URL || 'https://johndennehy.dev'}" style="color: #6366f1; text-decoration: none; font-weight: bold;">portfolio</a> or connect with me on <a href="https://linkedin.com/in/johnfdennehy" style="color: #6366f1; text-decoration: none; font-weight: bold;">LinkedIn</a>.</p>
                  <p style="margin-top: 40px;">Best regards,<br><strong>John Dennehy</strong></p>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;">
                  <p style="font-size: 12px; color: #999;">This is an automated confirmation that your message has been received.</p>
                </div>
              `,
						})
					} catch (error) {
						req.payload.logger.error({ err: error }, 'Error sending contact auto-responder')
					}
				}
			},
		],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			admin: {
				description: 'Name of the sender',
			},
		},
		{
			name: 'email',
			type: 'email',
			required: true,
			admin: {
				description: 'Email address of the sender',
			},
		},
		{
			name: 'subject',
			type: 'text',
			required: true,
			admin: {
				description: 'Subject of the message',
			},
		},
		{
			name: 'message',
			type: 'textarea',
			required: true,
			admin: {
				description: 'The message content',
			},
		},
		{
			// Honeypot field
			name: 'website',
			type: 'text',
			admin: {
				description: 'Honeypot field — should always be empty. Filled = spam.',
				position: 'sidebar',
			},
		},
		{
			name: 'status',
			type: 'select',
			defaultValue: 'unread',
			options: [
				{ label: 'Unread', value: 'unread' },
				{ label: 'Read', value: 'read' },
				{ label: 'Replied', value: 'replied' },
			],
			admin: {
				position: 'sidebar',
			},
		},
	],
}
