<script lang="ts">
  import type { SubstancePodType } from "$lib/types"
  import { formatTimestamp } from "$lib/modules/utils"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let substance: SubstancePodType

  console.log("substance", substance)

  function close() {
    dispatch("close")
  }
</script>

<div class="details-overlay">
  <div class="inner">
    <button class="close" on:click={close}>close</button>
    <!-- NAME -->
    <div class="row">
      <div class="label">name</div>
      <div class="value">{substance?.entries?.name?.value ?? ""}</div>
    </div>
    <!-- SEED -->
    <div class="row">
      <div class="label">seed</div>
      <div class="value">{substance?.entries?.seed?.value ?? ""}</div>
    </div>
    <!-- SYNTHESIS TIMESTAMP -->
    <div class="row">
      <div class="label">timestamp</div>
      <div class="value">
        {formatTimestamp(
          Number(substance?.entries?.timestampSigned?.value) ?? 0
        )}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .details-overlay {
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

  .row {
    display: flex;
    justify-content: space-between;

    .label {
      font-weight: bold;
    }
  }
</style>
