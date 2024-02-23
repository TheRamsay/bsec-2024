<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buySchema, type BuyFormSchema } from '../routes/assets/[id]/schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import { desc } from 'drizzle-orm';

	export let data: SuperValidated<Infer<BuyFormSchema>>;
	export let label: string = '<lable>';
	export let description: string = '<🤑🤑🤑🤑>';
	export let title: string = '<🤏🏿🤏🏿🤏🏿>';
	export let formAction: "buy" | "sell";

	const form = superForm(data, {
		validators: zodClient(buySchema)
	});

	const { form: formData, enhance, message } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger><Button>{label}</Button></Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<form
			method="POST"
			action={"?/".concat(formAction)}
			class="items-center justify-center max-w-lg mx-6 form-control"
			use:enhance
		>
			<Form.Field {form} name="amount">
				<Form.Control let:attrs>
					<Form.Label>Amount</Form.Label>
					<Input {...attrs} bind:value={$formData.amount} />
				</Form.Control>
				<Form.Description>{description}</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>{label}</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#if $message}
	toast($message)
{/if}
