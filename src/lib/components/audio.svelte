<script lang="ts">
  import Link from '$lib/ui/link.svelte';

  import type { HTMLAudioAttributes } from 'svelte/elements';

  import IconPlay from 'virtual:icons/mdi/play';

  type Props = HTMLAudioAttributes;

  let { src, ...attrs }: Props = $props();

  let duration = $state(0);
  let paused = $state(true);
</script>

<section>
  <h2 class="sr-only">Listen to the pronunciation:</h2>
  <audio {src} bind:duration bind:paused {...attrs}>
    <source {src} type="audio/mpeg" />
    <p>
      Your browser doesn't support this audio file. Here is a
      <Link href={src}>link to the audio</Link> instead.
    </p>
  </audio>
  <button
    type="button"
    aria-label={paused ? 'play' : 'pause'}
    onclick={() => (paused = !paused)}
    disabled={!src}
    class={[
      'group flex items-center justify-center rounded-full p-4',
      'bg-accent-200/25 hover:bg-accent-200 focus:bg-accent-200 text-2xl',
      'cursor-pointer transition-colors duration-200 ease-out',
      'disabled:bg-accent-200/10 disabled:cursor-not-allowed'
    ]}
  >
    <IconPlay class="text-accent-200 group-hover:text-white group-focus:text-white" />
    <span class="sr-only">Play audio</span>
  </button>
</section>
