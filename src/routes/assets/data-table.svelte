<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

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

	const table = createTable(readable(data));

	const columns = table.createColumns([
		table.column({
			accessor: 'name',
			header: 'name'
		}),
		table.column({
			accessor: 'image',
			header: 'image'
		}),
		table.column({
			accessor: 'price',
			header: 'price'
		}),
		table.column({
			accessor: 'quantity',
			header: 'quantity'
		}),
		table.column({
			accessor: ({ name }) => name,
			header: ''
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
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
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
