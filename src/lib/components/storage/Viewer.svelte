<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from '$lib/components/storage/Scene.svelte'

  export let seed: string
	export let mode: 'full' | 'preview' = 'full'
</script>

<div
	class="viewer"
	class:viewer--full={mode == 'full'}
	class:viewer--preview={mode == 'preview'}
	>
	<Canvas>
		<Scene
			{seed}
			{mode}
			/>
	</Canvas>
</div>

<style lang="scss">
  .viewer {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
  }

	.viewer--full {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}

	.viewer--preview {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>

