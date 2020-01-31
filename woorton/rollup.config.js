import sourcemaps from 'rollup-plugin-sourcemaps';
import node from 'rollup-plugin-node-resolve';

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}

export default () => [
  {
    input: 'lib/index.js',
    onwarn,
    output: [
      {
        file: 'lib/bundle.umd.js',
        format: 'umd',
        name: `woorton`,
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      node(),
      sourcemaps(),
    ],
  },
];
