module.exports = {
    "extends": "airbnb-base",
    "plugins": [],
    "rules": {
      "func-names": "off",
      "strict": "off",
      "prefer-rest-params": "off",
      "import/no-extraneous-dependencies" : "off",
      "comma-dangle": ["error", "only-multiline"]
    },
    "env": {
         "mocha": true
     }
  };