module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": {
        "window": true,
        "document": true,
    },
	"rules": {
      'no-console': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
};