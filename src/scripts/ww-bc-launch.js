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

  // hide placeholder
  document.getElementsByTagName('body')[0].addEventListener('click', function(event) {
    if (event.target.classList.contains('bc-input-label')) {
      var input = document.querySelector('.bc-input-placeholder');
      input.addEventListener('keyup', function() { hideLabel(this) });
      input.addEventListener('onblur', function() { hideLabel(this) });
    }
  });

  var hideLabel = function(obj) {
    if (obj.querySelector('input').value !== '') {
      obj.querySelector('.bc-input-label').style.display = 'none';
    } else {
      obj.querySelector('.bc-input-label').style.display = 'block';
    }
  };

  // static parameters provided by boldchat - these shouldn't really change
  window._bcvma = window._bcvma || [];
  window._bcvma.push(['setAccountID', '151112516418848081']);
  window._bcvma.push(['setParameter', 'WebsiteID', '151836461122719597']);
  window._bcvma.push(['addFloat', { type: 'chat', id: '151836485762052957' }]);
  window._bcvma.push(['pageViewed']);

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
