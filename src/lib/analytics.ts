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
  const req = fetch('/api/analytics/active');
  const res = await req;
  return await res.json();
};

export const getAllStats = async (): Promise<StatsResponse> => {
  const req = fetch('/api/analytics/stats');
  const res = await req;
  return await res.json();
};
