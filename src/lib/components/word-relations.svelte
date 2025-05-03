<script lang="ts">
  import { hasValues } from '$lib/helpers/utils';
  import Link from '$lib/ui/link.svelte';

  type Props = { label: string; words: string[] };

  const { label, words }: Props = $props();
</script>

{#if hasValues(words)}
  <dl class="flex items-start gap-4">
    <dt class="text-grey-400 text-base md:text-xl">{label}</dt>
    <dd>
      <ul
        class={[
          'flex flex-wrap items-center gap-2',
          'text-accent-200 text-lg font-bold md:text-xl'
        ]}
      >
        {#each words as word (word)}
          <li>
            <Link
              href={encodeURI(`https://en.wiktionary.org/wiki/${word}`)}
              class="hocus:underline"
            >
              {word}
            </Link>
          </li>
        {/each}
      </ul>
    </dd>
  </dl>
{/if}
