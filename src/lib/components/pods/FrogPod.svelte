<script lang="ts">
  import type { FrogPodType } from "$lib/types"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let frog: FrogPodType
  export let interactive: boolean = true

  function select() {
    dispatch("select", frog)
  }
</script>

<div role="presentation" class="pod" class:interactive on:click={select}>
  <img
    width="200"
    height="133"
    src={frog.entries.imageUrl.value}
    alt={frog.entries.name.value}
  />
  <div class="name">{frog.entries.name.value}</div>
</div>

<style lang="scss">
  .pod {
    padding-top: 20px;
    padding-bottom: 15px;
    background: darkgrey;
    margin-bottom: 1em;
    color: var(--background);
    border-radius: 10px;
    user-select: none;
    width: 100%;

    img {
      width: 200px;
      background: lightgrey;
      margin-bottom: 5px;
      border-radius: 10px;
      // filter: grayscale(1);
    }

    .name {
      font-weight: bold;
    }

    &.interactive {
      cursor: pointer;

      &:hover {
        background: lightblue;
      }
    }
  }
</style>
