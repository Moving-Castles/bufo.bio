<script lang="ts">
  import { page } from "$app/stores"
  import { zupassClient } from "$lib/stores"
  import Avatar from "$lib/components/Avatar.svelte"

  $: isViewer = $page.route.id === "/storage/[slug]" ? true : false
</script>

<!-- Container for zupass connector -->
<div id="parcnet-app-connector"></div>

<main>
  <div class="container">
    {#if $zupassClient}
      <Avatar zupassClient={$zupassClient} />
    {/if}
    {#if !isViewer}
      <div class="logo">
        <div class="text-content">shulgin.engineering</div>
      </div>
    {/if}
    <div class="slot-container">
      <slot />
    </div>
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 20px;
    width: 100dvw;

    .container {
      width: 50ch;
      max-width: calc(100% - 40px);
      margin-bottom: 20px;

      .logo {
        background: var(--foreground);
        color: var(--background);
        font-family: var(--font-stack-alt);
        font-size: 42px;
        height: 80px;
        line-height: 80px;
        font-weight: bold;
        width: 100%;
        background: radial-gradient(circle, #ff0000, #00ff2a, #e600ff);
        animation: backgroundCycle 24s infinite;
        filter: hue-rotate(0deg);

        .text-content {
          position: relative;
          top: 2px;
        }
      }
    }
  }

  @keyframes backgroundCycle {
    0% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(360deg);
    }
    100% {
      filter: hue-rotate(0deg);
    }
  }
</style>
