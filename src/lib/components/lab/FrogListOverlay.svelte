<script lang="ts">
  import type { FrogPodType } from "$lib/types"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  import FrogPod from "$lib/components/pods/FrogPod.svelte"

  export let userFrogs: FrogPodType[] = []

  function close() {
    dispatch("close")
  }
</script>

<div class="frog-list-overlay">
  <div class="inner">
    <button class="close" on:click={close}>close</button>
    <div class="header">
      Frogs available: {userFrogs.length}
    </div>
    {#each userFrogs as frog, index}
      <FrogPod
        {frog}
        {index}
        on:select={e => {
          dispatch("select", e.detail)
        }}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .frog-list-overlay {
    width: 100dvw;
    height: 100dvh;
    background: var(--background);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    overflow-y: scroll;
    z-index: var(--z-overlay);

    .inner {
      width: 50ch;
      max-width: calc(100% - 40px);
      margin-bottom: 20px;
    }
  }

  .close {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
  }
</style>
