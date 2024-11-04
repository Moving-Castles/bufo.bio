import type { FrogPodType } from "$lib/types";

async function hashValues(values: (string | number | bigint)[]): Promise<number> {
    const encoder = new TextEncoder();
    // Convert each BigInt to a number if needed, then join all values into a single string
    const data = values.map(value => typeof value === 'bigint' ? Number(value) : value).join('');
    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = new Uint8Array(hashBuffer);

    // Combine the first two bytes to get a 16-bit number
    return (hashArray[0] << 8) | hashArray[1];
}

function toNumber(value: number | bigint): number {
    return typeof value === 'bigint' ? Number(value) : value;
}

export async function createSubstanceHash(frog1: FrogPodType, frog2: FrogPodType): Promise<string> {
    // 1. Generate PERSONALITY hash using combined data from both frogs
    const personalityHash = await hashValues([
        frog1.entries.name.value,
        toNumber(frog1.entries.biome.value),
        toNumber(frog1.entries.temperament.value),
        frog2.entries.name.value,
        toNumber(frog2.entries.biome.value),
        toNumber(frog2.entries.temperament.value),
    ]);

    // 2. Calculate RARITY as the sum of both objects' rarity, masked to 16 bits
    const rarity = (toNumber(frog1.entries.rarity.value) + toNumber(frog2.entries.rarity.value)) & 0xFFFF;

    // 3. Calculate BEAUTY as the sum of both objects' beauty, masked to 16 bits
    const beauty = (toNumber(frog1.entries.beauty.value) + toNumber(frog2.entries.beauty.value)) & 0xFFFF;

    // 4. Calculate COMPLEXITY as the sum of intelligence, speed, and jump, masked to 16 bits
    const complexity = (
        toNumber(frog1.entries.intelligence.value) +
        toNumber(frog2.entries.intelligence.value) +
        toNumber(frog1.entries.speed.value) +
        toNumber(frog2.entries.speed.value) +
        toNumber(frog1.entries.jump.value) +
        toNumber(frog2.entries.jump.value)
    ) & 0xFFFF;

    // Combine all four 16-bit segments into a single 64-bit hex value
    const hexValue = (
        (BigInt(personalityHash) << 48n) |
        (BigInt(rarity) << 32n) |
        (BigInt(beauty) << 16n) |
        BigInt(complexity)
    ).toString(16).padStart(16, '0'); // Convert to hex and pad to ensure 16 characters

    return hexValue;
}
