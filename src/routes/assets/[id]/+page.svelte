<script lang="ts">
	import BuyForm from '../../../components/BuyForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	import TradingViewWidget from 'svelte-tradingview-widget';

	let options = { symbol: `NASDAQ:${data.security.bic}`, theme: 'dark', autosize: true, locale: 'fr' };
</script>

<div style="height: 900px; " class="p-6">
	<div class="flex justify-start items-center mb-4">
		<img
			src={`https://www.investcroc.com/logos/${data.security.bic.toUpperCase()}.webp`}
			alt={data.security.name}
			class="w-16 h-16 mr-4 rounded"
		/>
		<div>
			<h1 class="font-bold text-xl mb-">{data.security.name} ({data.security.bic})</h1>
			<div class="text-gray-400 font-bold">Quantity: {data.asset?.amount ?? 0}</div>
		</div>
	</div>
	<div class="mb-6">
		<BuyForm
			data={data.form}
			label="Buy"
			title="Buy this stock"
			description="Amount you want to buy"
			formAction="buy"
		/>
		<BuyForm
			data={data.form}
			label="Sell"
			title="Sell this stock"
			description="Amount you want to sell"
			formAction="sell"
		/>
	</div>

	<TradingViewWidget {options} />;
</div>
