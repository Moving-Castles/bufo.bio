<script lang="ts">
  import { goto } from "$app/navigation"
  import type { SubstancePodType } from "$lib/types"
  import SubstanceDetails from "$lib/components/pods/SubstanceDetails.svelte"

  export let substance: SubstancePodType

  let detailsOpen = false

  function view() {
    goto(`/storage/${substance.entries.seed.value}`)
  }

  function toggleDetails() {
    detailsOpen = !detailsOpen
  }
</script>

{#if detailsOpen}
  <SubstanceDetails {substance} on:close={toggleDetails} />
{/if}

<div class="details">DETAILS</div>

<div class="pod">
  <div class="name">{substance?.entries?.name?.value ?? ""}</div>
  <div class="actions">
    <button on:click={view}>view</button>
    <button on:click={toggleDetails}>details</button>
  </div>
</div>

<style lang="scss">
  .pod {
    display: block;
    background: darkgrey;
    margin-bottom: 20px;
    color: var(--background);
    user-select: none;
    border: none;
    outline: 0;
    width: 100%;
    font-size: var(--font-size-base);

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
</style>
