<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import CustomCalendar from '../CustomCalendar/CustomCalendar.svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	export let value: DateValue | undefined = undefined;
	export let defaultText = 'Select a date';
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : defaultText }
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<CustomCalendar bind:value />
	</Popover.Content>
</Popover.Root>
