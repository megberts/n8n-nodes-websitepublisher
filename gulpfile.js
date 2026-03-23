const { src, dest } = require('gulp');

function buildIcons() {
	return src('nodes/**/*.svg').pipe(dest('dist/nodes/'));
}

function buildCredentialIcons() {
	return src('credentials/**/*.svg').pipe(dest('dist/credentials/'));
}

exports['build:icons'] = async function () {
	await Promise.all([
		new Promise((resolve, reject) => {
			buildIcons().on('end', resolve).on('error', reject);
		}),
		new Promise((resolve, reject) => {
			buildCredentialIcons().on('end', resolve).on('error', reject);
		}),
	]);
};
