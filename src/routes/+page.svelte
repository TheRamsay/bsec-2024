<script lang="ts">
	import type { PageData } from './$types';
	import BalanceCard from '../components/BalanceCard.svelte';
	import AssetsList from '../components/AssetsList.svelte';

	export let data: PageData;
</script>

<body>
	<h1 class="text-3xl font-bold underline text-orange-400">DELAME AKCIE A TOCIME MATY</h1>

	<BalanceCard accountName={data.user.name} balance={data.user.balance} currency="🍌" />

    <h2 class="font-bold text-2xl">Your assets</h2>
    <AssetsList assets={data.assets} />
</body>
