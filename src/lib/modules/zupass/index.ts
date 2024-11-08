import { connect } from "@parcnet-js/app-connector"
import type { ParcnetAPI } from "@parcnet-js/app-connector" 
import { bufoZapp, appConnectorElementId, ZUPASS_CLIENT_URL } from "$lib/constants"

export const SUBSTANCE_QUERY = {
  schema: {
      entries: {
          pod_type: {
              type: "string",
              isMemberOf: [
                  {
                      type: "string",
                      value: "shulgin.engineering.substance"
                  }
              ]
          }
      }
  }
}

export const FROG_QUERY = {
  schema: {
      entries: {
          pod_type: {
              type: "string",
              isMemberOf: [
                  {
                      type: "string",
                      value: "frogcrypto.frog"
                  }
              ]
          }
      }
  }
}

export async function connectToZupass(): Promise<ParcnetAPI | null> {
  const element = document.getElementById(appConnectorElementId) as HTMLElement
  const zupassClient = await connect(bufoZapp, element, ZUPASS_CLIENT_URL)
  return zupassClient
}