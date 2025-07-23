import React, { useState, useEffect } from 'react';
// 1. Clad Imports
import { AdCard, CladClient } from '@clad-ai/react';

export default function App() {
	const [latestResponse, setLatestResponse] = useState(null); // ✅ store response globally

	// 2. Initialize Clad Client
  const cladClient = new CladClient({
    apiKey: process.env.REACT_APP_CLAD_API_KEY,
    threshold: 1,
  });

	// 3. Initialize User ID
  const userId = cladClient.getOrCreateUserId();

  useEffect(() => {
    const run = async () => {
      // 4. Call function to inject ad into inline text response
      const response = await cladClient.getProcessedInput(
        "Im looking for an e-bike reccommendation to get around the city",	// This can be any text input
        userId,
        "true"
      );
      console.log("✅ Response:", response);
      console.log("Prompt:", response.prompt);
			setLatestResponse(response);
    };

    run();
  }, []);

	// 5. Make a new object to have a map to the response from #4
	// this is because we need to check if the promptType is 'injected' to show the ad or not
	const adMessage = {
		prompted: latestResponse
	}

  return (
    <div className="chat-container">
      <div className="messages">
        <p>Filler Text</p>
      </div>
			{/* 6. Conditionally render the AdCard if the response is injected */}
			{latestResponse?.promptType === 'injected' && (
				<div className="mt-4">
					<AdCard prompted={latestResponse} className="my-2" />
				</div>
			)}
      <div className="input-box">
        <input
          placeholder="Type your message..."
        />
        <button>Send</button>
      </div>
    </div>
  );
}
