import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import preprocess from 'svelte-preprocess';
import fs from "fs";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	{
		input: 'src/main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'public/build/bundle.js'
		},
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					'nowhere': "javascript:void(0)"
				},
			}),
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				},
				preprocess: preprocess()
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	},
	{
		input: 'src/Injection/main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'injection',
			file: 'public/injection/bundle.js',
			banner: fs.readFileSync(path.join(__dirname, "src/Injection/metadata.js"))
		},
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					'nowhere': "javascript:void(0)"
				},
			}),
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				},
				preprocess: preprocess()
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public/injection'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production &&
			terser({
				format: {
					/*
					 * A nifty way to preserve comments (for QrowdifyExtension) in terser.
					 * @see https://github.com/TrySound/rollup-plugin-terser#comments
					 */
					comments: function (node, comment) {
						const { value, type } = comment;
						/==QrowdifyExtension==/.test(value) && (preserveComments = true);
						try {
							if (preserveComments) return value;
						} finally {
							/==\/QrowdifyExtension==/.test(value) && (preserveComments = false);
						}
					},
				},
			}),
		],
		watch: {
			clearScreen: true
		}
	}
];