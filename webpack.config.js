const merge = require('webpack-merge');

module.exports = ({ target = 'dev', config = 'dev' }) => {
	process.env.BABEL_ENV = target;

	return merge(
		require(`./webpack-config/${target}`),
		require('./webpack-config/common')(config)
	);
};
