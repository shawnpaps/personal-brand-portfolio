import express from 'express';
import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

type PayloadInitOptions = Parameters<typeof payload.init>[0];

const app = express();
const port = Number(process.env.PORT) || 3001;

const start = async () => {
	await payload.init({
		express: app,
		secret: process.env.PAYLOAD_SECRET || 'super-secret-development-string',
		configPath: path.resolve(__dirname, '../payload.config.ts'),
		onInit: async (_payload) => {
			_payload.logger.info('Payload CMS is live.');
			_payload.logger.info(`Admin URL: ${_payload.getAdminURL()}`);
		},
	} as PayloadInitOptions);

	app.listen(port, () => {
		payload.logger.info(`Server listening on http://localhost:${port}`);
	});
};

start().catch((error) => {
	payload.logger.error('Failed to start Payload CMS', error);
	process.exit(1);
});
