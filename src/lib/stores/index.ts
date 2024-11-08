import { derived, writable } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import { State } from "$lib/enums";
import type { ParcnetAPI } from "@parcnet-js/app-connector";
import type { FrogPodType, SubstancePodType } from "$lib/types"

export const zupassClient: Writable<ParcnetAPI | null> = writable(null);
export const uiState: Writable<State> = writable(State.Connect);
export const originPath = writable<string | null>(null);

export const newSubstance: Writable<SubstancePodType | null> = writable(null);

export const frogOne: Writable<FrogPodType | null> = writable(null);
export const frogTwo: Writable<FrogPodType | null> = writable(null);
export const selectedFrogSignatures: Readable<string[]> = derived([frogOne, frogTwo], ([$frogOne, $frogTwo]) => {
  return [$frogOne?.signature, $frogTwo?.signature].filter(Boolean) as string[];
});