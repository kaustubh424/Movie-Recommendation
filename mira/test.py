from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


# Initialize the client

api_key = os.getenv("MIRA_API_KEY")

# Initialize the client
client = MiraClient(config={"API_KEY": api_key})

version = "0.0.3"
input_data = {
    "movie_genre_preferences": "action, comedy",
    "mood": "happy",
    "watch_history": "nothing"
}

# If no version is provided, latest version is used by default
if version:
    flow_name = f"sunilk/movie-recommendation/{version}"
else:
    flow_name = "sunilk/movie-recommendation"

result = client.flow.execute(flow_name, input_data)
print(result)