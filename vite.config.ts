import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import rollupNodePolyfills from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [
		sveltekit(),
		// Polyfill Node.js globals for browser
		NodeGlobalsPolyfillPlugin({
		  buffer: true
		})
	  ],
	  resolve: {
		alias: {
		  buffer: 'buffer' // Ensure Vite knows to use the `buffer` polyfill
		}
	  },
	  optimizeDeps: {
		esbuildOptions: {
		  // Polyfill for `process` and other globals
		  define: {
			global: 'globalThis'
		  },
		  plugins: [
			// Polyfill Node.js globals
			NodeGlobalsPolyfillPlugin({
			  buffer: true
			})
		  ]
		}
	  },
	  build: {
		rollupOptions: {
		  plugins: [
			// Use rollup polyfills for Buffer
			rollupNodePolyfills()
		  ]
		}
	  }
});
