const plugins = [
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
];

if(process.env.NODE_ENV === 'production') {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins,
};
