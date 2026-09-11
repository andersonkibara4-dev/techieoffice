import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string().max(70),
		description: z.string().max(160),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string(),
		category: z.enum(["Desk Setups", "Organization", "Ergonomics", "Lighting"]),
		author: z.object({
			name: z.string(),
			role: z.string().default("Workspace Architect"),
			avatar: z.string(),
		}),
		readTime: z.string(),
		featured: z.boolean().default(false),
		productCount: z.number().default(0),
		topProduct: z
			.object({
				name: z.string(),
				rating: z.number().min(0).max(5),
				price: z.string(),
				amazonUrl: z.string().url(),
			})
			.optional(),
	}),
});

export const collections = { blog: blogCollection };
