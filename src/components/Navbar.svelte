<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
</script>

<body>
	<header class="px-4 lg:px-6 h-14 flex items-center">
		<a class="flex items-center justify-center" href="/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
				{...$$props}
				><path
					fill="currentColor"
					d="M2.7 17.625q-.3-.3-.288-.712t.288-.688l5.275-5.35Q8.55 10.3 9.4 10.3t1.425.575l2.575 2.6l5.2-5.15H17q-.425 0-.712-.288T16 7.326q0-.425.288-.712T17 6.325h4q.425 0 .713.288t.287.712v4q0 .425-.288.713t-.712.287q-.425 0-.712-.287T20 11.325v-1.6L14.825 14.9q-.575.575-1.425.575t-1.425-.575L9.4 12.325l-5.3 5.3q-.275.275-.7.275t-.7-.275"
				/></svg
			>
			<span class="sr-only">Acme Inc</span>
		</a>
		<span class="ml-2 text-lg font-bold">Vrrrr 🤑</span>
		<nav class="ml-auto flex gap-4 sm:gap-6">
			<a class="text-md font-medium hover:underline underline-offset-4" href="/assets"> Assets </a>
			<a class="text-md font-medium hover:underline underline-offset-4" href="/transactions">
				Transcations
			</a>
			<a class="text-md font-medium hover:underline underline-offset-4" href="/simulation">
				Simulation
			</a>
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</nav>
	</header>
</body>
