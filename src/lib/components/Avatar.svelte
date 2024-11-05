<script lang="ts">
  import type { ParcnetAPI } from "@parcnet-js/app-connector"
  import { onMount } from "svelte"

  export let zupassClient: ParcnetAPI

  let publicKey: string

  onMount(async () => {
    publicKey = await zupassClient.identity.getPublicKey()
    console.log(await zupassClient.identity.getSemaphoreV3Commitment())
    console.log(await zupassClient.identity.getSemaphoreV4Commitment())
  })
</script>

<div class="avatar">
  <div>
    <div>Welcome,</div>
    <div>{publicKey}</div>
  </div>
</div>

<style lang="scss">
  .avatar {
    width: 100%;
    background-color: #00ff00;
    color: var(--background);
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    word-break: break-all;
    font-size: 10px;

    .strong {
      font-weight: bold;
    }
  }
</style>
