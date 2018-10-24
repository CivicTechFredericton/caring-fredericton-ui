import { withKnobs } from '@storybook/addon-knobs';
const storyContextes = require.context('./', true, /.jsx/);

storyContextes.keys().forEach(i => {
	const res = storyContextes(i);
	res.default.addDecorator(withKnobs);
});
