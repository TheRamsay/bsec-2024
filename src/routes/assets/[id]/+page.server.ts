import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { buySchema, type BuyFormSchema } from './schema';

import type { PageServerLoad } from './$types';
import { buyStock } from '$lib/api/stocks';
import type { InsertStock } from '$lib/db/schemes/stock';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(buySchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(buySchema));

		const parsed = +form.data.amount;

		if (isNaN(parsed) || parsed <= 0) {
			return fail(400, {
				form,
				message: message(form, 'Please enter a valid amount')
			});
		}

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const params: InsertStock = {
			amount: parsed,
			securityId: +(event?.params?.id ?? 0),
			userId: 1
		};
		await buyStock(params);
		return {
			form
		};
	}
};
