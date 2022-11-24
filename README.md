# \<celebration-trigger>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Demos

You can see a serie of examples on Codepen:

[https://codepen.io/collection/BNmbyz](https://codepen.io/collection/BNmbyz)

## Installation

```bash
npm i celebration-trigger
```

## Usage

### with local install (using npm/yarn/pnpm)

```html
<script type="module">
  import 'celebration-trigger/celebration-trigger.js';
</script>

<celebration-trigger></celebration-trigger>
```

### via CDN

```html
<body>
  <celebration-trigger style="--bg-color: 10 100 200;"></celebration-trigger>
</body>
```

```js
import { CelebrationTrigger } from 'https://cdn.skypack.dev/celebration-trigger';

window.customElements.define('celebration-trigger', CelebrationTrigger);
```

## Styling

The buttons backgrounds & borders color is editable via the `--bg-color` CSS custom property.
It should be passed as "R G B", with no `,` between each number. It is then used inside the celebration-trigger web-component (for example) this way for rgba:

```css
background: rgba(var(--bg-color) / 0.5);
```

and from your code you can use it this way:

```html
<celebration-trigger style="--bg-color: 99 245 170;"></celebration-trigger>
```

Custom-rpoperties get through web-components encapsulation.
Their specificity increase with the element proximity. The closer the parent element it has been set on, the more the priority.
If the custom property is set on both the `<body>` and the parent element, the parent element will take precedence. Therefore to enforce the color you can set it on the `<celebration-trigger>` element itself.

The default value is: `255 192 203`

## Properties

### Confetti canon

You can disable the confetti canon (and by extension the custom-emojis confetti canon) using the boolean attribute "confettiDisabled", as such:

```html
<celebration-trigger confettiDisabled="true"></celebration-trigger>
```

Default is false. If you want to enable it then do not set the attribute. Like all boolean attribute, its mere presence set the value to `true`. Therefore `confettiDisabled="false"` will still pass the value `true` to the `confettiDisabled` property (just like the required or disabled standard attributes).

### Emojis

You can customize the emojis thrown as confetti canon on the page, by passing an array of emojis strings.
As such:

```html
<celebration-trigger emojis='["🎈","🎀","🦺"]'></celebration-trigger>
```

If no emojis are passed, and the confetti canon is not disabled, then those are the default emojis proposed to the user: 🥳 & 🔥.

## Events dispatched

When the user triggers a confetti canon a custom event is dispatched. Name of the event is `confetti`. It will bubble up. And it passes the type of confetti triggered (standard confetti = "confetti", and for emojis it will pass the emoji string triggered), via the `confettiType` property inside the `detail` property. You can listen to it this way:

```js
document.addEventListener('confetti', e =>
  console.log('confetti event', e, e.detail.confettiType)
);
```

And you can use the "detail" property on the event object passed as argument by the event listener.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Roadmap

- [ ] add tests
- [ ] provide types [https://dev.to/open-wc/generating-typescript-definition-files-from-javascript-5bp2](https://dev.to/open-wc/generating-typescript-definition-files-from-javascript-5bp2)
- [ ] improve perf (i.e. confetti library only loaded if not disabling the confettis, sounds could be loaded only when start displaying the internal buttons)
- [ ] style animation when display start from root button, translate & scale & opacity bouncy
- [ ] make React wrapper if necessary ?
