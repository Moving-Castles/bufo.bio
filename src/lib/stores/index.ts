import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { State } from "$lib/enums";
import type { ParcnetAPI } from "@parcnet-js/app-connector";

export const uiState: Writable<State> = writable(State.Connect);
export const zupassClient: Writable<ParcnetAPI | null> = writable(null);