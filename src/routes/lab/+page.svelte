<script lang="ts">
  import Lab from "$lib/components/lab/Lab.svelte"
  import { originPath } from "$lib/stores"
  originPath.set("/lab")
</script>

<Lab />
