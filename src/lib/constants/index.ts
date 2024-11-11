import type { Zapp } from "@parcnet-js/app-connector"

export const FROGCRYPTO_URL = "https://zupass.org/#/?folder=frogcrypto"
export const ZUPASS_CLIENT_URL = "https://zupass.org"
export const SYNTHESIS_SERVER_URL = "https://synthesis.mc-infra.com"

export const FROG_COLLECTION_ID = "FrogCrypto"
export const SUBSTANCE_COLLECTION_ID = "shulgin.engineering substance"

export const REVEAL_DELAY = 50

export const bufoZapp: Zapp = {
    name: "shulgin.engineering",
    permissions: {
      READ_PUBLIC_IDENTIFIERS: {},
      READ_POD: { collections: [FROG_COLLECTION_ID, SUBSTANCE_COLLECTION_ID] },
      INSERT_POD: { collections: [SUBSTANCE_COLLECTION_ID] },
      // DELETE_POD: { collections: [SUBSTANCE_COLLECTION_ID] },
    },
  }

  export const appConnectorElementId = "parcnet-app-connector"