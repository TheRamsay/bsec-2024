<script lang="ts">
	import type { PageData } from '../$types';
	import { echarts } from './echarts';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		fromDate
	} from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import type { DateRange } from 'bits-ui';
	import CustomCalendar from '../../components/CustomCalendar/CustomCalendar.svelte';
	import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker.svelte';
	import { toast } from 'svelte-sonner';

	export let canvas: HTMLElement | undefined = undefined;

	const df = new DateFormatter('en', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});

	let fromValue: DateValue | undefined = undefined;
	let toValue: DateValue | undefined = undefined;

	export let data: PageData;
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const generateData = (price: number, trend: number, from: Date, to: Date): number[] => {
		let dailyPrices = [];
		let currentDate = new Date(from);

		while (currentDate <= to) {
			dailyPrices.push(price);
			price += trend;
			currentDate.setMonth(currentDate.getMonth() + 1);
		}

		return dailyPrices;
	};

	const sumAll = (data: number[][]) => {
		let sum = Array.from({ length: data[0].length }, () => 0);
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].length; j++) {
				sum[j] += data[i][j];
			}
		}
		return sum;
	};

	const updateChart = () => {
		if (toValue?.toDate().getTime() <= fromValue?.toDate().getTime()) {
			return;
		}

		let generatedData = data.stocks.map(({ stock, security }) => {
			// console.log(security.price);
			// console.log(security.positive_case);
			return {
				name: security.bic,
				type: 'line',
				showSymbol: false,
				data: generateData(
					security.price,
					security.positiveCase,
					stock.createdAt,
					// fromValue?.toDate(),
					toValue?.toDate()
				)
			};
		});

		// console.log(generatedData);

		let options = {
			title: {
				text: 'Prediction of your assets in the future'
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				location: 'middle',
				data: Array.from({ length: generatedData[0].data.length }, (_, index) => {
					const date = fromValue?.toDate();
					date.setMonth(date.getMonth() + index);
					return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
				})
			},
			yAxis: {
				name: 'Income'
			},
			series: [
				...generatedData,
				{
					name: 'Total',
					type: 'line',
					showSymbol: false,
					data: sumAll(generatedData.map((asset) => asset.data))
				}
			],
			legend: {
				data: data.stocks.map(({stock, security}) => security.bic).concat('Total')
			}
		};

		console.log(options.xAxis.data);

		if (canvas) {
			console.log('Created chart');
			echarts(canvas, options);
		}
	};
</script>

<div>
	<div class="m-10 flex flex-row h-full items-center">
		<CustomDatePicker bind:value={fromValue} defaultText="Select from date" />
		<CustomDatePicker bind:value={toValue} defaultText="Select to date" />
		<Button variant="outline" on:click={updateChart}>Submit</Button>
	</div>
	<div class="container" bind:this={canvas} />
</div>

<style>
	.container {
		width: 1600;
		height: 700px;
	}
</style>
