<script lang="ts">
  import { onMount } from "svelte"
  import { zupassClient } from "$lib/stores"
  import { goto } from "$app/navigation"
  import {
    FROG_COLLECTION_ID,
    FROGCRYPTO_URL,
    SUBSTANCE_COLLECTION_ID,
    SYNTHESIS_SERVER_URL,
  } from "$lib/constants"
  import type { FrogPodType, SubstancePodType } from "$lib/types"
  import { FROG_QUERY } from "$lib/modules/zupass"
  import { convertBigIntsToNumbers } from "$lib/modules/utils"

  import NavBar from "$lib/components/navigation/NavBar.svelte"
  import FrogSelector from "$lib/components/lab/FrogSelector.svelte"
  import FrogPod from "$lib/components/pods/FrogPod.svelte"
  import SubstancePod from "$lib/components/pods/SubstancePod.svelte"

  import { frogOne, frogTwo, newSubstance } from "$lib/stores"

  let userFrogs: FrogPodType[] = []

  async function synthesize() {
    if (!$zupassClient || !$frogOne || !$frogTwo) {
      return
    }

    const userSemaphoreCommitment = String(
      await $zupassClient.identity.getSemaphoreV4Commitment()
    )

    const data = {
      frogOne: convertBigIntsToNumbers($frogOne),
      frogTwo: convertBigIntsToNumbers($frogTwo),
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
        pod_type: { type: "string", value: "shulgin.engineering.substance" },
        name: { type: "string", value: responseData.entries.name },
        imageUrl: {
          type: "string",
          value: responseData.entries.imageUrl,
        },
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

    newSubstance.set(compPod)
    frogOne.set(null)
    frogTwo.set(null)
  }

  async function save() {
    if (!$zupassClient || !$newSubstance) {
      return
    }
    await $zupassClient.pod
      .collection(SUBSTANCE_COLLECTION_ID)
      .insert($newSubstance)

    newSubstance.set(null)
    goto("/storage")
  }

  async function discard() {
    newSubstance.set(null)
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
  {#if $newSubstance}
    <div class="new-substance">
      <div class="header">new substance</div>
      <SubstancePod substance={$newSubstance} />
      <div class="actions">
        <button on:click={save}>save</button>
        <button on:click={discard}>discard</button>
      </div>
    </div>
  {:else if userFrogs.length > 0}
    <div class="header">select two frogs to synthesize substance</div>

    <!-- FROG ONE SELECTOR -->
    {#if $frogOne === null}
      <FrogSelector
        index={1}
        {userFrogs}
        on:select={e => {
          frogOne.set(e.detail)
        }}
      />
    {:else}
      <FrogPod frog={$frogOne} interactive={false} />
    {/if}

    <!-- FROG TWO SELECTOR -->
    {#if $frogTwo === null}
      <FrogSelector
        index={2}
        {userFrogs}
        on:select={e => {
          frogTwo.set(e.detail)
        }}
      />
    {:else}
      <FrogPod frog={$frogTwo} interactive={false} />
    {/if}

    {#if $frogOne && $frogTwo}
      <button class="big-button" on:click={synthesize}>
        synthesize substance
      </button>
    {/if}
  {:else}
    no frogs found. aquire specimens
    <a href={FROGCRYPTO_URL} target="_blank">here</a>.
  {/if}
</div>

<style lang="scss">
  .new-substance {
    .actions {
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        width: 50%;
        height: 40px;

        &:first-child {
          margin-right: 5px;
        }

        &:last-child {
          margin-left: 5px;
        }
      }
    }
  }
</style>
