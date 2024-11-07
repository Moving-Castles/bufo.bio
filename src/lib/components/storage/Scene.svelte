<script lang="ts">
	import { onMount } from 'svelte'
  import { T, useTask, useThrelte } from '@threlte/core'
	import { useFBO } from '@threlte/extras'
	import {
		Vector2,
		Vector3,
		RGBAFormat,
		FloatType,
		LinearFilter,
		NearestFilter,
		ClampToEdgeWrapping,
		Scene,
		Mesh,
		PlaneGeometry,
		ShaderMaterial,
		Uniform,
		Texture
	} from 'three'
	import vertexShader from '$lib/glsl/a.vert'
	import bufferShader from '$lib/glsl/a.frag'
	import screenShader from '$lib/glsl/b.frag'

	interface BufferUniforms {
		resolution: Vector2
		time: number,
		buffer: Texture,
		warp: Vector2,
	}

	interface ScreenUniforms {
		resolution: Vector2,
		time: number,
		buffer: Texture,
		color1: Vector3,
		color2: Vector3,
	}
	
	export let mode: 'full' | 'preview'

	export let seed: string

	const color1: Vector3 = new Vector3(0.95, 0.95, 0.43)
	const color2: Vector3 = new Vector3(1.0, 0.25, 0.2)
	const warp: Vector2 = new Vector2(50.0, 25.0)

	const { renderer, size, camera } = useThrelte()

	let resolution: Vector2
	let bufferUniforms: BufferUniforms
	let screenUniforms: ScreenUniforms

	size.subscribe(({ width, height }) => {
		const ratio = renderer?.getPixelRatio() || 1
		resolution = new Vector2($size.width * ratio, $size.height * ratio)

		if (screenUniforms && bufferUniforms) {
			screenUniforms['resolution']['value'] = resolution
			bufferUniforms['resolution']['value'] = resolution
		}
	})

	bufferUniforms = {
		resolution: new Uniform(resolution),
		time: new Uniform(0),
		buffer: new Uniform(new Texture()),
		warp: new Uniform(warp),
		buffer: new Uniform(new Texture()),
	}

	screenUniforms = {
		resolution: new Uniform(resolution),
		time: new Uniform(0),
		buffer: new Uniform(new Texture()),
		color1: new Uniform(color1),
		color2: new Uniform(color2),
	}

	const bufferA = useFBO(
		resolution.x,
		resolution.y,
		{
			format: RGBAFormat,
			type: FloatType,
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			wrapS: ClampToEdgeWrapping,
			wrapT: ClampToEdgeWrapping,
		}
	)

	const bufferB = bufferA.clone()

	const bufferScene = new Scene()
	const bufferMaterial = new ShaderMaterial({
		vertexShader,
		fragmentShader: bufferShader,
		uniforms: bufferUniforms,
	})
	const bufferGeometry = new PlaneGeometry(2, 2, 1, 1)
	const bufferPlane = new Mesh(bufferGeometry, bufferMaterial)
	bufferScene.add(bufferPlane)

	let writeBuffer = bufferA
	let readBuffer = bufferB
	screenUniforms.buffer.value = readBuffer.texture
	bufferUniforms.buffer.value = readBuffer.texture

	let time = 0

	useTask((delta) => {
		time += delta

		renderer.setRenderTarget(writeBuffer)
		renderer.render(bufferScene, $camera)
	
		const temp = readBuffer
		readBuffer = writeBuffer
		writeBuffer = temp

		screenUniforms.buffer.value = readBuffer.texture
		bufferUniforms.buffer.value = readBuffer.texture

		screenUniforms.time.value = time
		bufferUniforms.time.value = time

		$camera.updateProjectionMatrix()

		renderer.setRenderTarget(null)
	})

	const cleanup = () => {
		renderer?.dispose()
		bufferA?.dispose()
		bufferB?.dispose()
	}
 
	onMount(() => cleanup)
</script>

<T.OrthographicCamera
  makeDefault
	args={[-1, 1, 1, -1, 0, 1]}
	positionc={[0, 0, 0.1]}
	/>

<T.Mesh>
  <T.PlaneGeometry args={[2, 2, 1, 1]} />
  <T.ShaderMaterial
		fragmentShader={screenShader}
    vertexShader={vertexShader}
		uniforms={screenUniforms}
	/>
</T.Mesh>

