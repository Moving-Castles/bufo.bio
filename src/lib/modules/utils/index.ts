import randomColor from 'randomcolor'

type AnyObject = { [key: string]: any };

export function stringifyObject(obj: AnyObject): AnyObject | string {
  if (typeof obj === 'bigint') {
    return obj.toString(); // Convert BigInt to string
  } else if (Array.isArray(obj)) {
    return obj.map((item) => stringifyObject(item)); // Handle array recursively
  } else if (typeof obj === 'object' && obj !== null) {
    const result: AnyObject = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = stringifyObject(value); // Recursively process each property
    }
    return result;
  } else {
    return obj; // Return value as-is for non-BigInt primitives
  }
}

export function convertBigIntsToNumbers(obj: any): any {
  if (typeof obj === 'bigint') {
    // Convert BigInt to Number
    return Number(obj);
  } else if (Array.isArray(obj)) {
    // Recursively convert BigInts in arrays
    return obj.map((item) => convertBigIntsToNumbers(item));
  } else if (typeof obj === 'object' && obj !== null) {
    // Recursively convert BigInts in objects
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, convertBigIntsToNumbers(value)])
    );
  }
  // Return the value as-is if it's not an object, array, or BigInt
  return obj;
}

export function createName(seed: string): string {
  if (seed.length !== 16) {
    throw new Error("seed string must be 16 characters long.");
  }

  // Step 1: Divide seed into four groups
  const group1 = seed.slice(0, 4);  // "8f12"
  const group2 = seed.slice(4, 8);  // "0002"
  const group3 = seed.slice(8, 12); // "0002"

  // Group 1: Select from predefined array based on group1 value
  const nameArray = [
    "D", "ALP", "FID", "GA", "C", "CC", "DOM", "BOM", "BUF", "DES", "T", "N", "XXX", "TSLA", 
    "BOZ", "BIZ", "MD", "CLAW", "DM", "ME", "DOT", "PROP", "TA", "TB", "TO", "MEM", "DMZ", "MA", 
    "IRIS", "PHO", "FO", "HOT", "TOH", "EM", "FEM", "BRO", "NEO", "NEVO", "NEMO", "PCD", "XOR", "XOXO", "DMX", "BUFO", "BUG"
  ];
  const index1 = parseInt(group1, 16) % nameArray.length;
  const part1 = nameArray[index1];

  // Group 2: Rarity rating
  const value2 = parseInt(group2, 16);
  let part2: string;
  // If value2 is between 0 and 25, assign corresponding letter from A to Z
  if (value2 >= 0 && value2 <= 25) {
    part2 = String.fromCharCode(65 + value2);  // 65 is the ASCII value for 'A'
  } else {
    part2 = "OMEGA";  // For any value greater than 25, assign "OMEGA"
  }

  // Group: Beauty rating
  const part3 = parseInt(group3, 16);

  // Combine parts with dashes
  return `${part3}-${part2}-${part1.toUpperCase()}`;
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
  });
}

export function seedToRGB(seed: string, light: boolean = true) {
	const rgb = randomColor({	
		seed,
		format: 'rgbArray',
		luminosity: light ? 'bright' : 'dark',
	})

	return rgb
}

export function seedToModifier(seed: string) {
	const prime1 = 2147483647;
	const prime2 = 16777619;

	let hash = prime1;
	for (let i = 0; i < seed.length; i++) {
		const char = seed.charCodeAt(i);
		hash = (hash ^ char) * prime2;
	}
	hash = hash ^ (hash >>> 16);

	const normalized = (Math.abs(hash % 1000000)) / 1000000;
	return normalized;
}
