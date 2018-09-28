/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  console.log('Listening...');

  document.addEventListener("click", (e) => {
    console.log('Begin addEventListener');

    let err = console.error;

    function dumbifyTabs(tabs) {
      console.log('Sending message');
      browser.tabs.sendMessage(tabs[0].id, {
        command: "dumbify",
      });

    }
    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("dumb")) {
      browser.tabs.query({
          active: true,
          currentWindow: true
        })
        .then(dumbifyTabs)
        .catch(err);
    } else {
      console.log('WTF SELECTOR!!');
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */

function reportExecuteScriptError(error) {
  console.log('Hellow');
  console.error(error);
  console.error(`Failed to execute dumbify content script: ${error.message}`);
  console.log('goodbye');
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

browser.tabs.executeScript({
    file: "../dumbify.js"
  })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);