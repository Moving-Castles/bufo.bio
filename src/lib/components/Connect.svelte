<script lang="ts">
  import { uiState } from "$lib/stores"
  import { State } from "$lib/enums"
  import { connectToZupass } from "$lib/modules/zupass"
  import { goto } from "$app/navigation"
  import { zupassClient } from "$lib/stores"
  import Dots from "./Dots.svelte"

  let busy = false

  async function connect() {
    busy = true
    const z = await connectToZupass()
    zupassClient.set(z)
    uiState.set(State.Lab)
    goto("/lab")
  }
</script>

<button class="big-button" on:click={connect} class:busy>
  {#if busy}
    <Dots />
  {:else}
    enter the lab
  {/if}
</button>

<style lang="scss">
  .busy {
    cursor: wait;
    pointer-events: none;
    background: var(--foreground);
  }
</style>
