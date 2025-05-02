<script lang="ts">
  const attrs = $props();
</script>

<div class={['mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8', attrs.class]}>
  {@render attrs.children()}
</div>
