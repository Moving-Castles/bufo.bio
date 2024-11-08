<script lang="ts">
  import { createName } from "$lib/modules/utils"
  import { Canvas } from "@threlte/core"
  import Scene from "$lib/components/storage/Scene.svelte"
  import { goto } from "$app/navigation"
  import { originPath } from "$lib/stores"

  export let seed: string
  export let mode: "full" | "preview" = "full"

  let substanceName = createName(seed)

  function abort() {
    goto($originPath ?? "/")
  }
</script>

<div class="name">{substanceName ?? ""}</div>
<button class="abort" on:click={abort}>←</button>

<div
  class="viewer"
  class:viewer--full={mode == "full"}
  class:viewer--preview={mode == "preview"}
>
  <Canvas>
    <Scene {seed} {mode} />
  </Canvas>
</div>

<style lang="scss">
  .viewer {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-overlay);
  }

  .viewer--full {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }

  .viewer--preview {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .name {
    position: fixed;
    top: 10px;
    right: 10px;
    background: var(--foreground);
    color: var(--background);
    z-index: var(--z-top-ui);
    padding: 10px;
    font-weight: bold;
  }

  .abort {
    position: fixed;
    top: 10px;
    left: 10px;
    background: var(--foreground);
    color: var(--background);
    z-index: var(--z-top-ui);
    padding: 10px;
  }
</style>
