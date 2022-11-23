import { html, css, LitElement } from 'lit';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

export class CelebrationTrigger extends LitElement {
  static get styles() {
    return css`
      :host {
        --pink: 255 192 203;
        --default-bg-color: var(--pink);
      }
      button {
        padding: 20px;
        font-size: 1.5em;
        border-radius: 100%;
        border: none;
        outline: solid 1px rgb(var(--bg-color, var(--default-bg-color)));
        background: rgba(var(--bg-color, var(--default-bg-color)) / 0.3);
        transition: 0.05s ease-in-out;
        margin: 3px;
      }

      button:is(:hover, :active, :focus) {
        transform: scale(1.03);
        transition: 0.05s ease-in-out;
      }

      button:active {
        background: rgba(var(--bg-color, var(--default-bg-color)) / 0.5);
      }

      button.opened {
        background: rgba(var(--bg-color, var(--default-bg-color)) / 0.8);
      }

      button:focus-visible {
        outline-width: 2px;
      }
    `;
  }

  static get properties() {
    return {
      widgetOpened: { type: Boolean },
      emojisDisplayed: { type: Boolean },
      emojis: { type: Array, reflect: true },
    };
  }

  constructor() {
    super();
    this.widgetOpened = false;
    this.soundsList = [
      {
        name: 'applause',
        urlOnline:
          'https://soundbible.com/mp3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3',
      },
      {
        name: 'airHorn',
        urlOnline:
          'https://cdn.staticcrate.com/stock-hd/audio/soundscrate-air-horn-2.mp3',
      },
    ];
    document.addEventListener('keyup', e =>
      e.key === 'Escape' && this.widgetOpened ? this._displayWidget() : null
    );
    this.emojis = ['🥳', '🔥'];
    this.emojisDisplayed = false;
  }

  _displayWidget() {
    this.widgetOpened = !this.widgetOpened;
  }

  _playSound(soundType) {
    const clickedSound = new Audio(
      this.soundsList.find(snd => snd.name === soundType).urlOnline
    );
    clickedSound.play();
  }

  _displayEmojis() {
    this.emojisDisplayed = !this.emojisDisplayed;
  }

  // eslint-disable-next-line class-methods-use-this
  _displayConfettis() {
    jsConfetti.addConfetti();
  }

  // eslint-disable-next-line class-methods-use-this
  _displayCustomEmojiConfetti(emoji) {
    jsConfetti.addConfetti({ emojis: [emoji] });
  }

  render() {
    return html`
      <button
        @click="${this._displayWidget}"
        class="${this.widgetOpened ? 'opened' : null}"
      >
        🥳
      </button>
      ${this.widgetOpened
        ? html`<div>
            <button @click="${() => this._playSound('airHorn')}">📯</button>
            <button @click="${() => this._playSound('applause')}">👏</button>
            <button @click="${this._displayConfettis}">🎉</button>
            ${this.emojis?.length
              ? html` <button @click="${this._displayEmojis}">🙂</button>
                  ${this.emojisDisplayed
                    ? html`<div>
                        ${this.emojis.map(
                          emoji => html`
                            <button
                              @click="${() =>
                                this._displayCustomEmojiConfetti(emoji)}"
                            >
                              ${emoji}
                            </button>
                          `
                        )}
                      </div>`
                    : null}`
              : null}
          </div>`
        : null}
    `;
  }
}
