const PROJECT_ID: string = process.env.GCP_PROJECT;

/**
 * Base URL For our functions
 */
const BASE_URL = `https://us-central1-${PROJECT_ID}.cloudfunctions.net`;

/**
 * URL for aggregateData Cloud Function
 */
export const AGGREGATE_DATA_URL: string = `${BASE_URL}/aggregate-data`;

/**
 * URL for checkAggregateData Cloud Function
 */
export const CHECK_AGGREGATE_JOB_URL: string = `${BASE_URL}/check-aggregate-job`;

/**
 * Url for updateFinalData Cloud Function
 */
export const UPDATE_FINAL_DATA_URL: string = `${BASE_URL}/update-final-data`;
