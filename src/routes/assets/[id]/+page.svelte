<script lang="ts">
	import BuyForm from '../../../components/BuyForm.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
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
			<div class="text-gray-400 font-bold">Quantity: {data.asset?.amount}</div>
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

	<div class="tradingview-widget-container" style="height:100%;width:100%">
		<div
			class="tradingview-widget-container__widget"
			style="height:calc(100% - 32px);width:100%"
		></div>
		<div class="tradingview-widget-copyright">
			<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"
				><span class="blue-text">Track all markets on TradingView</span></a
			>
		</div>
		<script
			type="text/javascript"
			src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
			async
		>
			{
			"autosize": true,
			`symbol": "NASDAQ:${data.security.bic}`,
			"interval": "1",
			"timezone": "Etc/UTC",
			"theme": "dark",
			"style": "3",
			"locale": "en",
			"enable_publishing": false,
			"allow_symbol_change": true,
			"calendar": false,
			"support_host": "https://www.tradingview.com"
			}
		</script>
	</div>
</div>
