Components.utils.import("resource://data/js/lib/google-analytics-bundle.js");
Components.utils.import("resource://data/js/lib/inboxsdk.js");
Components.utils.import("resource://data/js/util.js");

var _ = require("sdk/l10n").get;

console.log("ok");

Promise.all([
  InboxSDK.load('1.0', 'sdk_mlazzje-dlgmail_43a7d41655')
])
.then(function(results){
  var service = analytics.getService('better_download_all_attachments_app');
  var tracker = service.getTracker('UA-67984409-1');
  var sdk = results[0];

  var registerHandler = function() {
    sdk.Conversations.registerMessageViewHandler(messageViewHandler);
  };

  var messageViewHandler = function(messageView) {
    if(messageView.isLoaded()) {
      // Add CustomAttachmentsToolbarButton to the given message view.
      addCustomAttachmentsToolbarButton(messageView);
      // Send to Analytics that the Button has been loaded
      tracker.sendAppView('ButtonView');
    }
  };

  var addCustomAttachmentsToolbarButton = function(messageView) {
    var options = {
      tooltip: _("tooltip"),
      iconUrl: './img/save.png',
      onClick: handleAttachmentsButtonClick
    };

    messageView.addAttachmentsToolbarButton(options);
  };

  var handleAttachmentsButtonClick = function(event) {
    var downloadUrls = [];

    // Send to Analytics that the Button has been clicked
    tracker.sendEvent('Button', 'DownloadAllAttachments', 'Init');
    // Iterate over attachmentCardViews array to get URL's.
    event.attachmentCardViews.forEach(function(attachmentCardView, index) {

      var currentElement = attachmentCardView;

      if(typeof currentElement !== 'undefined') {
        // Download the attachment
        currentElement.getDownloadURL().then(downloadAttachment);
      }
    });
  }

  // Run.
  registerHandler();
});
