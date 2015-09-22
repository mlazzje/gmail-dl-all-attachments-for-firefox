Promise.all([
  InboxSDK.load('1.0', 'sdk_mlazzje-dlgmail_43a7d41655')
])
.then(function(results){
  var sdk = results[0];

  var registerHandler = function() {
    sdk.Conversations.registerMessageViewHandler(messageViewHandler);
  };

  var messageViewHandler = function(messageView) {
    if(messageView.isLoaded()) {
      // Add CustomAttachmentsToolbarButton to the given message view.
      addCustomAttachmentsToolbarButton(messageView);
    }
  };

  var addCustomAttachmentsToolbarButton = function(messageView) {
    var options = {
      tooltip: 'Download all',
      iconUrl: chrome.runtime.getURL('img/save.png'),
      onClick: handleAttachmentsButtonClick
    };

    messageView.addAttachmentsToolbarButton(options);
  };

  var handleAttachmentsButtonClick = function(event) {
    var downloadUrls = [];

    // Iterate over attachmentCardViews array to get URL's.
    event.forEach(function(attachmentCardView, index) {
      
      var currentElement = attachmentCardView.getElement();

      if(typeof currentElement !== 'undefined') {
        var downloadUrl = currentElement.getAttribute('download_url');

        if(downloadUrl) {
          var striped = stripUrl(downloadUrl);

          if(striped) {
            downloadUrls.push(downloadUrl);
          }
        }
      }
    });

    // Download
    processMultipleFilesDownload(downloadUrls, 1000);
  }

  // Run.
  registerHandler();
});
