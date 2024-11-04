<script lang="ts">
  import { uiState } from "$lib/stores"
  import { State } from "$lib/enums"
  import { connectToZupass } from "$lib/modules/zupass"
  import { goto } from "$app/navigation"
  import { zupassClient } from "$lib/stores"

  let busy = false

  async function connect() {
    busy = true
    const z = await connectToZupass()
    console.log("in connect", z)
    zupassClient.set(z)
    uiState.set(State.Lab)
    goto("/lab")
  }
</script>

<button on:click={connect} class:busy>Connect to Zupass</button>

<style lang="scss">
  .busy {
    cursor: wait;
    pointer-events: none;
    opacity: 0.5;
  }
</style>
