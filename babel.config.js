const plugins = [
];

module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
  plugins,
};
