<script lang="ts">
  import { zupassClient } from "$lib/stores"
  import Avatar from "$lib/components/Avatar.svelte"
</script>

<!-- Container for zupass connector -->
<div id="parcnet-app-connector"></div>

{#if $zupassClient}
  <Avatar zupassClient={$zupassClient} />
{/if}

<main>
  <slot />
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    padding-top: 5em;
  }
</style>
