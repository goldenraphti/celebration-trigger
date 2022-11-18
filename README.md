# \<celebration-trigger>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i celebration-trigger
```

## Usage

```html
<script type="module">
  import 'celebration-trigger/celebration-trigger.js';
</script>

<celebration-trigger></celebration-trigger>
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

## ROADMAP

- [ ] add tests
- [ ] provide types (https://dev.to/open-wc/generating-typescript-definition-files-from-javascript-5bp2)[https://dev.to/open-wc/generating-typescript-definition-files-from-javascript-5bp2]
- [ ] generate custom event on sound play, to be listened for by js frameworks for example (or whatever, even simple eventListener)
- [ ] add confetti with emojis
- [ ] add props for letting dev deciding which emojis to offer
- [ ] add props for adding support for images in confetti
- [ ] create event emitting data i.e. name & photo
- [ ] improve style
- [ ] style animation when display start from root button, translate & scale & opacity bouncy
- [ ] make React wrapper if necessary ?
