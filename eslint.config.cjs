const js = require("@eslint/js");
const globals = require("globals");
const googleappsscript = require("eslint-plugin-googleappsscript");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "Archive/**",
      "archive/**",
      "Report/**",
      "reports/**",
      "dist/**",
      "build/**",
      "coverage/**"
    ]
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,gs}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",

      globals: {
        ...globals.es2021,
        ...googleappsscript.environments.googleappsscript.globals
      }
    },

    rules: {
      "no-undef": "error",

      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          varsIgnorePattern:
            "^(onEdit|onOpen|onInstall|doGet|doPost)$|^_.+|.*_$"
        }
      ],

      "no-redeclare": "error"
    }
  }
];
