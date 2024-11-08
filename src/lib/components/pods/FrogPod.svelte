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
  <div class="name">{frog.entries.name.value}</div>
  <img
    width="200"
    height="133"
    src={frog.entries.imageUrl.value}
    alt={frog.entries.name.value}
  />
  <div class="details">
    <!-- BEAUTY -->
    <div class="row">
      <div class="label">beauty:</div>
      <div class="value">{frog.entries.beauty.value}</div>
    </div>
    <!-- BIOME -->
    <div class="row">
      <div class="label">biome:</div>
      <div class="value">{frog.entries.biome.value}</div>
    </div>
    <!-- INTELLIGENCE -->
    <div class="row">
      <div class="label">intelligence:</div>
      <div class="value">{frog.entries.intelligence.value}</div>
    </div>
    <!-- JUMP -->
    <div class="row">
      <div class="label">jump:</div>
      <div class="value">{frog.entries.jump.value}</div>
    </div>
    <!-- RARITY -->
    <div class="row">
      <div class="label">rarity:</div>
      <div class="value">{frog.entries.rarity.value}</div>
    </div>
    <!-- SPEED -->
    <div class="row">
      <div class="label">speed:</div>
      <div class="value">{frog.entries.speed.value}</div>
    </div>
    <!-- TEMPERAMENT -->
    <div class="row">
      <div class="label">temperament:</div>
      <div class="value">{frog.entries.temperament.value}</div>
    </div>
  </div>
</div>

<style lang="scss">
  .pod {
    padding-top: 15px;
    padding-bottom: 10px;
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
    }

    .name {
      margin-bottom: 10px;
      font-weight: bold;
    }

    &.interactive {
      cursor: pointer;

      &:hover {
        background: lightgrey;
      }
    }
  }

  .details {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: var(--font-size-small);
    width: 70%;

    .row {
      display: flex;
      justify-content: space-between;
      margin-right: 5px;
      padding: 5px;
      background: var(--foreground);
      margin-bottom: 5px;
      border-radius: 5px;

      .label {
        font-weight: bold;
      }
    }
  }
</style>
