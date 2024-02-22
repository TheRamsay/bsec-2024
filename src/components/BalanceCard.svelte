<script lang="ts">
	export let accountName: string;
	export let balance: string;
	export let currency: string;
</script>

<div class="card m-3">
	<h2 class="text-xl font-semibold mb-2">{accountName}</h2>
	<div class="balance">{balance}</div>
	<div class="currency">{currency}</div>
</div>

<style>
	/* Add your styling here */
	.card {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		text-align: center;
	}

	.balance {
		font-size: 1.5rem;
		font-weight: bold;
		color: #1a202c;
	}

	.currency {
		font-size: 0.875rem;
		color: #6b7280;
	}
</style>
