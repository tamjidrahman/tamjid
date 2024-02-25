const { sheriff } = require("eslint-config-sheriff");
const { defineFlatConfig } = require("eslint-define-config");

const sheriffOptions = {
  react: true,
  lodash: false,
  next: true,
  playwright: false,
  jest: false,
  vitest: false,
};

module.exports = defineFlatConfig([...sheriff(sheriffOptions)]);
