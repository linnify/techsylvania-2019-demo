import { PROJECT_ID } from './config/constants';

import app from './app';

/**
 * Start Express Server
 */
const server = app.listen(app.get('port'), () => {
  console.log(`App Project: ${PROJECT_ID}`);
  console.log(`App listening on port ${app.get('port')}`);
  console.log('Press Ctrl+C to quit.');
});

export default server;
