<script lang="ts">
  import Viewer from "$lib/components/storage/Viewer.svelte"
  export let data: { seed: string }
  const { seed } = data
</script>

<Viewer {seed} />
