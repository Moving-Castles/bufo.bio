<script lang="ts">
  import Lab from "$lib/components/lab/Lab.svelte"
  import Metadata from "$lib/components/metadata/Metadata.svelte"
  import { originPath } from "$lib/stores"
  originPath.set("/lab")
</script>

<Metadata />
<Lab />
