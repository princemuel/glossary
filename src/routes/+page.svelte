<script lang="ts">
  import Audio from '$lib/components/audio.svelte';
  import ErrorBoundary from '$lib/components/error-boundary.svelte';
  import Meaning from '$lib/components/meaning.svelte';
  import SearchForm from '$lib/components/search.svelte';
  import { IconNewWindow } from '$lib/icons';
  import Link from '$lib/ui/link.svelte';
  import Separator from '$lib/ui/separator.svelte';

  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();

  const query = form?.query ?? '';
  const result = form?.results || data.results;
  const error = form?.error;
  const formError = form?.formError;

  const hasError = Boolean(formError) || Boolean(error);
</script>

<main class="flex flex-col gap-8">
  <SearchForm {query} error={formError} />

  {#if hasError && error}
    <section aria-labelledby="error" class="grid min-h-[40vh] place-content-center">
      <ErrorBoundary {error} />
    </section>
  {/if}

  {#if !hasError && result}
    <section class="flex items-center-safe justify-between">
      <hgroup class="flex flex-col gap-4">
        <h1 id="heading" class="text-grey-700 text-3xl font-bold lg:text-6xl dark:text-white">
          {result.word}
        </h1>
        <p class="text-accent-200 text-lg md:text-2xl">
          {result.phonetic || result.phonetics?.[0]?.text}
        </p>
      </hgroup>
      <Audio src={result.phonetics[0]?.audio} />
    </section>

    {#each result.meanings as m (m.partOfSpeech)}
      <Meaning {...m} />
    {/each}

    <Separator class="bg-grey-200 dark:bg-grey-600" />

    <footer class="mt-auto flex flex-col gap-4">
      <h2 class="text-grey-400 text-sm">Source</h2>
      <div class="flex flex-col gap-2">
        {#each result.sourceUrls as url (url)}
          <Link
            href={url}
            class="group text-grey-700 flex items-center gap-2 text-sm dark:text-white"
          >
            <span class="group-hover:underline group-focus:underline">{url}</span>
            <IconNewWindow role="img" aria-label="open link" class="text-grey-400 text-xs" />
          </Link>
        {/each}
      </div>
    </footer>
  {/if}
</main>
