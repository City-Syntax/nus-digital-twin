type VisitorsResponse = {
  visitors: number;
};

type StatsResponse = {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
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
