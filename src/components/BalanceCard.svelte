<script lang="ts">
	export let accountName: string;
	export let balance: string;
	export let currency: string;
</script>

<div class="flex-rows rounded-xl m-3 text-center p-6 shadow-md w-full h-30">
	<h2 class="text-xl font-semibold mb-2">{accountName}</h2>
	<div class="flex-col">
		<div class="flex justify-center text-2xl font-bold">{balance}</div>
		<div class="text-sm">{currency}</div>
	</div>
</div>
