// import { PRIVATE_KEY } from '$env/static/private';
import type { FrogPodType } from '$lib/types';
import { POD } from "@pcd/pod";
import type { PODEntries } from "@pcd/pod";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log(data);
        const frogOne: FrogPodType = data.get('frogOne');
        const frogTwo: FrogPodType = data.get('frogTwo');

        const podData: PODEntries = {
            pod_type: { type: "string", value: "substancePod"},
            name: { type: "string", value: "Test substance"},
            seed: { type: "string", value: "0x12345"},
            timestampSigned: { type: "int", value: BigInt(Date.now())},
        }

        // PODs are signed using EdDSA signatures, which are easy to check in a
        // ZK circuit.  Our private keys can be any 32 bytes encoded as Base64 or hex.
        const privateKey = "ASNFZ4mrze8BI0VniavN7wEjRWeJq83vASNFZ4mrze8";

        // Signing a POD is usually performed in a single step like this.  No need
        // to go through the PODContent class.
        const signedPod = POD.sign(podData, privateKey);

        //     const signedPOD = await z.pod.sign(data)
        //     console.log("signedPOD", signedPOD)
        //     // Will print the unique signature of the POD:
        //     console.log(signedPOD.signature)
        //   }

        return {
            statusCode: 400,
            body: JSON.stringify({ result: "error"}),
        };
    }
};