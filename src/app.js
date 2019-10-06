import { requestImages } from './packages/requesters/images';

class App extends HTMLElement {
  constructor() {
    super();
    console.log('constructeddddddddd!');
  }

  connectedCallback() {
    console.log('connected!');
    requestImages().then((imgs) => console.log(imgs));
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute: ${name} changed!`);
  }

  adoptedCallback() {
    console.log('adopted!');
  }
}

window.customElements.define('ui-app', App);
