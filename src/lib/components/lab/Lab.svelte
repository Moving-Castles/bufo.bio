<script lang="ts">
  import { onMount } from "svelte"
  import { zupassClient } from "$lib/stores"
  import { goto } from "$app/navigation"
  import FrogSelector from "$lib/components/lab/FrogSelector.svelte"
  import * as p from "@parcnet-js/podspec"
  import { FROG_COLLECTION_ID, SUBSTANCE_COLLECTION_ID } from "$lib/constants"
  import type { FrogPodType } from "$lib/types"
  import FrogPod from "$lib/components/lab/FrogPod.svelte"
  // import { stringifyObject } from "$lib/modules/utils"
  // import { POD } from "@pcd/pod"
  import type { PODEntries } from "@pcd/pod"
  import { browser } from "$app/environment"

  let userFrogs: FrogPodType[] = []

  let frogOne: FrogPodType | null = null
  let frogTwo: FrogPodType | null = null

  let podModule: any

  if (browser) {
    // POD
    import("@pcd/pod")
      .then(mod => {
        console.log(mod)
        podModule = mod
      })
      .catch(err => {
        console.error("Error loading pod module:", err)
      })
  }

  async function synthesize() {
    if (!$zupassClient) {
      return
    }

    console.log("Synthesizing", frogOne, frogTwo)

    const podData: PODEntries = {
      pod_type: { type: "string", value: "substancePod" },
      name: { type: "string", value: "Test substance" },
      seed: { type: "string", value: "0x12345" },
      timestampSigned: { type: "int", value: BigInt(Date.now()) },
    }

    // PODs are signed using EdDSA signatures, which are easy to check in a
    // ZK circuit.  Our private keys can be any 32 bytes encoded as Base64 or hex.
    const privateKey = "ASNFZ4mrze8BI0VniavN7wEjRWeJq83vASNFZ4mrze8"

    // Signing a POD is usually performed in a single step like this.  No need
    // to go through the PODContent class.
    const signedPod = podModule.POD.sign(podData, privateKey)

    const serializedPOD = JSON.stringify(signedPod.toJSON())

    console.log("signedPod", signedPod)
    console.log("serializedPOD", JSON.parse(serializedPOD))

    // const signedPod2 = await $zupassClient.pod.sign(podData)

    // console.log("signedPod2", signedPod2)

    const compPod = {
      entries: podData,
      signature: signedPod.signature,
      signerPublicKey: signedPod.signerPublicKey,
    }

    console.log("compPod", compPod)

    await $zupassClient.pod.collection(SUBSTANCE_COLLECTION_ID).insert(compPod)

    // const url = "/api/synthesize"

    // const formData = new URLSearchParams()
    // formData.append("frogOne", stringifyObject(frogOne))
    // formData.append("frogTwo", stringifyObject(frogTwo))

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: formData,
    //   })

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok")
    //   }
    //   let res = await response.json()
    //   console.log(res)
    // } catch (err) {
    //   console.error(err)
    // }
  }

  async function save() {
    if (!$zupassClient) {
      return
    }
    await $zupassClient.pod.collection("MC_Test").insert(signedPOD)
  }

  onMount(async () => {
    if (!$zupassClient) {
      goto("/")
      return
    }

    const query = p.pod({
      entries: {
        frogId: { type: "int" },
      },
    })

    userFrogs = await $zupassClient.pod
      .collection(FROG_COLLECTION_ID)
      .query(query)
  })
</script>

<div class="introduction">
  <h1>Lab</h1>
  <a href="/storage">Substance storage</a>
</div>

<div class="list">
  {#if userFrogs.length > 0}
    <!-- FROG ONE SELECTOR -->
    {#if frogOne === null}
      <FrogSelector
        {userFrogs}
        on:select={e => {
          console.log(e)
          frogOne = e.detail
        }}
      />
    {:else}
      <FrogPod frog={frogOne} />
    {/if}

    <!-- FROG TWO SELECTOR -->
    {#if frogTwo === null}
      <FrogSelector
        {userFrogs}
        on:select={e => {
          console.log(e)
          frogTwo = e.detail
        }}
      />
    {:else}
      <FrogPod frog={frogTwo} />
    {/if}

    {#if frogOne && frogTwo}
      <hr />
      <button type="button" on:click={synthesize}>Synthesize substance</button>
    {/if}
  {:else}
    No frogs found
  {/if}
</div>
