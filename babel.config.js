'use strict'

module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false, // webpack understands the native import syntax and uses it for tree shaking
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-json-strings",
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-syntax-import-meta",
            
        ],
  env: {
    dev: {
      plugins: ["react-hot-loader/babel"]
    },
    test: {
      plugins: ["@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-json-strings",
                "@babel/plugin-transform-object-assign",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-syntax-import-meta",
            ],
      presets: [
        ["@babel/preset-env", {
          "targets": {
            "browsers": ["last 2 versions"]
          }
        }],
        "@babel/preset-react"
      ]
    }
  }
}