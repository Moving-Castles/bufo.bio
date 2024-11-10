<script lang="ts">
  import type { SubstancePodType } from "$lib/types"
  import { SUBSTANCE_COLLECTION_ID } from "$lib/constants"
  import { SUBSTANCE_QUERY } from "$lib/modules/zupass"
  import { zupassClient } from "$lib/stores"
  import { onMount } from "svelte"

  export let page: string

  let userSubstances: SubstancePodType[] = []

  onMount(async () => {
    if (!zupassClient) return

    userSubstances = await $zupassClient.pod
      .collection(SUBSTANCE_COLLECTION_ID)
      .query(SUBSTANCE_QUERY)
  })
</script>

<div class="navbar">
  <a href="/lab" class:active={page === "lab"}>lab</a>
  <a href="/storage" class:active={page === "storage"}>
    storage ({userSubstances.length ?? 0})
  </a>
</div>

<style lang="scss">
  .navbar {
    width: 100%;
    display: flex;
    margin-bottom: 20px;

    a {
      display: block;
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      color: var(--background);
      background: var(--color-mid);

      &.active {
        background: var(--color-light);
        font-weight: bold;
      }

      &:active {
        background: var(--foreground);
      }
    }
  }
</style>
