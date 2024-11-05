<script lang="ts">
  import { onMount } from "svelte"
  import { zupassClient } from "$lib/stores"
  import { goto } from "$app/navigation"
  import {
    FROG_COLLECTION_ID,
    SUBSTANCE_COLLECTION_ID,
    SYNTHESIS_SERVER_URL,
  } from "$lib/constants"
  import type { FrogPodType } from "$lib/types"
  import { FROG_QUERY } from "$lib/modules/zupass"
  import { convertBigIntsToNumbers } from "$lib/modules/utils"

  import NavBar from "$lib/components/navigation/NavBar.svelte"
  import FrogSelector from "$lib/components/lab/FrogSelector.svelte"
  import FrogPod from "$lib/components/lab/FrogPod.svelte"
  import SubstancePod from "$lib/components/storage/SubstancePod.svelte"

  let newSubstance: any = null

  let userFrogs: FrogPodType[] = []

  let frogOne: FrogPodType | null = null
  let frogTwo: FrogPodType | null = null

  async function synthesize() {
    if (!$zupassClient || !frogOne || !frogTwo) {
      return
    }

    const userSemaphoreCommitment = String(
      await $zupassClient.identity.getSemaphoreV4Commitment()
    )

    const data = {
      frogOne: convertBigIntsToNumbers(frogOne),
      frogTwo: convertBigIntsToNumbers(frogTwo),
      userSemaphoreCommitment: userSemaphoreCommitment,
    }

    const response = await fetch(`${SYNTHESIS_SERVER_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log(responseData)

    const compPod = {
      entries: {
        pod_type: { type: "string", value: "substancePod" },
        name: { type: "string", value: responseData.entries.name },
        seed: { type: "string", value: responseData.entries.seed },
        timestampSigned: {
          type: "int",
          value: BigInt(responseData.entries.timestampSigned),
        },
        owner: {
          type: "cryptographic",
          value: BigInt(userSemaphoreCommitment),
        },
      },
      signature: responseData.signature,
      signerPublicKey: responseData.signerPublicKey,
    }

    newSubstance = compPod
  }

  async function save() {
    if (!$zupassClient) {
      return
    }
    await $zupassClient.pod
      .collection(SUBSTANCE_COLLECTION_ID)
      .insert(newSubstance)
  }

  onMount(async () => {
    if (!$zupassClient) {
      goto("/")
      return
    }

    userFrogs = await $zupassClient.pod
      .collection(FROG_COLLECTION_ID)
      .query(FROG_QUERY)
  })
</script>

<NavBar page="lab" />

<div class="list">
  {#if newSubstance}
    <h2>New substance</h2>
    <SubstancePod substance={newSubstance} />
    <button type="button" on:click={save}>Save substance</button>
  {:else if userFrogs.length > 0}
    <!-- FROG ONE SELECTOR -->
    {#if frogOne === null}
      <FrogSelector
        index={1}
        {userFrogs}
        on:select={e => {
          frogOne = e.detail
        }}
      />
    {:else}
      <FrogPod frog={frogOne} />
    {/if}

    <hr />

    <!-- FROG TWO SELECTOR -->
    {#if frogTwo === null}
      <FrogSelector
        index={2}
        {userFrogs}
        on:select={e => {
          frogTwo = e.detail
        }}
      />
    {:else}
      <FrogPod frog={frogTwo} />
    {/if}

    <hr />

    {#if frogOne && frogTwo}
      <button type="button" on:click={synthesize}>Synthesize substance</button>
    {/if}
  {:else}
    No frogs found
  {/if}
</div>
