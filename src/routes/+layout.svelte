<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- <Toaster /> -->
<main class="w-screen h-screen p-2">
	<Navbar securities={data.securities} />
	<ModeWatcher />
	<slot />
</main>
