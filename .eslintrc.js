module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react-native/no-inline-styles': 'off', // Desativa a proibição de estilos inline
    // Outras regras personalizadas podem ser adicionadas aqui
  },
};
