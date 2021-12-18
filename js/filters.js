(function () {
  var count = 0;
  chrome.storage.sync.get(['coronaOn', 'data'], function (item) {
    var observer = new MutationObserver(function (mutations) {
      if (!item.coronaOn) {
        return;
      }

      var filterArray = [
        '#corona',
        '#coronavirus',
        '#covid',
        '#covid-19',
        '#itscoronatime',
        '#koronavirus',
        '#ncov-19',
        '#pandemic',
        '#stayathome',
        '#stayhome',
        '#virus',
        '2019-cov',
        '2019-ncov',
        '229E',
        'Hcov',
        'N95 respirator',
        'alphacoronavirus',
        'alphacoronaviruses',
        'asymptomatic',
        'bat',
        'bats',
        'bcv',
        'betacoronavirus',
        'betacoronaviruses',
        'bioweapon',
        'bioweapons',
        'birusa',
        'BioNTech',
        'Pfizer',
        'Moderna',
        'Sinovac',
        'Sinopharm',
        'Lockdown',
        'Impfflicht',
        'AstraZeneca',
        'Impfgegner',
        'co-19',
        'corona',
        'coronafirws',
        'coronav',
        'coronavirus ',
        'cov',
        'cov-19',
        'covid variant',
        'covid variants',
        'covid',
        'covid-19',
        'covid19 variant',
        'deltacoronavirus',
        'deltacoronaviruses',
        'disease',
        'diseases',
        'epidemic',
        'epidemics',
        'epidemiologic',
        'gammacoronavirus',
        'gammacoronaviruses',
        'h-cov',
        'hcu1',
        'herd immunity',
        'incubation period',
        'infection',
        'infections',
        'mask',
        'maska',
        'masks',
        'mers',
        'mers-cov',
        'msc',
        'ncov-19',
        'nidovirales',
        'nl63',
        'novel strain',
        'omicron variant',
        'omicron',
        'oniro-arun',
        'orthocoronavirinae',
        'outbreak',
        'outbreaks',
        'pandemic',
        'pandemic-induced',
        'patient zero',
        'pneumonia',
        'presymptomatic',
        'quarantine',
        'quarantine',
        'respiratory',
        'sars-cov',
        'sars-cov-2',
        'vaccinate',
        'vaccinated',
        'vaccination',
        'vaccinations',
        'vaccine',
        'vaccines',
        'virus',
      ];

      mutations.forEach(function (mutation) {
        var newNodes = mutation.addedNodes;
        if (newNodes !== null) {
          if (document.querySelector('.userContentWrapper') == null) {
            //fn
            var nodes = document.querySelectorAll('[role="article"]');
          } else {
            //fo
            var nodes = document.querySelectorAll('.userContentWrapper');
          }
          for (var ii = 0, nn = nodes.length; ii < nn; ii++) {
            var text = nodes[ii] ? nodes[ii].textContent.toLowerCase() : '';
            for (var filterItem in filterArray) {
              if (
                text &&
                text.indexOf(filterArray[filterItem].toLowerCase()) >= 0 &&
                nodes[ii].style.display != 'none'
              ) {
                nodes[ii].style.display = 'none';
                count += 1;
                chrome.runtime.sendMessage({ badgeText: String(count) });
              }
            }
          }
        }
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
      case 'getCount':
        sendResponse(count);
        break;
      default:
        console.error('Unrecognised message: ', message);
    }
    return true;
  });
})();
