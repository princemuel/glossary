<script lang="ts">
  import { invariant } from 'outvariant';

  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type Props = HTMLAnchorAttributes;

  let { children, ...rest }: Props = $props();

  invariant(rest.href, 'Expected `href` to be set but got `%s`', typeof rest.href);
  const href = rest.href.toString();

  const is_internal = ['/', '#'].some((s) => href.startsWith(s));

  const attrs = is_internal
    ? { ...rest }
    : { ...rest, target: '_blank', rel: 'noopener noreferrer' };
</script>

<a {...attrs} {href}> {@render children?.()}</a>
