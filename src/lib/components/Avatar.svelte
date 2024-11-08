<script lang="ts">
  import type { ParcnetAPI } from "@parcnet-js/app-connector"
  import { onMount } from "svelte"

  export let zupassClient: ParcnetAPI

  let publicKey: string

  onMount(async () => {
    publicKey = await zupassClient.identity.getPublicKey()
  })
</script>

<div class="avatar">
  <div>
    <div>welcome,</div>
    <div>{publicKey}</div>
  </div>
</div>

<style lang="scss">
  .avatar {
    width: 100%;
    background-color: var(--foreground);
    color: var(--background);
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    word-break: break-all;
    font-size: var(--font-size-small);

    .strong {
      font-weight: bold;
    }
  }
</style>
