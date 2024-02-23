<script lang="ts">
	import type { PageData } from './$types';
	import BalanceCard from '../components/BalanceCard.svelte';
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
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

	let acc = 0;

	for (let i = 0; i < data.assets.length; i++) {
		// console.log(data.assets[i].price);
		// console.log(data.assets[i].quantity);
		acc += +data.assets[i].price * +data.assets[i].quantity;
	}

	console.log(acc);
</script>

<body class="flex justify-between p-6 m-4">
	<div class="flex-rows justify-between w-1/3">
		<div class="flex flex-row">
			<BalanceCard
				accountName={data.user.name}
				balance={data.user.balance.toString()}
				currency="$"
			/>

			<Card.Root class="w-[380px] ml-8">
				<Card.Header>
					<Card.Title>
						<div class="flex justify-between">
							<p class="">{data.user.name}'s net worth</p>
							<p>$</p>
						</div>
					</Card.Title>
					<Card.Description>
						<div class="text-3xl mt-4">
							${acc + +data.user.balance}
						</div>
					</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4"></Card.Content>
				<Card.Footer></Card.Footer>
			</Card.Root>
		</div>

		<AssetsList assets={data.assets.slice(0, 3)} />
	</div>
	<div class="flex-col justify-end w-1/2 h-screen">
		<Card.Root class="w-[900px]">
			<Card.Header>
				<Card.Title>
					<div class="flex justify-between">
						<p class="">Your assets</p>
						<p>$</p>
					</div>
				</Card.Title>
				<Card.Description>
					<div style="height: 800px" bind:this={canvas}></div>
				</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4"></Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
	</div>
</body>
