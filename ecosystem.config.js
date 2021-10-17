module.exports = {
	apps: [
		{
			name: 'wordapp-db',
			script: './api/server.js',
			log_date_format: 'YYYY-MM-DD HH:mm Z',
			error_file: '_error.log',
			out_file: '_out.log',
		},
	],
};
