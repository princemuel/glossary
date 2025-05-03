<script lang="ts">
  import { IconChevronDown, IconLogo, IconMoon } from '$lib/icons';
  import Label from '$lib/ui/label.svelte';
  import Link from '$lib/ui/link.svelte';
  import Separator from '$lib/ui/separator.svelte';
  import Switch from '$lib/ui/switch.svelte';
</script>

<header class="py-12">
  <div class="flex items-center-safe justify-between">
    <Link href="/" class="flex items-center-safe">
      <IconLogo class="text-2xl" />
      <span class="sr-only">Go to home</span>
    </Link>

    <div class="flex items-center-safe gap-5">
      <!-- Select -->
      <IconChevronDown />

      <Separator orientation="vertical" class="bg-grey-200 h-6" />

      <div class="-safe flex items-center-safe gap-3">
        <Switch id="switch" class="peer" />
        <Label for="switch" class="peer-aria-checked:text-accent-200 text-2xl text-gray-400">
          <span class="sr-only">Toggle Theme</span>
          <IconMoon role="img" aria-label="moon icon" class="text-inherit" />
        </Label>
      </div>
    </div>
  </div>
</header>
