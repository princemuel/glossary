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
    'bg-border shrink-0',
    orientation === 'horizontal' ? 'h-[1px] w-full' : 'min-h-full w-[1px]',
    attrs.class
  ]}
/>
