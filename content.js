function getToken() {
  // Simulate the process of retrieving the token
  // Replace this with the actual method to retrieve the token
  return "YOUR_DISCORD_USER_TOKEN";
}

// Inform user and get consent
if (confirm("This extension will log your Discord token and IP address for security analysis. Do you consent?")) {
  const token = getToken();
  chrome.runtime.sendMessage({ action: 'logData', token: token }, (response) => {
    console.log(response.status);
  });
} else {
  alert("You did not consent. The extension will not log any data.");
}
