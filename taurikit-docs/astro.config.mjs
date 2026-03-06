// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.taurikit.dev',
	integrations: [
		starlight({
			title: 'TauriKit',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/tCoOpy/taurikit' }],
			customCss: [],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Auth Providers', slug: 'guides/auth' },
						{ label: 'UI Frameworks', slug: 'guides/ui' },
						{ label: 'Settings System', slug: 'guides/settings' },
						{ label: 'Auto-Updates', slug: 'guides/auto-updates' },
						{ label: 'Custom Title Bar', slug: 'guides/title-bar' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI Commands', slug: 'reference/cli' },
						{ label: 'Project Structure', slug: 'reference/structure' },
						{ label: 'Configuration', slug: 'reference/config' },
					],
				},
			],
		}),
	],
});
