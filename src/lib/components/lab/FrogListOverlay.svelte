<script lang="ts">
  import type { FrogPodType } from "$lib/types"
  import FrogPod from "$lib/components/pods/FrogPod.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let userFrogs: FrogPodType[] = []
</script>

<div class="frog-list-overlay">
  <div class="inner">
    <div class="header">
      Frogs available: {userFrogs.length}
    </div>
    {#each userFrogs as frog}
      <FrogPod
        {frog}
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

    .inner {
      width: 50ch;
      max-width: calc(100% - 40px);
      margin-bottom: 20px;

      .header {
        height: 40px;
      }
    }
  }
</style>
