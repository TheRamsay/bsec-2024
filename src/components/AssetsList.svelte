<script lang="ts">
	export let assets: any[];
</script>

<div class="rounded-xl m-3 w-full h-full text-center p-4 shadow-m">
	{#each assets as asset}
		<div class="flex justify-between items-center">
			<div class="flex items-center">
				<img src={asset.image} alt={asset.name} class="w-8 h-8 mr-4" />
				<h2 class="text-xl font-semibold">{asset.name}</h2>
			</div>
			<div class="text-2xl font-bold">{asset.price}🍌</div>
		</div>
	{/each}
</div>