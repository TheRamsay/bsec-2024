<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	const data = [
		{
			name: 'AMZN',
			price: 3456.32,
			quantity: 2,
			image: 'https://www.investcroc.com/logos/AMZN.webp'
		},
		{
			name: 'AAPL',
			price: 123.32,
			quantity: 5,
			image: 'https://www.investcroc.com/logos/AAPL.webp'
		},
		{
			name: 'GOOGL',
			price: 2345.32,
			quantity: 1,
			image: 'https://www.investcroc.com/logos/GOOGL.webp'
		}
	];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'name',
			header: 'name'
		}),
		table.column({
			accessor: 'image',
			header: 'image',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'price',
			header: 'price',
			cell: (row) => `${row.value} 🍌`,
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'quantity',
			header: 'quantity',
			plugins: {
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div>
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Filter name..." type="text" bind:value={$filterValue} />
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											<ArrowUpDown class={'ml-2 h-4 w-4'} />
										</Button>
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'image'}
											<img src={cell.value} alt={cell.value} class="w-10 h-10" />
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
