import type { Zapp } from "@parcnet-js/app-connector"

export const FROGCRYPTO_URL = "https://frogcrypto.vercel.app/"
export const ZUPASS_CLIENT_URL = "https://staging.zupass.org"
// export const SYNTHESIS_SERVER_URL = "http://localhost:4001"
export const SYNTHESIS_SERVER_URL = "https://synthesis.mc-infra.com"


export const FROG_COLLECTION_ID = "FrogCrypto (alpha)"
export const SUBSTANCE_COLLECTION_ID = "MC_TEST_SUBSTANCE_2"

export const bufoZapp: Zapp = {
    name: "BufoTest",
    permissions: {
      READ_POD: { collections: [FROG_COLLECTION_ID, SUBSTANCE_COLLECTION_ID] },
      INSERT_POD: { collections: [SUBSTANCE_COLLECTION_ID] },
      READ_PUBLIC_IDENTIFIERS: {},
    },
  }

  export const appConnectorElementId = "parcnet-app-connector"

