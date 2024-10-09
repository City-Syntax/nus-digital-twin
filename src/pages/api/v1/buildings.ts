import buildingsData from '../../../content/buildings/buildings.json';

export async function GET() {
  const keys = ['elementId', 'name', 'address', 'postal', 'latitude', 'longitude'];

  const dataToShow = buildingsData.map((obj) =>
    Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key))),
  );

  return new Response(JSON.stringify(dataToShow), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
