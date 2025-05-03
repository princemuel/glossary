<script lang="ts">
  import { page } from '$app/state';
  import { invariant } from 'outvariant';

  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type Props = HTMLAnchorAttributes;

  let { children, ...attrs }: Props = $props();

  invariant(attrs.href, 'Expected `href` to be set but got `%s`', typeof attrs.href);
  const toPathname = attrs.href.toString();
  const pathname = page.url.pathname;

  const href =
    toPathname && '/' !== toPathname && toPathname.endsWith('/')
      ? toPathname.slice(0, -1)
      : toPathname;

  const isActive = Boolean(href) && (href === pathname || pathname.startsWith(`${href}/`));
</script>

<a {...attrs} aria-current={isActive ? 'page' : 'false'}> {@render children?.()}</a>
