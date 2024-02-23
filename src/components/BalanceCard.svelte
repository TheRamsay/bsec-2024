<script lang="ts">
	export let accountName: string;
	export let balance: string;
	export let currency: string;

	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="w-[380px]">
	<Card.Header>
		<Card.Title>
			<div class="flex justify-between">
				<p class="">{accountName}'s balance</p>
				<p>$</p>
			</div>
		</Card.Title>
		<Card.Description>
			<div class="text-3xl mt-4">
				${balance}
			</div>
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4"></Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
