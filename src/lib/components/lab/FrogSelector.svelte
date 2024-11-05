<script lang="ts">
  import type { FrogPodType } from "$lib/types"
  import FrogPod from "$lib/components/lab/FrogPod.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let userFrogs: FrogPodType[] = []
  export let index: number

  let open = false

  console.log("userFrogs", userFrogs)
</script>

{#if open}
  <div class="selector">
    {#each userFrogs as frog}
      <FrogPod
        {frog}
        on:select={e => {
          console.log(e.detail)
          dispatch("select", e.detail)
        }}
      />
    {/each}
  </div>
{:else}
  <button type="button" on:click={() => (open = true)}
    >Select frog #{index}</button
  >
{/if}

<style lang="scss">
  .selector {
    width: 100%;
  }

  button {
    margin-bottom: 10px;
  }
</style>
