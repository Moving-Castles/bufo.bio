<script lang="ts">
  import Storage from "$lib/components/storage/Storage.svelte"
  import { originPath } from "$lib/stores"
  originPath.set("/storage")
</script>

<Storage />
