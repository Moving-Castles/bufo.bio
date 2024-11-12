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
		Texture,
		Clock
	} from 'three'
	import vertexShader from '$lib/glsl/a.vert'
	import bufferShader from '$lib/glsl/a.frag'
	import screenShader from '$lib/glsl/b.frag'
	import { seedToRGB, seedToModifier } from '$lib/modules/utils'

	interface BufferUniforms {
		resolution: Vector2
		time: number,
		buffer: Texture,
		beauty: Vector2,
		complexity: number,
		personality: Vector3,
		rarity: Vector3,
	}

	interface ScreenUniforms {
		resolution: Vector2,
		time: number,
		buffer: Texture,
		personality: Vector3,
		rarity: Vector3,
	}

	export let mode: 'full' | 'preview'

	export let seed: string

	const personality: Vector3 = new Vector3(
		...seedToRGB(seed.slice(0, 8)).map(x => x / 255)
	)

	const rarity: Vector3 = new Vector3(
		...seedToRGB(seed.slice(8, 16), false).map(x => x / 255)
	)

	const beauty: Vector2 = new Vector2(
		seedToModifier(seed.slice(0, 8)),
		seedToModifier(seed.slice(8, 16))
	)

	console.log(beauty)

	const complexity: number = seedToModifier(seed.slice(0, 16))

	const { renderer, size, camera } = useThrelte()

	const clock: Clock = new Clock()

	let time: number
	let resolution: Vector2
	let bufferUniforms: BufferUniforms
	let screenUniforms: ScreenUniforms

	size.subscribe(({ width, height }) => {
		const ratio = renderer?.getPixelRatio() || 1
		resolution = new Vector2($size.width * ratio, $size.height * ratio)

		if (screenUniforms && bufferUniforms) {
			screenUniforms['resolution']['value'] = resolution
			bufferUniforms['resolution']['value'] = new Vector2(resolution.x * 1.0, resolution.y * 1.0)
		}
	})

	bufferUniforms = {
		resolution: new Uniform(new Vector2(resolution.x * 1.0, resolution.y * 1.0)),
		time: new Uniform(0),
		buffer: new Uniform(new Texture()),
		complexity: new Uniform(complexity),
		personality: new Uniform(personality),
		beauty: new Uniform(beauty),
		rarity: new Uniform(rarity),
	}

	console.log(complexity)

	screenUniforms = {
		resolution: new Uniform(resolution),
		time: new Uniform(0),
		buffer: new Uniform(new Texture()),
		personality: new Uniform(personality),
		rarity: new Uniform(rarity),
	}

	const bufferA = useFBO(
		resolution.x * 1.0,
		resolution.y * 1.0,
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

	useTask((delta) => {
		renderer.setRenderTarget(writeBuffer)
		renderer.render(bufferScene, $camera)
	
		const temp = readBuffer
		readBuffer = writeBuffer
		writeBuffer = temp

		screenUniforms.buffer.value = readBuffer.texture
		bufferUniforms.buffer.value = readBuffer.texture

		time = clock.getElapsedTime()

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

