<script lang="ts">
  import type { ParcnetAPI } from "@parcnet-js/app-connector"
  import { onMount } from "svelte"

  export let zupassClient: ParcnetAPI

  let publicKey: string

  onMount(async () => {
    publicKey = await zupassClient.identity.getPublicKey()
  })
</script>

<div class="avatar">{publicKey}</div>

<style lang="scss">
  .avatar {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #00ff00;
    color: var(--background);
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    word-break: break-all;
    font-size: 10px;
  }
</style>
