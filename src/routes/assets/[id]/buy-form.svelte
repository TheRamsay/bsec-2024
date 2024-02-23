<script lang="ts">
	export let showModal: boolean; // boolean

	let dialog: any; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="my-30 bg-slate-900 modal-box w-11/12"
>
	<div class="flex flex-col justify-center items-center">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<div class="desktop:text-3xl text-1xl text-center">
				Buy!
			</div>
			<form
				method="POST"
				action="?/buy"
				class="form-control max-w-lg mx-6 ustify-center items-center"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Amount</span>
				</label>
				<input
					type="text"
					placeholder="10 characters max"
					name="amount"
					class="input input-bordered w-full max-w-lg"
				/>
				<button on:click={() => dialog.close()} class="btn btn-accent mt-8 w-2/5">Buy!</button>
			</form>
		</div>
	</div>
</dialog>