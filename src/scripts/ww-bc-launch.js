// Custom launch file currently used by IO
(function() {
  // snippet from BoldChat admin
  var bcLoad = function() {
    if (window.bcLoaded) return;
    window.bcLoaded = true;
    var vms = document.createElement('script'); vms.type = 'text/javascript'; vms.async = true;
    vms.onload = function() {
      if (!window.bcChatOpen) {
        showButton();
      }
    };
    vms.src = '//vmss.boldchat.com/aid/151112516418848081/bc.vms4/vms.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(vms, s);
  };
  // end snippet

  // custom function that determines if chat button should be shown
  var showButton = function() {
    var interval = 100;
    var maxTimeLimit = 10 * 1000;
    var currentTime = 0;
    var bcFloat;
    var intervalId = setInterval(function() {
      bcFloat = document.getElementsByClassName('bcFloat')[0];
      if (bcFloat && bcFloat.style.display === 'none') {
        bcFloat.style.display = 'block';
        clearInterval(intervalId);
      } else if (currentTime > maxTimeLimit) {
        clearInterval(intervalId);
      } else {
        currentTime += interval;
      }
    }, interval);
  };

  // static parameters provided by boldchat - these shouldn't really change
  window._bcvma = window._bcvma || [];
  window._bcvma.push(['setAccountID', '151112516418848081']);
  window._bcvma.push(['setParameter', 'WebsiteID', '151836461122719597']);
  window._bcvma.push(['pageViewed']);
  // button ID is now dynamic VS-10644
  // fall back is US button ID
  if (window._bcButtonId !== 'undefined') {
    window._bcvma.push(['addFloat', { type: 'chat', id: window._bcButtonId }]);
  } else {
    window._bcvma.push(['addFloat', { type: 'chat', id: '151996451744943758' }]);
  }

  if (window.pageViewer && pageViewer.load) {
    pageViewer.load();
  } else if (document.readyState === 'complete') {
    bcLoad();
  } else if (window.addEventListener) {
    window.addEventListener('load', bcLoad, false);
  } else {
    window.attachEvent('onload', bcLoad);
  }
})();
