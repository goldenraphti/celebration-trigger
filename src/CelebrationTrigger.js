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
        aspect-ratio: 1;
      }

      button:is(:hover, :active, :focus) {
        transform: scale(1.03);
        transition: 0.05s ease-in-out;
      }

      button:active {
        background: rgba(var(--bg-color, var(--default-bg-color)) / 0.5);
      }

      button.active {
        background: rgba(var(--bg-color, var(--default-bg-color)) / 0.8);
      }

      button:focus-visible {
        outline-width: 2px;
      }

      .second-level {
        max-height: 100px;
        transition: scale ease-in-out 0.5s, opacity ease-in-out 0.2s,
          visibility ease-in-out 0.2s, transform ease-in-out 0.2s,
          max-height ease-in-out 0.2s;
      }

      .second-level.third-level-displayed {
        visibility: hidden;
        opacity: 0;
        transform: scale(0);
        max-height: 0;
        transition: scale ease-in-out 0.5s, opacity ease-in-out 0.2s,
          visibility ease-in-out 0.2s, transform ease-in-out 0.2s,
          max-height ease-in-out 0.2s;
      }
    `;
  }

  static get properties() {
    return {
      widgetOpened: { type: Boolean },
      emojisDisplayed: { type: Boolean },
      emojis: { type: Array },
      confettiDisabled: { type: Boolean },
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
    this.confettiDisabled = false;
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
    const options = {
      detail: { confettiType: 'confetti' },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('confetti', options));
  }

  // eslint-disable-next-line class-methods-use-this
  _displayCustomEmojiConfetti(emoji) {
    jsConfetti.addConfetti({ emojis: [emoji] });
    const options = {
      detail: { confettiType: emoji },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('confetti', options));
  }

  render() {
    return html`
      <button
        @click="${this._displayWidget}"
        class="${this.widgetOpened ? 'active' : null}"
        aria-label="${this.widgetOpened
          ? 'open '
          : 'close'} the celebration widget"
      >
        🥳
      </button>
      ${this.widgetOpened
        ? html`<div
              class="second-level ${this.emojisDisplayed
                ? 'third-level-displayed'
                : null}"
            >
              <button
                @click="${() => this._playSound('airHorn')}"
                aria-label="trigger the dj air horn sound"
              >
                📯
              </button>
              <button
                @click="${() => this._playSound('applause')}"
                aria-label="trigger the clapping sound"
              >
                👏
              </button>
              ${!this.confettiDisabled
                ? html`<button
                    @click="${this._displayConfettis}"
                    aria-label="trigger the confetti canon"
                  >
                    🎉
                  </button>`
                : null}
              ${!this.confettiDisabled && this.emojis?.length
                ? html` <button
                    @click="${this._displayEmojis}"
                    aria-label="${this.emojisDisplayed
                      ? 'display '
                      : 'hide'} the custom emoji confetti trigget buttons"
                  >
                    🙂
                  </button>`
                : null}
            </div>
            ${this.emojisDisplayed
              ? html`<div id="third-level-container">
                  <button
                    @click="${this._displayEmojis}"
                    class="back"
                    aria-label="hide the custom emoji confetti trigget buttons"
                  >
                    🔙
                  </button>
                  ${this.emojis.map(
                    emoji => html`
                      <button
                        @click="${() =>
                          this._displayCustomEmojiConfetti(emoji)}"
                        aria-label="trigger the ${emoji} emoji confetti canon"
                      >
                        ${emoji}
                      </button>
                    `
                  )}
                </div>`
              : null}`
        : null}
    `;
  }
}
