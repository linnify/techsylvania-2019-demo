const { v2beta3 } = require('@google-cloud/tasks');
const cloudTaskClient = new v2beta3.CloudTasksClient();

export const createCloudTask = (url: string, payload: any) => {
  const queue: string = 'check-aggregate-job';
  const location: string = process.env.FUNCTION_REGION;
  const projectId: string = process.env.GCP_PROJECT;

  const parent = cloudTaskClient.queuePath(projectId, location, queue);

  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };

  const request = {
    parent,
    task
  };

  return cloudTaskClient.createTask(request);
};
