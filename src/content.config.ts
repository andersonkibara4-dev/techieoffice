import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const authorSchema = z
	.union([
		z.string(),
		z.object({
			name: z.string(),
			role: z.string().default("Workspace Architect"),
			avatar: z.string().optional(),
		}),
	])
	.optional()
	.transform((value) => {
		if (!value) return undefined;
		if (typeof value === "string") {
			return { name: value, role: "Workspace Architect", avatar: "" };
		}
		return value;
	});

const imageUrlSchema = z.union([z.string().url(), z.string()]);

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
	schema: z
		.object({
			title: z.string().max(70).default("Untitled article"),
			description: z.string().max(220).default(""),
			pubDate: z.coerce.date().optional(),
			publishDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: imageUrlSchema.optional(),
			image: imageUrlSchema.optional(),
			category: z.string().default("Desk Setups"),
			author: authorSchema,
			readTime: z.string().optional(),
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
		})
		.transform((data) => ({
			...data,
			pubDate: data.pubDate ?? data.publishDate ?? new Date(0),
			heroImage: data.heroImage ?? data.image ?? "/images/placeholder.jpg",
		})),
});

export const collections = { blog: blogCollection };
