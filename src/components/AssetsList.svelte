<script lang="ts">
	export let assets: any[];
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="w-[650px] mt-4">
	<Card.Header>
		<Card.Title>
			<div class="flex justify-between">
				<p class="">Last three stocks</p>
				<p>$</p>
			</div>
		</Card.Title>
		<Card.Description>
			<div class="mt-4">
				{#each assets as asset}
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center w-full">
							<img src={asset.image} alt={asset.name} class="w-8 h-8 mr-4" />
							<h2 class="text-xl font-semibold">{asset.name}</h2>
						</div>
						<div class="mr-8 text-2xl font-bold">{asset.price}$</div>
						<div class="text-2xl font-bold">{asset.quantity}</div>
					</div>
				{/each}
			</div>
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4"></Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
