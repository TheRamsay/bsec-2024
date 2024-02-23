<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import type { Security } from '$lib/db/schemes/security';
	import { goto } from '$app/navigation';

	export let securities: Array<Security>;

	const frameworks = securities.map((security) => ({
		label: security.name,
		value: security.name
	}));

	let open = false;
	let value = '';

	$: selectedValue = frameworks.find((f) => f.value === value)?.label ?? 'Search asset...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function goToAssetDetail(assetId: string) {
		console.log('assetId', assetId);
		goto('/assets/' + assetId);
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[400px] justify-between"
		>
			{selectedValue}
			<!-- <CaretSort class="w-4 h-4 ml-2 opacity-50 shrink-0" /> -->
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[400px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search asset" class="h-9" />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each frameworks as framework}
					<Command.Item
						value={framework.value}
						onSelect={(currentValue) => {
							value = currentValue;

							const selectedSecurity = securities.find(
								(security) => security.name === currentValue
							);
							if (selectedSecurity) {
								goToAssetDetail(String(selectedSecurity.id));
							} else {
							}
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<!-- <Check class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')} /> -->
						{framework.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
