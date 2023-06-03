class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

function updateUrl(url) {
  history.pushState({}, '', url);
}

function loadAsyncSection(url, element) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      element.innerHTML = html;
      const observer = new Observable();
      observer.notify(element);
      updateUrl(window.location.origin + '/*');
    });
}


function observeDOMChanges(element, callback) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            callback(node);
          }
        });
      }
    });
  });

  observer.observe(element, { childList: true, subtree: true });
}


function loadAndObserveAsyncSection(url, element, callback) {
  const originalUrl = window.location.href;
  updateUrl(originalUrl);
  loadAsyncSection(url, element);
  observeDOMChanges(element, node => {
    updateUrl(window.location.origin + '/*');
    callback(node);
  });
}


