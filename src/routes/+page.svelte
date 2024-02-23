<script lang="ts">
	import type { PageData } from './$types';
	import BalanceCard from '../components/BalanceCard.svelte';
	import { onMount } from 'svelte';
	import AssetsList from '../components/AssetsList.svelte';

	export let data: PageData;
	let canvas: HTMLElement | undefined = undefined;
	const option = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center'
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: data.graphAssets
			}
		]
	};

	import * as charts from 'echarts';
	onMount(async () => {
		const chart = charts.init(canvas);
		chart.setOption(option, true);
	});
</script>

<body class="flex justify-between p-6">
	<div class="flex-rows justify-between w-1/3">
		<BalanceCard
			accountName={data.user.name}
			balance={data.user.balance.toString()}
			currency="🍌"
		/>
		<AssetsList assets={data.assets} />
	</div>
	<div class="flex-col justify-end w-1/2 h-screen">
		<h2 class="flex justify-center font-bold text-2xl">Your assets</h2>
		<div class="flex justify-center w-400 h-2/3" bind:this={canvas} />
	</div>
</body>
