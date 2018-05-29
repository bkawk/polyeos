import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `poly-eos`
 * Polymer 3 component for eos.js
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolyEos extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'poly-eos',
      },
    };
  }
}

window.customElements.define('poly-eos', PolyEos);
