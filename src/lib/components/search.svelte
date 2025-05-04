<script lang="ts">
  import { IconSearch } from '$lib/icons';

  type Props = { query: string; error?: string };

  const { query, error }: Props = $props();

  const isError = !!error;
</script>

<form method="POST" class="flex flex-col gap-2">
  <label
    class={[
      'flex w-full items-center gap-1 rounded-xl px-4 py-3 text-xl',
      'bg-grey-100 dark:bg-grey-800',
      'hover:border-accent-200 hover:border',
      'focus-within:border-accent-200 focus-within:border',
      isError ? 'border-accent-100' : null
    ]}
  >
    <input
      type="text"
      id="query.input"
      name="query"
      value={query}
      class="text-grey-700 flex-1 border-none bg-transparent p-0 text-sm font-bold outline-none focus:ring-0 sm:text-base dark:text-white"
      placeholder="Search for any word"
      aria-invalid={isError}
      aria-errormessage="query.error"
    />
    <IconSearch name="search" class="text-inherit" />
    <span class="sr-only">Search for any word</span>
  </label>
  <p
    role="alert"
    aria-live="polite"
    aria-atomic="true"
    class="text-accent-100 text-sm sm:text-xl"
    id="query.error"
  >
    {error}
  </p>
</form>
