<script lang="ts">
  import { fade } from "svelte/transition"
  import { goto } from "$app/navigation"
  import type { SubstancePodType } from "$lib/types"
  import SubstanceDetails from "$lib/components/pods/SubstanceDetails.svelte"
  import { seedToRGB } from "$lib/modules/utils"
  import { REVEAL_DELAY } from "$lib/constants"

  export let substance: SubstancePodType
  export let index = 0

  const seed = substance.entries.seed.value

  let detailsOpen = false

  function view() {
    goto(`/storage/${seed}`)
  }

  function toggleDetails() {
    detailsOpen = !detailsOpen
  }

  const personality = `background: rgb(${seedToRGB(seed.slice(0, 8)).join(",")})`
  const rarity = `background: rgb(${seedToRGB(seed.slice(8, 16), false).join(",")})`
</script>

{#if detailsOpen}
  <SubstanceDetails {substance} on:close={toggleDetails} />
{/if}

<div class="pod" in:fade={{ duration: 200, delay: REVEAL_DELAY * index }}>
  <div class="markers">
    <div class="marker" style={personality} />
    <div class="marker" style={rarity} />
  </div>
  <div class="name">{substance?.entries?.name?.value ?? ""}</div>
  <div class="actions">
    <button on:click={view}>view</button>
    <button on:click={toggleDetails}>details</button>
  </div>
</div>

<style lang="scss">
  .pod {
    display: block;
    background: var(--color-dark);
    margin-bottom: 20px;
    color: var(--background);
    user-select: none;
    border: none;
    outline: 0;
    width: 100%;
    font-size: var(--font-size-base);
    position: relative;

    .name {
      padding-top: 10px;
      font-weight: bold;
    }

    .actions {
      width: 100%;
      display: flex;
      padding: 10px;

      button {
        width: 50%;
        height: 40px;
        cursor: pointer;

        &:first-child {
          margin-right: 5px;
        }

        &:last-child {
          margin-left: 5px;
        }
      }
    }
  }

  .markers {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    .marker {
      width: 20px;
      height: 20px;
    }
  }
</style>
