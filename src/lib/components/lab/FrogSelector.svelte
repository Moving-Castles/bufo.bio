<script lang="ts">
  import type { FrogPodType } from "$lib/types"
  import FrogListOverlay from "$lib/components/lab/FrogListOverlay.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let userFrogs: FrogPodType[] = []
  export let index: number

  let open = false
</script>

{#if open}
  <div class="selector">
    <FrogListOverlay
      {userFrogs}
      on:select={e => {
        dispatch("select", e.detail)
        open = false
      }}
    />
  </div>
{:else}
  <button class="big-button" type="button" on:click={() => (open = true)}>
    select frog #{index}
  </button>
{/if}

<style lang="scss">
  button {
    margin-bottom: 20px;
  }
</style>
