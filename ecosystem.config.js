module.exports = {
	apps: [
		{
			name: 'wordapp-db',
			script: './api/server.js',
			log_date_format: 'YYYY-MM-DD HH:mm Z',
			error_file: '_error.log',
			out_file: '_out.log',
		},
		{
			name: 'wordapp-web',
			script: 'npm run dev:serve',
			log_date_format: 'YYYY-MM-DD HH:mm Z',
			error_file: '_error_web.log',
			out_file: '_out_web.log',
		},
	],
};
