export type FrogPodType = {
    entries: {
        beauty: { type: 'int', value: number },
        biome: { type: 'int', value: number },
        description: { type: 'string', value: string },
        frogId: { type: 'int', value: number },
        imageUrl: { type: 'string', value: string },
        intelligence: { type: 'int', value: number },
        jump: { type: 'int', value: number },
        name: { type: 'string', value: string },
        owner: { type: 'cryptographic', value: number },
        pod_type: { type: 'string', value: string },
        rarity: { type: 'int', value: number },
        speed: { type: 'int', value: number },
        temperament: { type: 'int', value: number },
        timestampSigned: { type: 'int', value: number }
    },
    signature: string,
    signerPublicKey: string
  };

  export type SubstancePodType = {
    entries: {
        pod_type: { type: 'string', value: "shulgin.engineering.substance" },
        name: { type: 'string', value: string },
        imageUrl: { type: 'string', value: string },
        seed: { type: 'string', value: string },
        timestampSigned: { type: 'int', value: number }
        owner: { type: 'cryptographic', value: number }
    },
    signature: string,
    signerPublicKey: string
  };