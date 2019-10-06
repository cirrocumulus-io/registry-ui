import { requestImages } from './packages/requesters/images';

const template = document.createElement('template');

template.innerHTML = `
<h1>Images</h1>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.component = template.content.cloneNode(true);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.component);
    requestImages().then((imgs) => {
      console.log(imgs);
      const ulElt = document.createElement('ul');
      imgs
        .map((image) => {
          const imageItemElem = document.createElement('li');
          imageItemElem.innerHTML = image.name;
          return imageItemElem;
        })
        .forEach((imageItemElem) => ulElt.appendChild(imageItemElem));

      this.shadowRoot.appendChild(ulElt);
    });
  }
}

window.customElements.define('cru-app', App);
