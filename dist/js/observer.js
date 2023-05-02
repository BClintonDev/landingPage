class DomObserver {
  constructor() {
    this.observers = new Map();
    this.observer = new MutationObserver(this.handleMutations.bind(this));
  }

  subscribe(selector, callback) {
    const observer = this.observer;
    const observerId = Symbol();

    this.observers.set(observerId, { selector, callback });

    if (this.observers.size === 1) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return observerId;
  }

  unsubscribe(observerId) {
    const removed = this.observers.delete(observerId);

    if (this.observers.size === 0) {
      this.observer.disconnect();
    }

    return removed;
  }

  handleMutations(mutations) {
    for (let mutation of mutations) {
      for (let [observerId, { selector, callback }] of this.observers) {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
          console.log(mutation.addedNodes[0], mutation)
          const matches = mutation.addedNodes[0].querySelectorAll(selector);

          matches.forEach(match => callback(match));
        }
      }
    }
  }

  disconnect() {
    this.observer.disconnect();
    this.observers.clear();
  }
}


class ObserverDOM1 {
  constructor() {
    this.observers = new Set();
    this.init();
  }

  subscribe(fn) {
    this.observers.add(fn);
  }

  unsubscribe(fn) {
    this.observers.delete(fn);
  }

  notify(data) {
    this.observers.forEach(fn => fn(data));
  }

  init() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this.handleMutations(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  handleMutations(addedNodes) {
    addedNodes.forEach(node => {
      if (node.querySelectorAll) {
        this.handleSelector(node, '[data-observer]');
      }
    });
  }

  handleSelector(node, selector) {
    const elements = node.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener('click', e => {
        this.notify({ element, event: e });
      });
    });
  }

  handleChange(selector, callback) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const addedNodes = mutation.addedNodes;
          addedNodes.forEach(node => {
            if (node.querySelectorAll) {
              const elements = node.querySelectorAll(selector);
              elements.forEach(item => {
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve(callback(item));
                  }, 0);
                });
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}


class ObserverDOM2 {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  subscribe(fn, event, selector = null) {
    if (!this.observers.has(event)) {
      this.observers.set(event, new Set());
    }
    this.observers.get(event).add({ fn, selector });
  }

  unsubscribe(fn, event, selector = null) {
    if (this.observers.has(event)) {
      const observers = this.observers.get(event);
      observers.forEach(observer => {
        if (observer.fn === fn && observer.selector === selector) {
          observers.delete(observer);
        }
      });
    }
  }

  notify(event, data) {
    if (this.observers.has(event)) {
      const observers = this.observers.get(event);
      observers.forEach(observer => {
        if (observer.selector) {
          const elements = document.querySelectorAll(observer.selector);
          elements.forEach(element => {
            if (element.contains(data.target)) {
              observer.fn(data);
            }
          });
        } else {
          observer.fn(data);
        }
      });
    }
  }

  init() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this.handleMutations(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  handleMutations(addedNodes) {
    addedNodes.forEach(node => {
      if (node.querySelectorAll) {
        this.observers.forEach((observers, event) => {
          observers.forEach(observer => {
            if (observer.selector) {
              const elements = node.querySelectorAll(observer.selector);
              elements.forEach(element => {
                element.addEventListener(event, e => {
                  this.notify(event, { element, event: e });
                });
              });
            }
          });
        });
      }
    });
  }
}


class ObserverDOM {
  constructor() {
    this.selectors = new Map();
    this.observers = new Set();
    this.init();
  }

  subscribe(fn) {
    this.observers.add(fn);
  }

  unsubscribe(fn) {
    this.observers.delete(fn);

  }

  notify(data) {
    this.observers.forEach(fn => fn(data));
  }

  get(selector) {
    return {
      subscribe: (fn) => {
        if (!this.observers.has(selector)) {
          this.observers.add(selector, new Set());
        }
        this.observers.get(selector).add(fn);
      }
    };
  }

  init() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this.handleMutations(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  handleMutations(addedNodes) {
    addedNodes.forEach(node => {
      if (node.querySelectorAll) {
        this.selectors.forEach((handler, selector) => {
          this.handleSelector(node, selector, handler);
        });
      }
    });
  }

  handleSelector(node, selector, handler) {
    const elements = node.querySelectorAll(selector);
    elements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      if (['input', 'textarea'].includes(tagName)) {
        element.addEventListener('input', e => {
          this.notify({ element, event: e });
        });
      } else if (['select'].includes(tagName)) {
        element.addEventListener('change', e => {
          this.notify({ element, event: e });
        });
      } else {
        element.addEventListener('click', e => {
          this.notify({ element, event: e });
        });
      }

      handler(element);
    });
  }

  addSelector(selector, handler) {
    this.selectors.set(selector, handler);
  }

  removeSelector(selector) {
    this.selectors.delete(selector);
  }
}


class ObserverDOMX {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  subscribe(selector, fn) {
    if (!this.observers.has(selector)) {
      this.observers.set(selector, new Set());
    }
    this.observers.get(selector).add(fn);
  }

  unsubscribe(selector, fn) {
    if (this.observers.has(selector)) {
      this.observers.get(selector).delete(fn);
    }
  }

  notify(data) {
    const { selector, event } = data;
    if (this.observers.has(selector)) {
      this.observers.get(selector).forEach(fn => fn(event));
    }
  }

  init() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this.handleMutations(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  handleMutations(addedNodes) {
    addedNodes.forEach(node => {
      if (node.querySelectorAll) {
        this.handleSelectors(node, '[data-observer]');
      }
    });
  }

  handleSelectors(node, selector) {
    const elements = node.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener('click', e => {
        this.notify({ selector, event: e });
      });
    });
  }

  get(selector) {
    return {
      subscribe: (fn) => {
        this.subscribe(selector, fn);
      }
    };
  }
}
