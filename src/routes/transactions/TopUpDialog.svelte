<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { topUpSchema, type TopFormUpSchema } from './schema';
	import { Button } from '$lib/components/ui/button';

	export let data: SuperValidated<Infer<TopFormUpSchema>>;

	const form = superForm(data, {
		validators: zodClient(topUpSchema)
	});

	const { form: formData, enhance, message } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger><Button>Top up account</Button></Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Buy this stock</Dialog.Title>
		</Dialog.Header>
		<form method="POST" class="items-center justify-center max-w-lg mx-6 form-control">
			<Form.Field {form} name="amount">
				<Form.Control let:attrs>
					<Form.Label>Amount</Form.Label>
					<Input {...attrs} bind:value={$formData.amount} />
				</Form.Control>
				<Form.Description>Amount you want to recharge</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Buy</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#if $message}
	toast($message)
{/if}
