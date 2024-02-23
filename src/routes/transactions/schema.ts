import { z } from 'zod';

// Define outside the load function so the adapter can be cached
export const topUpSchema = z.object({
	amount: z
		.string()
		.min(1)
		.refine((value) => /^\d*\.?\d+$/.test(value), 'Invalid number')
});

export type TopFormUpSchema = typeof topUpSchema;
