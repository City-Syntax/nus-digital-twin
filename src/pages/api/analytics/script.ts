export async function GET() {
  try {
    const response = await fetch('https://cloud.umami.is/script.js');
    const content = await response.text();

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response('Error fetching script', { status: 500 });
  }
}
