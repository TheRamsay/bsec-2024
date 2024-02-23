<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<!-- <Toaster /> -->
<main class="p-2 h-screen">
	<Navbar />
	<slot />
</main>
