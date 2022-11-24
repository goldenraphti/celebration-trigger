import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../celebration-trigger.js';

describe('CelebrationTrigger', () => {
  it('on init only the widget initial button is displayed', async () => {
    const el = await fixture(html`<celebration-trigger></celebration-trigger>`);
    await expect(el.shadowRoot.querySelectorAll('button')).to.equal(1);
    el.shadowRoot.querySelector('button').click();
    await expect(el.shadowRoot.querySelectorAll('button')).greaterThan(1);
  });

  it('when click on custom emoji display btn it display the new custom emojis and hides the 2nd level buttons', async () => {});

  it('can override the emojis via attribute', async () => {
    // const el = await fixture(
    //   html`<celebration-trigger title="attribute title"></celebration-trigger>`
    // );
    // expect(el.title).to.equal('attribute title');
  });

  it('when click on the confetti trigger button it emits an event up', async () => {});

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<celebration-trigger></celebration-trigger>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
