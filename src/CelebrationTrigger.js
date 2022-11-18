import { html, css, LitElement } from 'lit';

export class CelebrationTrigger extends LitElement {
  static get styles() {
    return css`
      :host {
        --pink: 255 192 203;
        --bg-color: var(--pink);
      }
      button {
        padding: 20px;
        font-size: 1.5em;
        border-radius: 100%;
        border: none;
        outline: solid 1px rgb(var(--bg-color));
        background: rgba(var(--bg-color) / 0.3);
        transition: 0.05s ease-in-out;
        margin: 3px;
      }

      button:is(:hover, :active, :focus) {
        transform: scale(1.03);
        transition: 0.05s ease-in-out;
      }

      button:active {
        background: rgba(var(--bg-color) / 0.5);
      }

      button.opened {
        background: rgba(var(--bg-color) / 0.8);
      }
    `;
  }

  static get properties() {
    return {
      widgetOpened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.widgetOpened = false;
  }

  _displayWidget() {
    this.widgetOpened = !this.widgetOpened;
  }

  render() {
    return html`<button
        @click="${this._displayWidget}"
        class="${this.widgetOpened ? 'opened' : null}"
      >
        🥳
      </button>
      ${this.widgetOpened
        ? html`<div>
            <button>🎊</button>
            <button>📯</button>
            <button>👏</button>
          </div>`
        : null} `;
  }
}
