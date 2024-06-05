module.exports = {
  "printWidth": 80,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "importOrder": ["^react$", "^@/", "^\\.{1,2}/.+"],
  "importOrderSeparation": false,
  "overrides": [
    {
      "files": "*.ts",
      "options": {
        "parser": "typescript",
        "trailingComma": "all"
      }
    }
  ]
}