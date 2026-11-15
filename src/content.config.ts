//import utilities from astro:content
import { defineCollection } from 'astro:content';
//import the glob loader
import { glob } from 'astro/loaders';
//imort zod : a schema declaration and validation library for TypeScript
import { z } from 'astro/zod';

//define a 'loader' and 'schema' for each collection
const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: 
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
      author: z.string(),
			heroImage: z.object ({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
		}),
});
const sequence = defineCollection({
	loader: glob({ base: './src/content/sequences', pattern: '**/*.md'}),
	schema: 
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
      author: z.string(),
			category: z.string(),
      tags: z.array(z.string())
		}),
}

)

export const collections = { blog, sequence };