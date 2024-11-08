<script lang="ts">
  import { fade } from "svelte/transition"
  import { REVEAL_DELAY } from "$lib/constants"
  import type { FrogPodType } from "$lib/types"
  import { createEventDispatcher, onMount } from "svelte"
  const dispatch = createEventDispatcher()

  export let frog: FrogPodType
  export let small: boolean = false
  export let index: number = 0

  let loaded = false

  function handleClick() {
    if (small) {
      dispatch("clear", {})
    } else {
      dispatch("select", frog)
    }
  }

  onMount(async () => {
    await new Promise(resolve => setTimeout(resolve, REVEAL_DELAY * index))
    loaded = true
  })
</script>

{#if loaded}
  <div
    role="presentation"
    class="pod"
    class:small
    in:fade={{ duration: 200 }}
    on:click={handleClick}
  >
    <!-- NAME -->
    <div class="name">
      <span class="frog-index">#{index}: </span>{frog.entries.name.value}
    </div>
    <!-- IMAGE -->
    <div class="image-container">
      <img src={frog.entries.imageUrl.value} alt={frog.entries.name.value} />
    </div>
    <!-- DETAILS -->
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
{/if}

<style lang="scss">
  .pod {
    padding-top: 15px;
    padding-bottom: 10px;
    background: darkgrey;
    margin-bottom: 20px;
    color: var(--background);
    user-select: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    cursor: pointer;

    &:hover {
      background: lightgrey;
    }

    &:active {
      background: var(--foreground);
    }

    .image-container {
      width: 200px;
      height: 133px;
      background: lightgrey;
      margin-bottom: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .name {
      margin-bottom: 10px;
      font-weight: bold;

      .frog-index {
        display: none;
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

        .label {
          font-weight: bold;
        }
      }
    }

    &.small {
      height: 80px;
      flex-direction: row;
      padding-inline: 10px;

      .name {
        order: 2;
        margin-left: 20px;

        .frog-index {
          display: inline-block;
          font-weight: normal;
          margin-right: 1ch;
        }
      }

      .details {
        display: none;
      }

      .image-container {
        order: 1;
        width: 60px;
        height: 60px;
        margin-bottom: 0;
      }
    }
  }
</style>
