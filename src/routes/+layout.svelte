<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
</script>

<!-- <Toaster /> -->
<main class="p-2 h-screen">
	<Navbar />
	<ModeWatcher />
	<slot />
</main>
