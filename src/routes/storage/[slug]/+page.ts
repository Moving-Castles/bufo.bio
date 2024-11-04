import type { PageLoad } from './$types';

/** @type {import('./$types').PageLoad} */
export const load = (async ({params}) => {
    return { seed: params.slug };
}) satisfies PageLoad;