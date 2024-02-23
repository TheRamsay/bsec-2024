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
		<a class="flex items-center justify-center items" href="/">
			<svg class="mt-24">
				<g xmlns="http://www.w3.org/2000/svg"
					><path
						d="M27,25H22A10,10,0,0,1,12,15a1,1,0,0,1,1-1h5A10,10,0,0,1,28,24,1,1,0,0,1,27,25ZM14.06,16A8,8,0,0,0,22,23h3.94A8,8,0,0,0,18,16Z"
					></path><path
						d="M43.23,22.9A10,10,0,0,1,36.16,20a1.09,1.09,0,0,1-.07-1.48L39.63,15a10,10,0,0,1,14.14,0,1.08,1.08,0,0,1,.33.74,1.05,1.05,0,0,1-.26.74L50.3,20A10,10,0,0,1,43.23,22.9Zm-5-3.74a8,8,0,0,0,10.63-.6l2.79-2.79a8,8,0,0,0-10.64.6Z"
					></path><path
						d="M32.07,17.93a1,1,0,0,1-.71-.29L29.23,15.5a10,10,0,0,1,0-14.14,1,1,0,0,1,1.41,0L32.77,3.5a10,10,0,0,1,0,14.14A1,1,0,0,1,32.07,17.93ZM30,3.53a8,8,0,0,0,.66,10.56L32,15.47a8,8,0,0,0-.66-10.56Z"
					></path><path
						d="M32,30a1,1,0,0,1-.71-.29l-5-5a1,1,0,0,1,1.42-1.42l5,5a1,1,0,0,1,0,1.42A1,1,0,0,1,32,30Z"
					></path><path
						d="M32,25a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l5-5a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,32,25Z"
					></path><path d="M32,35.5a1,1,0,0,1-1-1V17a1,1,0,0,1,2,0V34.5A1,1,0,0,1,32,35.5Z"
					></path><path
						d="M36,42H28a1,1,0,0,1-.78-.37L23.44,36.9a2,2,0,0,1,.4-2.89,2,2,0,0,1,1.77-.27,6.45,6.45,0,0,1,.84.37A2.94,2.94,0,0,0,28,34.5a3,3,0,0,0,1.55-.39,5.21,5.21,0,0,1,4.89,0,3.3,3.3,0,0,0,3.11,0,5,5,0,0,1,.84-.37,2,2,0,0,1,1.77.27A2,2,0,0,1,41,35.65a2,2,0,0,1-.44,1.25l-3.78,4.73A1,1,0,0,1,36,42Zm-7.52-2h7L39,35.65a4.49,4.49,0,0,0-.56.24,5.21,5.21,0,0,1-4.89,0,3.3,3.3,0,0,0-3.11,0,5.21,5.21,0,0,1-4.89,0,3.89,3.89,0,0,0-.58-.25h0Z"
					></path><path
						d="M42.74,63H21.26a7.25,7.25,0,0,1-4.92-12.59l11-10.14A1,1,0,0,1,28,40h8a1,1,0,0,1,.68.27l11,10.14A7.25,7.25,0,0,1,42.74,63ZM28.39,42l-10.7,9.88A5.26,5.26,0,0,0,21.26,61H42.74a5.26,5.26,0,0,0,3.57-9.12L35.61,42Z"
					></path><path
						d="M32,56H30a1,1,0,0,1,0-2h2a1,1,0,0,0,0-2,3,3,0,0,1,0-6h2a1,1,0,0,1,0,2H32a1,1,0,0,0,0,2,3,3,0,0,1,0,6Z"
					></path><path d="M32,48a1,1,0,0,1-1-1V45a1,1,0,0,1,2,0v2A1,1,0,0,1,32,48Z"></path><path
						d="M32,58a1,1,0,0,1-1-1V55a1,1,0,0,1,2,0v2A1,1,0,0,1,32,58Z"
					></path><path d="M39,42H25a1,1,0,0,1,0-2H39a1,1,0,0,1,0,2Z"></path><path
						d="M39,42a1,1,0,0,1-.55-1.83l3-2a1,1,0,0,1,1.1,1.66l-3,2A.94.94,0,0,1,39,42Z"
					></path><path d="M42,44a.94.94,0,0,1-.55-.17l-3-2a1,1,0,1,1,1.1-1.66l3,2A1,1,0,0,1,42,44Z"
					></path><path
						d="M4,33a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1,0-2,1,1,0,0,0,1-1,1,1,0,0,1,2,0,1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1A1,1,0,0,1,4,33Z"
					></path><path
						d="M58,24a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1,0-2,1,1,0,0,0,1-1,1,1,0,0,1,2,0,1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1A1,1,0,0,1,58,24Z"
					></path><path
						d="M50,40a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1,0-2,1,1,0,0,0,1-1,1,1,0,0,1,2,0,1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1A1,1,0,0,1,50,40Z"
					></path><path
						d="M16,46a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1,0-2,1,1,0,0,0,1-1,1,1,0,0,1,2,0,1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1A1,1,0,0,1,16,46Z"
					></path><path
						d="M46,11a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1,0-2,1,1,0,0,0,1-1,1,1,0,0,1,2,0,1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1A1,1,0,0,1,46,11Z"
					></path><path
						d="M16,11a1,1,0,0,1-1-1,1,1,0,0,0-1-1,1,1,0,0,1,0-2,1,1,0,0,0,1-1,1,1,0,0,1,2,0,1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1A1,1,0,0,1,16,11Z"
					></path><circle cx="39" cy="4" r="1"></circle><circle cx="54" cy="50" r="1"
					></circle><circle cx="11" cy="52" r="1"></circle><circle cx="61" cy="35" r="1"
					></circle><circle cx="39" cy="28" r="1"></circle><circle cx="7" cy="40" r="1"
					></circle><circle cx="22" cy="30" r="1"></circle><circle cx="9" cy="19" r="1"></circle></g
				>
			</svg>
		</a>
		<div class="flex flex-row items-center justify-center w-full">
			<Search {securities} />
		</div>
		<nav class="flex gap-4 ml-auto sm:gap-6">
			<a class="font-medium text-md hover:underline underline-offset-4" href="/assets"> Assets </a>
			<a class="font-medium text-md hover:underline underline-offset-4" href="/transactions">
				Transactions
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
