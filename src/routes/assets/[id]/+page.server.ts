import { fail, type Actions, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { buySchema, type BuyFormSchema } from './schema';

import type { PageServerLoad } from './$types';
import { buyStock, getStocksBySecurity, sellStock } from '$lib/api/stocks';
import type { InsertStock, Stock } from '$lib/db/schemes/stock';
import { getSecurityByid } from '$lib/api/securities';
import { get } from 'svelte/store';

export const load: PageServerLoad = async ({ params }) => {
	return {
		form: await superValidate(zod(buySchema)),
		security: await getSecurityByid(+params.id),
		asset: await getStocksBySecurity(+params.id, 1)
	};
};

export const actions: Actions = {
	buy: async (event) => {
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
		throw redirect(300, '/assets');
	},
	sell: async (event) => {
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
		await sellStock(params);

		throw redirect(300, '/assets');
	}
};
