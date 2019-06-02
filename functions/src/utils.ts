const { v2beta3 } = require('@google-cloud/tasks');
const cloudTaskClient = new v2beta3.CloudTasksClient();

const baseUrl =
  'https://us-central1-techsylvania-2019-demo.cloudfunctions.net/';
export const checkAggregateJobUrl: string = `${baseUrl}check-aggregate-job`;
export const updateFinalDataUrl: string = `${baseUrl}update-final-data`;
export const aggregateDataUrl: string = `${baseUrl}aggregate-data`;

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
  payload: any,
  seconds?: number
) => {
  const location: string = process.env.FUNCTION_REGION;
  const projectId: string = process.env.GCP_PROJECT;

  const parent = cloudTaskClient.queuePath(projectId, location, queue);

  const task: any = {
    httpRequest: {
      httpMethod: 'GET',
      url,
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };

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
