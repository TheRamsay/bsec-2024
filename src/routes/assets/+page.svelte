<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	import Search from '../../components/Search.svelte';

	// export let data: PageData;
</script>

<div class="container py-10 mx-auto">
	<h1 class="text-xl font-bold">Your assets</h1>
	<DataTable />
</div>
