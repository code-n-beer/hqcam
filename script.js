function feed() {
    document.getElementById('feed').src = "/latest.jpg?random="+new Date().getTime();
}

var update = window.setInterval(feed, 5000);

function offlineCheck() {
    var client = new XMLHttpRequest();
    client.open("HEAD", "latest.jpg", true);
    client.send();
    client.onreadystatechange = function() {
      if(this.readyState == this.HEADERS_RECEIVED) {
        var updated = Date.parse(client.getResponseHeader("Last-Modified"));
        var d = new Date();
        var notice = document.getElementById('offline');
        if(d.getTime() - updated > 30000) {
          notice.style.display = "block";
        } else {
          notice.style.display = "none";
        }
      }
    }
}

offlineCheck();
var offline = window.setInterval(offlineCheck, 60000);

function toggle() {
    var paused = document.getElementById('pause');
    if(paused.style.display === "none") {
        clearInterval(update);
        clearInterval(offline);
        paused.style.display = "block";
    } else {
        feed();
        paused.style.display = "none";
        update;
        offlineCheck();
        offline;
    }
}

//Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
