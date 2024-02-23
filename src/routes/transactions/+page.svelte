<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	export let data: PageData;
</script>

<div class="container py-10 mx-auto">
	<h1 class="text-xl font-bold">Your transactions</h1>
	<DataTable transactions={data.transactions} data={data} />
</div>
