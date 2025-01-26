import React, { useState } from "react";
import axios from "axios";

export default function MovieRecommendationApp() {
  const [mood, setMood] = useState("");
  const [watchHistory, setWatchHistory] = useState("");
  const [genrePreferences, setGenrePreferences] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations(null);
    

    const data = {
      input: {
        mood,
        watch_history: watchHistory,
        movie_genre_preferences: genrePreferences,
        language_preferences: language,
      },
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        miraauthorization: import.meta.env.VITE_MIRA_API_KEY, // Replace with your actual API key
      },
    };

    try {
      const response = await axios.post(
        "https://flow-api.mira.network/v1/flows/flows/sunilk/movie-recommendation?version=0.0.5",
        data,
        config
      );
      setRecommendations(response.data.result);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Movie Recommendation</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mood:</label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="e.g., happy"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Watch History:</label>
          <input
            type="text"
            value={watchHistory}
            onChange={(e) => setWatchHistory(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="e.g., RRR"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genre Preferences:</label>
          <input
            type="text"
            value={genrePreferences}
            onChange={(e) => setGenrePreferences(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="e.g., Action"
            required
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language Preferences:</label>
            <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="e.g., English"
                required
            />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}

      {recommendations && (
        <div className="mt-6 w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Recommendations:</h2>
          <pre className="whitespace-pre-wrap text-gray-800">
          <div
              dangerouslySetInnerHTML={{
                __html: recommendations.substring(recommendations.indexOf('<')).replace(/className/g, "class").replace(/```/g, ""),
              }}
            />
          </pre>
        </div>
      )}
    </div>
  );
}
