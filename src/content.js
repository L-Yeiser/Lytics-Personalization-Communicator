/* global chrome */

function injectScript(targetScript) {
  const script = document.createElement('script');

  script.textContent = `(${targetScript.toString()}())`;
  document.documentElement.appendChild(script);
}

const addUpdateToursListener = function addUpdateToursListener() {
  window.addEventListener('message', ({ data: { type = '', tours }, source }) => {
    if (source !== window) { return; }
    if (type === 'UPDATE_TOUR') {
      // Update flags in lio
      tours.forEach((tour) => {
        window.jstag.send('app', {
          'personalization.flags': {
            key: tour,
            value: false,
          },
        });
      });

      // Update local copy of flags
      window.lio.data.personalization_flags = Object.assign(
        {},
        window.lio.data.personalization_flags,
        tours.reduce((accumulator, tour) => {
          // eslint-disable-next-line no-param-reassign
          accumulator[tour] = false;
          return accumulator;
        }, {}),
      );
    }
  });
};

injectScript(addUpdateToursListener);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.getTours) {
    window.addEventListener('message', ({ data: { type = '', tours }, source }) => {
      if (source !== window) { return; }

      if (type === 'TOUR_DATA') {
        sendResponse({ tours: Object.keys(tours) });
      }
    }, true);

    const getTourTypes = function getTourTypes() {
      window.postMessage({ type: 'TOUR_DATA', tours: window.lio.data.personalization_flags.tours }, '*');
    };

    injectScript(getTourTypes);
  } else if (request.setTours) {
    const toursToActivate = request.setTours
      .reduce((accumulator, tourType) => {
        accumulator.push(...[
          `tours.${tourType}.started`,
          `tours.${tourType}.aborted`,
          `tours.${tourType}.finished`,
        ]);
        return accumulator;
      }, []);
    window.postMessage({ type: 'UPDATE_TOUR', tours: toursToActivate }, '*');
  }
  return true;
});
