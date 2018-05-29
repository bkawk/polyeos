import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import {} from './eos.js';
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
      <template is="dom-if" if="{{debug}}">
        <p>Debug: {{debug}}</p>
        <template is="dom-if" if="{{block}}">
          <p>Block Time Stamp: {{block.timestamp}}</p>
          <p>Block Producer: {{block.producer}}</p>
          <p>Block confirmations: {{block.confirmed}}</p>
          <p>Block previous: {{block.previous}}</p>
          <p>Transaction Mroot: {{block.transaction_mroot}}</p>
          <p>Action Mroot: {{block.action_mroot}}</p>
          <p>Schedule Version: {{block.schedule_version}}</p>
          <p>New Producers: {{block.new_producers}}</p>
          <p>header_extensions: {{block.header_extensions}}</p>
          <p>producer_signature: {{block.producer_signature}}</p>
          <p>transactions: {{block.transactions}}</p>
          <p>block_extensions: {{block.block_extensions}}</p>
          <p>id: {{block.id}}</p>
          <p>block_num: {{block.block_num}}</p>
          <p>ref_block_prefix: {{block.ref_block_prefix}}</p>
          </template>
          <template is="dom-if" if="{{info}}">
          <p>block_cpu_limit: {{info.block_cpu_limit}}</p>
          <p>block_net_limit: {{info.block_net_limit}}</p>
          <p>chain_id: {{info.chain_id}}</p>
          <p>head_block_id: {{info.head_block_id}}</p>
          <p>head_block_num: {{info.head_block_num}}</p>
          <p>head_block_producer: {{info.head_block_producer}}</p>
          <p>last_irreversible_block_id: {{info.last_irreversible_block_id}}</p>
          <p>last_irreversible_block_num: {{info.last_irreversible_block_num}}</p>
          <p>head_block_num: {{info.head_block_num}}</p>
          <p>server_version: {{info.server_version}}</p>
          <p>virtual_block_cpu_limit: {{info.virtual_block_cpu_limit}}</p>
          <p>virtual_block_net_limit: {{info.virtual_block_net_limit}}</p>
        </template>
      </template>
    `;
  }
  static get properties() {
    return {
      eos: {
        type: Object,
        notify: true,
        reflectToAttribute: true
      },
      debug: {
        type: Boolean,
        value: false,
      },
      blockNumber: {
        type: Number,
        observer: '_blockNumber'
      },
      block: {
        type: Object,
        notify: true,
        reflectToAttribute: true
      },
      info: {
        type: Boolean,
        observer: '_info',
        notify: true,
        reflectToAttribute: true
      },
      config: {
        type: Object
      },
      error: {
        type: String
      },
    };
  }
  constructor() {
    super();
    this.config = {
      keyProvider: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", 
      httpEndpoint: "http://13.71.191.137:8889",
      broadcast: true,
      sign: true,
      chainId: "a628a5a6123d6ed60242560f23354c557f4a02826e223bb38aad79ddeb9afbca",
      expireInSeconds: 30
    }
    this.eos = Eos.Localnet(this.config)
  }

  _blockNumber(blockNumber){
    return new Promise((resolve, reject) => {
      this.eos.getBlock(blockNumber)
      .then((block)=>{
        this.block = block;
        resolve(this.block);
      })
      .catch((error)=>{
        this.error = error;
        reject(error);
      });
    });
  }

  _info(){
    return new Promise((resolve, reject) => {
      this.eos.getInfo({})
      .then((info)=>{
        this.info = info;
        resolve(this.info);
      })
      .catch((error)=>{
        this.error = error;
        reject(error);
      });
    })
  }

} window.customElements.define('poly-eos', PolyEos);
