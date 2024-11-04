<script lang="ts">
  import type { FrogPodType } from "$lib/types"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let frog: FrogPodType

  function select() {
    dispatch("select", frog)
  }
</script>

<div role="presentation" class="pod" on:click={select}>
  <img src={frog.entries.imageUrl.value} alt={frog.entries.name.value} />
  <div>{frog.entries.name.value}</div>
</div>

<style lang="scss">
  .pod {
    img {
      width: 200px;
    }
  }
</style>
