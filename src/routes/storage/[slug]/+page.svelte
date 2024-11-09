<script lang="ts">
  import Metadata from "$lib/components/metadata/Metadata.svelte"
  import Viewer from "$lib/components/storage/Viewer.svelte"
  import { createName } from "$lib/modules/utils"
  export let data: { seed: string }
  const { seed } = data
</script>

<Metadata title={createName(seed)} />
<Viewer {seed} />
