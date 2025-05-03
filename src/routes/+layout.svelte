<script lang="ts">
  import Container from '$lib/components/container.svelte';
  import Header from '$lib/components/header.svelte';

  import '@fontsource-variable/inconsolata';
  import '@fontsource-variable/inter';
  import '@fontsource-variable/lora';

  import '../app.css';

  const attrs = $props();
</script>

<div
  class={[
    'relative font-normal antialiased',
    'text-grey-900 dark:bg-grey-900 bg-white dark:text-white',
    'sans:font-sans mono:font-mono serif:font-serif font-sans',
    'grid min-h-screen grid-rows-[auto_1fr_auto] supports-[min-height:100svh]:min-h-svh',
    attrs.class
  ]}
>
  <Container>
    <Header />
    {@render attrs.children()}
  </Container>
</div>
