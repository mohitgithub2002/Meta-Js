import { NextResponse } from 'next/server';

export async function GET(request) {
  // Get the query parameters from the request
  const { searchParams } = new URL(request.url);

  // Extract the required parameters
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Replace 'YOUR_VERIFY_TOKEN' with the token you set up in Meta's dashboard
  const VERIFY_TOKEN = 'mohitgoyal';

  // Validate the token and mode
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');

    // Respond with the challenge to confirm verification
    return NextResponse.json(parseInt(challenge), {
      status: 200,
    });
  } else {
    console.error('Webhook verification failed');

    // Respond with an error if verification fails
    return NextResponse.json({ error: 'Forbidden' }, {
      status: 403,
    });
  }
}

export async function POST(request) {
  // Get the request body
  const body = await request.json();

  // Log the received data
  console.log('Received data:', body);

  // Respond with a success message
  return NextResponse.json({ message: 'Webhook received successfully' });
}
