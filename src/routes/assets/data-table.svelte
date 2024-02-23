<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Security } from '$lib/db/schemes/security';
	import type { Stock } from '$lib/db/schemes/stock';

	export let stocks: Array<{ stock: Stock; security: Security }>;

	let data = stocks.map((stock) => {
		return {
			name: stock.security.name,
			quantity: stock.stock.amount,
			price: stock.security.price,
			image: stock.security.logo
		};
	});

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
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
			accessor: 'name',
			header: 'name'
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
	<div class="border rounded-md">
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
	<div class="flex items-center justify-end py-4 space-x-4">
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
