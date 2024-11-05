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