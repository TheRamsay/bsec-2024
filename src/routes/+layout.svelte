<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';	
	import { ModeWatcher } from "mode-watcher";	

	import { Button } from "$lib/components/ui/button";
 	import Sun from "lucide-svelte/icons/sun";
  	import Moon from "lucide-svelte/icons/moon";
 
  	import { toggleMode } from "mode-watcher";
</script>

<main class="p-2">
	<Navbar />
	<ModeWatcher />
	<slot />
</main>