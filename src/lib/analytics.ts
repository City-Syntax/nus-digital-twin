const baseUrl = '/analytics-api';
const apiKey = import.meta.env.PUBLIC_UMAMI_API_KEY;
const websiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;

const initialiser = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'x-umami-api-key': apiKey,
  },
};

type VisitorsResponse = {
  visitors: number;
};

type Metric = {
  value: number;
  prev: number;
};

type StatsResponse = {
  pageviews: Metric;
  visitors: Metric;
  visits: Metric;
  bounces: Metric;
  totaltime: Metric;
};

export const getActiveVisitors = async (): Promise<VisitorsResponse> => {
  const request = fetch(`${baseUrl}/websites/${websiteId}/active`, initialiser);
  const response = await request;
  return await response.json();
};

export const getAllStats = async (): Promise<StatsResponse> => {
  const startTime = new Date(0).getTime();
  const endTime = Date.now();
  const request = fetch(`${baseUrl}/websites/${websiteId}/stats?startAt=${startTime}&endAt=${endTime}`, initialiser);
  const response = await request;
  return await response.json();
};
