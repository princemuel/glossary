<script lang="ts">
  import WordRelations from '$lib/components/word-relations.svelte';

  import type { IResult } from '$lib/server/schema';

  type Props = IResult['meanings'][0];

  const { partOfSpeech, definitions, synonyms, antonyms }: Props = $props();
</script>

<section aria-labelledby={partOfSpeech} class="flex flex-col gap-8">
  <h2
    id={partOfSpeech}
    class={[
      'flex items-center gap-6 font-bold italic',
      'text-grey-700 text-lg md:text-2xl dark:text-white'
    ]}
  >
    {partOfSpeech}
    <span class="bg-grey-200 dark:bg-grey-600 h-px flex-1"></span>
  </h2>

  <dl class="flex flex-col gap-5">
    <dt class="text-grey-400 text-base md:text-xl">Meaning</dt>
    <dd>
      <ul
        class={[
          'flex list-disc flex-col gap-3 ps-4',
          'text-grey-700 marker:text-accent-200 text-sm dark:text-white'
        ]}
      >
        {#each definitions as d (d.definition)}
          <li class="space-y-3 ps-6 text-sm md:text-lg">
            <p>{d.definition}</p>
            {#if d.example}
              <q class="text-grey-400 inline-block">
                {d.example}
              </q>
            {/if}
          </li>
        {/each}
      </ul>
    </dd>
  </dl>

  <WordRelations label="Synonyms" words={synonyms} />
  <WordRelations label="Antonyms" words={antonyms} />
</section>
