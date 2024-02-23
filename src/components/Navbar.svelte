<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import Search from './Search.svelte';
	import type { Security } from '$lib/db/schemes/security';

	export let securities: Security[];
</script>

<body>
	<header class="flex flex-row items-center justify-center w-full px-4 lg:px-6 h-14">
		<a class="flex items-center justify-center" href="/">
			<img src="biggerIcon.png" alt="" width="60%" height="60%" />
			<span class="sr-only">Acme Inc</span>
		</a>
		<div class="flex flex-row items-center justify-center w-full">
			<Search {securities} />
		</div>
		<nav class="flex gap-4 ml-auto sm:gap-6">
			<a class="font-medium text-md hover:underline underline-offset-4" href="/assets"> Assets </a>
			<a class="font-medium text-md hover:underline underline-offset-4" href="/transactions">
				Transcations
			</a>
			<a class="font-medium text-md hover:underline underline-offset-4" href="/simulation">
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
