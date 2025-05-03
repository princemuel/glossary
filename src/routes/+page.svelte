<script lang="ts">
  import Audio from '$lib/components/audio.svelte';
  import { IconNewWindow } from '$lib/icons';
  import Link from '$lib/ui/link.svelte';
  import Separator from '$lib/ui/separator.svelte';
</script>

<main class="flex flex-col gap-8">
  <section class="flex items-center-safe justify-between">
    <hgroup class="flex flex-col gap-4">
      <h1 id="heading" class="text-grey-700 text-3xl font-bold lg:text-6xl dark:text-white">
        keyboard
      </h1>
      <p class="text-accent-200 text-lg md:text-2xl">/ˈkiːbɔːd/</p>
    </hgroup>
    <Audio src="#" />
  </section>

  <section aria-labelledby="noun" class="flex flex-col gap-8">
    <h2
      id="noun"
      class={[
        'flex items-center gap-6 font-bold italic',
        'text-grey-700 text-lg md:text-2xl dark:text-white'
      ]}
    >
      noun
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
          <li class="space-y-3 ps-6 text-sm md:text-lg">
            <p>(etc.) A set of keys used to operate a typewriter, computer etc.</p>
            <q class="text-grey-400 inline-block">
              Keyboarding is the part of this job I hate the most.
            </q>
          </li>
        </ul>
      </dd>
    </dl>

    <dl class="flex items-start gap-4">
      <dt class="text-grey-400 text-base md:text-xl">Synonyms</dt>
      <dd>
        <ul
          class={[
            'flex flex-wrap items-center gap-2',
            'text-accent-200 text-lg font-bold md:text-xl'
          ]}
        >
          <li>
            <Link
              href={new URL(encodeURI(`https://en.wiktionary.org/wiki/keyboard`)).toString()}
              class="hocus:underline"
            >
              electronic keyboard
            </Link>
          </li>
        </ul>
      </dd>
    </dl>

    <Separator class="bg-grey-200 dark:bg-grey-600" />

    <footer class="mt-auto flex flex-col gap-4">
      <h2 class="text-grey-400 text-sm">Source</h2>
      <div class="flex flex-col gap-2">
        <Link
          href="https://en.wiktionary.org/wiki/keyboard"
          class="group text-grey-700 flex items-center gap-2 text-sm dark:text-white"
        >
          <span class="group-hover:underline group-focus:underline">
            https://en.wiktionary.org/wiki/keyboard
          </span>

          <IconNewWindow role="img" aria-label="open link" class="text-grey-400 text-xs" />
        </Link>
      </div>
    </footer>
  </section>
</main>
