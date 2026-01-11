import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(4, "At least 4 characters required!"),
    description: z.string().min(4, "At least 4 characters required!"),
    price: z.number(),
    image: z.instanceof(File).optional(),
    category: z.enum({
        ELECTRONICS: 'ELECTRONICS',
        FASHION: 'FASHION',
        HOME: 'HOME',
        BEAUTY: 'BEAUTY',
        SPORTS: 'SPORTS',
        AUTOMOTIVE: 'AUTOMOTIVE',
        BOOKS: 'BOOKS',
        MUSIC: 'MUSIC',
    }),
    rating: z.number().min(0).max(5).optional(),
    stock: z.number().min(0),
    discount: z.number().min(0).max(100).optional(),
});

export type ProductFormInputType = z.infer<typeof productSchema>;