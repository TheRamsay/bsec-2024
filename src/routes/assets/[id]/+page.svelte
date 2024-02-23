<script lang="ts">
	import BuyForm from './BuyForm.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<BuyForm data={data.form} />
