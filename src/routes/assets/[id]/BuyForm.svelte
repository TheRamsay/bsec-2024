<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buySchema, type BuyFormSchema } from './schema';

	export let data: SuperValidated<Infer<BuyFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(buySchema)
	});

	const { form: formData, enhance, message } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger>Buy</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Buy this stock</Dialog.Title>
		</Dialog.Header>
			<form method="POST" class="items-center justify-center max-w-lg mx-6 form-control" use:enhance>
				<Form.Field {form} name="amount">
					<Form.Control let:attrs>
						<Form.Label>Amount</Form.Label>
						<Input {...attrs} bind:value={$formData.amount} />
					</Form.Control>
					<Form.Description>Amount you want to buy</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			<Form.Button>Buy</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#if $message}
	toast($message)
{/if}
