<script lang="ts">
  import type { IError } from '$lib/server/schema';

  type Props = { error: IError };

  const { error }: Props = $props();
</script>

<div class="flex flex-col gap-8 text-center">
  <span role="img" aria-label="frown emoji" class="text-6xl"> 🙁 </span>
  <h1 id="error" class="text-grey-700 text-xl font-bold dark:text-white">
    {error.title}
  </h1>
  <p class="text-grey-400 text-lg">
    {error.message}&nbsp;{error.resolution}
  </p>
</div>
