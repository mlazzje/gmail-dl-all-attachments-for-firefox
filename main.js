// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Create a page-mod
pageMod.PageMod({
  include: [
    "https://mail.google.com/*",
    "https://inbox.google.com/*",
  ],
  contentStyleFile: "./css/styles.css",
  contentScriptFile: [
    "./js/lib/google-analytics-bundle.js",
    "./js/lib/inboxsdk.js",
    "./js/util.js",
    "./js/app.js"
  ]
});
