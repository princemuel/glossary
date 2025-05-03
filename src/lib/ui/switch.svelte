<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';
  import { onMount } from 'svelte';

  type Props = SwitchPrimitive.RootProps;

  let theme = $state('');

  onMount(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isManualDarkMode = document.documentElement.dataset.theme === 'dark';
    if (!isManualDarkMode) settheme(prefersDarkMode ? 'dark' : 'light');
  });

  const settheme = (value: string) => {
    document.documentElement.dataset.theme = value;
    document.cookie = `__SITE_THEME__=${value};path="/";max-age=${60 * 60 * 24 * 365}`;
    theme = value;
  };

  const onCheckedChange = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    theme === 'light' ? settheme('dark') : settheme('light');
  };

  let { checked = $bindable(true), ref = $bindable(null), ...attrs }: Props = $props();
</script>

<SwitchPrimitive.Root
  bind:checked
  bind:ref
  {onCheckedChange}
  {...attrs}
  class={[
    '-safe flex min-h-6 min-w-11 shrink-0 items-center-safe rounded-full',
    'border-2 border-transparent bg-gray-400 transition-colors',
    'data-[state=unchecked]:bg-grey-400 data-[state=checked]:bg-accent-200',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ',
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    attrs.class
  ]}
>
  <SwitchPrimitive.Thumb
    class={[
      'inline-block size-5 rounded-full bg-white ',
      'pointer-events-none shadow-lg ring-0 transition-transform ',
      'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
    ]}
  />
</SwitchPrimitive.Root>
