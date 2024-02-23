	
<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Sun from "lucide-svelte/icons/sun";
	import Moon from "lucide-svelte/icons/moon";
   
	import { toggleMode } from "mode-watcher";
</script>

<body>
	<header class="px-4 lg:px-6 h-14 flex items-center">
		<a class="flex items-center justify-center" href="/">
			<img src="biggerIcon.png" alt="" width=60% height=60%>
			<span class="sr-only">Acme Inc</span>
		</a>
		<span class="ml-2 text-lg font-bold">Vrrrr 🤑</span>
		<nav class="ml-auto flex content-center gap-2 sm:gap-2">
			<Button>
				<a class="text-md font-medium" href="/assets"> Assets </a>
			</Button>
			<Button>
				<a class="text-md font-medium" href="/transactions"> Transcations </a>
			</Button>
			<Button>
				<a class="text-md font-medium" href="/modeling"> Modeling </a>
			</Button>			
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
