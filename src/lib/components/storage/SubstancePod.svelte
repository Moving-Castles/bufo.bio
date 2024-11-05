<script lang="ts">
  import { goto } from "$app/navigation"
  import type { SubstancePodType } from "$lib/types"
  export let substance: SubstancePodType

  function view() {
    goto(`/storage/${substance.entries.seed.value}`)
  }
</script>

<button class="pod" on:click={view}>
  <div><strong>{substance.entries.name.value}</strong></div>
</button>

<style lang="scss">
  .pod {
    display: block;
    background: darkgrey;
    margin-bottom: 1em;
    color: var(--background);
    cursor: pointer;
    border-radius: 20px;
    user-select: none;
    border: none;
    outline: 0;
    width: 100%;

    img {
      width: 200px;
    }

    &:hover {
      background: lightblue;
    }
  }
</style>
