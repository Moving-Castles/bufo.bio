import { connect } from "@parcnet-js/app-connector"
import type { ParcnetAPI } from "@parcnet-js/app-connector" 
import { bufoZapp, appConnectorElementId, zupassClientUrl } from "$lib/constants"

export async function connectToZupass(): Promise<ParcnetAPI | null> {
  const element = document.getElementById(appConnectorElementId) as HTMLElement
  const zupassClient = await connect(bufoZapp, element, zupassClientUrl)
  return zupassClient
}

//   export async function createPod() {
//     if (!z) {
//       return
//     }

//     const data = {
//       greeting: { type: "string", value: "Hello, world" },
//       magic_number: { type: "int", value: 1337n },
//       email_address: { type: "string", value: "test@example.com" },
//     }

//     const signedPOD = await z.pod.sign(data)

//     console.log("signedPOD", signedPOD)

//     // Will print the unique signature of the POD:
//     console.log(signedPOD.signature)

//     await z.pod.collection("MC_Test").insert(signedPOD)
//   }