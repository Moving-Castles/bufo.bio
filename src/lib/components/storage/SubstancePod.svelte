<script lang="ts">
  import type { SubstancePodType } from "$lib/types"
  export let pod: SubstancePodType
</script>

<div class="pod">
  <div>NAME: {pod.entries.name.value}</div>
  <div>SEED: {pod.entries.seed.value}</div>
</div>

<style lang="scss">
  .pod {
    padding-top: 1em;
    padding-bottom: 1em;
    margin: 1em;
    background: var(--foreground);
    color: var(--background);
  }
</style>
