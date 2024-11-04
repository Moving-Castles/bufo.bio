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