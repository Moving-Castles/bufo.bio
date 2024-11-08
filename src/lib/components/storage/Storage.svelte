<script lang="ts">
  import { onMount } from "svelte"
  import { zupassClient } from "$lib/stores"
  import { goto } from "$app/navigation"
  import { SUBSTANCE_COLLECTION_ID } from "$lib/constants"
  import SubstancePod from "../pods/SubstancePod.svelte"
  import { SUBSTANCE_QUERY } from "$lib/modules/zupass"

  import NavBar from "$lib/components/navigation/NavBar.svelte"

  let substances: any[] = []

  onMount(async () => {
    if (!$zupassClient) {
      goto("/")
      return
    }

    substances = await $zupassClient.pod
      .collection(SUBSTANCE_COLLECTION_ID)
      .query(SUBSTANCE_QUERY)
  })
</script>

<NavBar page="storage" />

<div>
  <div class="header">
    {#if substances.length === 0}
      <p>no substances in storage. go to the lab.</p>
    {:else}
      substances in storage: {substances.length ?? 0}
    {/if}
  </div>

  {#each substances.reverse() as substance}
    <SubstancePod {substance} />
  {/each}
</div>
