const { v2beta3 } = require('@google-cloud/tasks');
const cloudTaskClient = new v2beta3.CloudTasksClient();

/**
 * Create a cloud task
 * @param queue - the name of the queue this task should be placed in
 * @param url - the endpoint this task calls
 * @param payload - the payload for the task
 * @param seconds - the number of seconds this task will start after
 */
export const createCloudTask = (
  queue: string,
  url: string,
  payload?: any,
  seconds?: number
) => {
  const location: string = process.env.FUNCTION_REGION;
  const projectId: string = process.env.GCP_PROJECT;

  const parent = cloudTaskClient.queuePath(projectId, location, queue);

  const task: any = {
    httpRequest: {
      httpMethod: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };

  // if (payload) {
  //   task.httpRequest.body =  Buffer.from(JSON.stringify(payload)).toString('base64');
  // }

  if (seconds) {
    task.scheduleTime = {
      seconds: seconds + Date.now() / 1000
    };
  }

  const request = {
    parent,
    task
  };

  return cloudTaskClient.createTask(request);
};

/**
 * Parse the name of the file to transform it into a table name accepted by bigquery
 */
export const bigQuerySafeName = (fileName: string) => {
  let parsedText = fileName.split('.csv')[0].replace(/[_-]/g, '_');
  parsedText = parsedText.replace(/[^a-zA-Z0-9_]/g, '');
  return parsedText.substring(0, 1024);
};
