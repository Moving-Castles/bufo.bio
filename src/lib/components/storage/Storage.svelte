<script lang="ts">
  import { onMount } from "svelte"
  import { zupassClient } from "$lib/stores"
  import { goto } from "$app/navigation"
  import { SUBSTANCE_COLLECTION_ID } from "$lib/constants"
  import * as p from "@parcnet-js/podspec"
  import SubstancePod from "./SubstancePod.svelte"

  let pods: any[] = []

  onMount(async () => {
    if (!$zupassClient) {
      goto("/")
      return
    }

    const query = p.pod({
      entries: {
        seed: { type: "string" },
      },
    })

    pods = await $zupassClient.pod
      .collection(SUBSTANCE_COLLECTION_ID)
      .query(query)

    console.log("pods", pods)
  })
</script>

<div class="introduction">
  <h1>Storage</h1>
  <a href="/lab">Lab</a>
</div>

<div class="list">List of substances...</div>
<div>
  {#each pods as pod}
    <SubstancePod {pod} />
  {/each}
</div>

<style lang="scss">
</style>
