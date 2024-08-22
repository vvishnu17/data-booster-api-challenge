const API_URL = 'https://flag-gilt.vercel.app/api/challenge';
const BEARER_TOKEN = 'uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=';

async function fetchFlag() {
  let cursor = null;
  let flagFound = false;

  while (!flagFound) {
    try {
      // Construct the body based on the presence of cursor
      const body = cursor ? JSON.stringify({ cursor }) : '{}';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await response.json();

      console.log(data.message);

      if (data.flag) {
        console.log('Flag found:', data.flag);
        flagFound = true;
      } else if (data.nextCursor) {
        cursor = data.nextCursor; // Update cursor to continue the challenge
      } else {
        console.log('No further cursor provided.');
        break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      break;
    }
  }
}

fetchFlag();
