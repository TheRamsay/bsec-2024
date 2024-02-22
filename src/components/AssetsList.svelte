<script lang="ts">
	export let assets: any[];
</script>

<div class="card m-3 w-75">
	{#each assets as asset}
		<div class="flex justify-between items-center">
			<div class="flex items-center">
				<img src={asset.image} alt={asset.name} class="w-8 h-8 mr-4" />
				<h2 class="text-xl font-semibold">{asset.name}</h2>
			</div>
			<div class="balance">{asset.price}🍌</div>
		</div>
	{/each}
</div>

<style>
	/* Add your styling here */
	.card {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		text-align: center;
	}

	.balance {
		font-size: 1.5rem;
		font-weight: bold;
		color: #1a202c;
	}

	.currency {
		font-size: 0.875rem;
		color: #6b7280;
	}
</style>
