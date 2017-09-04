import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		entry: 'tmp/src/main.js',
		dest: pkg.browser,
		format: 'umd',
		moduleName: 'howLongUntilLunch',
		plugins: [
			resolve(), // so Rollup can find `ms`
		]
	},
	{
		entry: 'src/main.ts',
		external: ['ms'],
		targets: [
			{ dest: pkg.main, format: 'cjs' },
			{ dest: pkg.module, format: 'es' }
		],
        plugins: [
            typescript(),
        ]
	}
];