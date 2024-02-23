<script lang="ts">
	import type { PageData } from './$types';
	import BalanceCard from '../components/BalanceCard.svelte';
	import AssetsList from '../components/AssetsList.svelte';
	import { onMount } from 'svelte';

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
    }]}

	import * as charts from 'echarts';
	onMount(async () => {
    const chart = charts.init(canvas);
    chart.setOption(option, true);
});
</script>

<body>
	<h1 class="text-3xl font-bold underline text-orange-400">DELAME AKCIE A TOCIME MATY</h1>
	

	<BalanceCard accountName={data.user.name} balance={data.user.balance.toString()} currency="🍌" />

    <h2 class="font-bold text-2xl">Your assets</h2>
    <AssetsList assets={data.assets} />

	<div class="container" bind:this={canvas} />

<style>
	.container {
		width: 1600;
		height: 700px;
	}
</style>

</body>
