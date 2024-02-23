import { buyStock } from '$lib/api/stocks';
import { createTransaction, getTransactionsByUser } from '$lib/api/transactions';
import type { InsertStock } from '$lib/db/schemes/stock';
import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { topUpSchema } from './schema';

export async function load() {
	return {
		transactions: await getTransactionsByUser(1),
		form: await superValidate(zod(topUpSchema))
	};
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(topUpSchema));

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
		await createTransaction({ userId: 1, amount: '' + parsed, description: 'Account top up' });
		return {
			form,
			transactions: await getTransactionsByUser(1)
		};
	}
};
