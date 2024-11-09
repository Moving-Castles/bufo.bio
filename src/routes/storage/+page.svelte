<script lang="ts">
  import Metadata from "$lib/components/metadata/Metadata.svelte"
  import Storage from "$lib/components/storage/Storage.svelte"

  import { originPath } from "$lib/stores"
  originPath.set("/storage")
</script>

<Metadata />
<Storage />
