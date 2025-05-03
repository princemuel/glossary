<script lang="ts">
  import { Separator as SeparatorPrimitive } from 'bits-ui';

  type Props = SeparatorPrimitive.RootProps;
  let { orientation = 'horizontal', decorative = true, ...attrs }: Props = $props();
</script>

<SeparatorPrimitive.Root
  {...attrs}
  {orientation}
  {decorative}
  class={[
    'shrink-0',
    orientation === 'horizontal' ? 'h-px w-full' : 'min-h-full w-px',
    attrs.class
  ]}
/>
