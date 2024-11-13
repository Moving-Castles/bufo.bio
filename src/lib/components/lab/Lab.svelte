<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { zupassClient } from "$lib/stores"
  import { goto } from "$app/navigation"
  import {
    FROG_COLLECTION_ID,
    FROGCRYPTO_URL,
    SUBSTANCE_COLLECTION_ID,
    SYNTHESIS_SERVER_URL,
  } from "$lib/constants"
  import type { FrogPodType } from "$lib/types"
  import { FROG_QUERY } from "$lib/modules/zupass"
  import { convertBigIntsToNumbers } from "$lib/modules/utils"
  import {
    frogOne,
    frogTwo,
    selectedFrogSignatures,
    newSubstance,
  } from "$lib/stores"

  import NavBar from "$lib/components/navigation/NavBar.svelte"
  import FrogSelector from "$lib/components/lab/FrogSelector.svelte"
  import FrogPod from "$lib/components/pods/FrogPod.svelte"
  import SubstancePod from "$lib/components/pods/SubstancePod.svelte"
  import Dots from "../Dots.svelte"
  import ResultSequence from "./ResultSequence.svelte"

  let userFrogs: FrogPodType[] = []
  let saving = false
  let synthesizing = false
  let result = false
  let compPod: any

  $: filteredFrogs = userFrogs.filter(frog => {
    return !$selectedFrogSignatures.includes(frog.signature)
  })

  async function synthesize() {
    if (!$zupassClient || !$frogOne || !$frogTwo) {
      return
    }

    synthesizing = true

    await new Promise(resolve => setTimeout(resolve, 1000))

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

    compPod = {
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

    frogOne.set(null)
    frogTwo.set(null)
    result = true
  }

  async function save() {
    if (!$zupassClient || !$newSubstance) {
      return
    }

    saving = true

    $zupassClient.pod.collection(SUBSTANCE_COLLECTION_ID).insert($newSubstance)

    // HACK
    await new Promise(resolve => setTimeout(resolve, 4000))

    newSubstance.set(null)
    goto("/storage")
  }

  async function discard() {
    newSubstance.set(null)
  }

  function resultSequenceDone() {
    result = false
    synthesizing = false
    newSubstance.set(compPod)
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
  {#if result}
    <!-- RESULT SEQUENCE -->
    <ResultSequence
      name={compPod?.entries?.name?.value ?? ""}
      on:done={resultSequenceDone}
    />
  {:else if $newSubstance}
    <!-- NEW SUBSTANCE -->
    <div class="new-substance">
      <div class="header" in:fade={{ duration: 200 }}>** new substance **</div>
      <div in:fade={{ duration: 200, delay: 500 }}>
        <SubstancePod substance={$newSubstance} />
      </div>
      <div class="actions" in:fade={{ duration: 200, delay: 1000 }}>
        <button class="save" on:click={save}>
          {#if saving}
            <Dots />
          {:else}
            save
          {/if}
        </button>
        <button class="discard" on:click={discard} class:disabled={saving}>
          discard
        </button>
      </div>
    </div>
  {:else if userFrogs.length > 0}
    <div class="header">select two frogs to synthesize substance</div>

    <!-- FROG ONE SELECTOR -->
    {#if $frogOne === null}
      <FrogSelector
        index={1}
        userFrogs={filteredFrogs}
        on:select={e => {
          frogOne.set(e.detail)
        }}
      />
    {:else}
      <FrogPod
        small
        index={1}
        frog={$frogOne}
        on:clear={e => {
          frogOne.set(null)
        }}
      />
    {/if}

    <!-- FROG TWO SELECTOR -->
    {#if $frogTwo === null}
      <FrogSelector
        index={2}
        userFrogs={filteredFrogs}
        on:select={e => {
          frogTwo.set(e.detail)
        }}
      />
    {:else}
      <FrogPod
        small
        index={2}
        frog={$frogTwo}
        on:clear={e => {
          frogTwo.set(null)
        }}
      />
    {/if}

    <!-- SYNTHESIZE BUTTON -->
    <div class="header">
      <button
        class="big-button glow-button"
        class:disabled={!$frogOne || !$frogTwo || synthesizing}
        on:click={synthesize}
      >
        {#if synthesizing}
          <Dots />
        {:else}
          ═╬═ synthesize ═╬═
        {/if}
      </button>
    </div>
  {:else}
    <div class="header">
      no frogs found. aquire specimens
      <a href={FROGCRYPTO_URL} target="_blank">here</a>.
    </div>
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

  .glow-button {
    // box-shadow: 0 0 20px 5px rgba(255, 0, 0, 1); /* yellow glow */
    // animation: backgroundCycle 12s infinite alternate;
    // font-family: var(--font-stack-alt);
    // font-size: 42px;
    font-weight: bold;
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

  // .glow-button:hover {
  //   background: radial-gradient(circle, #ff0000, #00ff2a, #e600ff);
  //   animation: backgroundCycle 4s infinite;
  //   filter: hue-rotate(0deg);
  // }

  .discard {
    font-weight: bold;

    &:active {
      background: var(--failure);
    }

    @media (min-width: 800px) {
      &:hover {
        background: var(--failure);
      }
    }
  }

  .save {
    font-weight: bold;

    &:active {
      background: var(--success);
    }

    @media (min-width: 800px) {
      &:hover {
        background: var(--success);
      }
    }
  }
</style>
