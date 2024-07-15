import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/don.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/don.amd.js',
      format: 'amd',
      sourcemap: true,
    },
    {
      file: 'dist/don.esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/don.umd.js',
      format: 'umd',
      name: 'Don',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      extensions: ['.js', '.ts'],
    }),
    terser()
  ]
};
