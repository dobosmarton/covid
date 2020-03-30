module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['next/babel', { 'preset-env': { useBuiltIns: 'usage', corejs: '3.0.0' }, 'transform-runtime': {} }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ];

  const plugins = [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ];

  return {
    presets,
    plugins,
    env: {
      prod: {
        plugins: ['transform-remove-console'],
      },
    },
  };
};
