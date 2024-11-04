import type { Zapp } from "@parcnet-js/app-connector"

  // export const zupassClientUrl = "https://zupass.org"
export const zupassClientUrl = "https://staging.zupass.org"

export const FROG_COLLECTION_ID = "FrogCrypto (alpha)"
export const SUBSTANCE_COLLECTION_ID = "MC_TEST_SUBSTANCE"

export const bufoZapp: Zapp = {
    name: "BufoTest",
    permissions: {
      READ_POD: { collections: [FROG_COLLECTION_ID, SUBSTANCE_COLLECTION_ID] },
      SIGN_POD: {},
      INSERT_POD: { collections: [SUBSTANCE_COLLECTION_ID] },
      READ_PUBLIC_IDENTIFIERS: {},
    },
  }

  export const appConnectorElementId = "parcnet-app-connector"

