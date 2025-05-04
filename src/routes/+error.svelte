<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="flex flex-col gap-8 text-center">
  <span role="img" aria-label="frown emoji" class="text-6xl"> 🙁 </span>
  <h1 id="error" class="text-grey-700 text-xl font-bold dark:text-white">
    {page.error?.title}
  </h1>
  <p class="text-grey-400 text-lg">
    {page.error?.message}&nbsp;{page.error?.resolution}
  </p>
</div>
