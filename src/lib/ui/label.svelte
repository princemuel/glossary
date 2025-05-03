<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui';

  type Props = LabelPrimitive.RootProps;
  let attrs: Props = $props();
</script>

<LabelPrimitive.Root
  {...attrs}
  class={['peer-disabled:cursor-not-allowed peer-disabled:opacity-70', attrs.class]}
>
  {@render attrs.children?.()}
</LabelPrimitive.Root>
