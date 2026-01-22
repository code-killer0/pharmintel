import requests
import json
from transformers import AutoProcessor, BarkModel
from dotenv import load_dotenv
import feedparser
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda
from huggingface_hub import InferenceClient


# Load environment
load_dotenv()

# Fetch news feed
url = "https://news.google.com/rss?hl=en-GB&gl=GB&ceid=GB:en"
feed = feedparser.parse(url)

# Extract titles
titles = []
for entry in feed.entries[:20]:
    titles.append(entry.title)

all_titles = "\n".join([entry.title for entry in feed.entries[:20]])

# Initialize LLM
llm = HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    task="text-generation"
)
model = ChatHuggingFace(llm=llm)
parser = StrOutputParser()

# Topic selection prompt
prompt1 = PromptTemplate(
    input_variables=["topics"],
    template="""
    Trending topics:
{topics}
    Pick ONE topic suitable for a 30–60 sec neutral informative video.
    Return only the topic.
    """
)

# Script generation prompt
prompt2 = PromptTemplate(
    input_variables=["topic"],
    template="""
    Create a 30–60 sec news-style video script on:
{topic}
    Simple language, strong hook, clear ending.
    Return only the script.
    """
)

# Build chain
chain = (
    prompt1 | model | parser | (lambda topic: {"topic": topic})| prompt2 | model | parser
)

# Generate script
result = chain.invoke({"topics": all_titles})
print("Generated Script:\n", result)


# Video Generation through Invideo
API_KEY = "YOUR_INVIDEO_API_KEY"
API_URL = "https://api.invideo.io/v1/generateVideoFromScript"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

payload = {
    "script": result,
    "settings": "Serious tone, calm but urgent narration, BBC-style neutral accent.",
    "platforms": ["youtube shorts", "tiktok", "instagram"],
    "audiences": ["news watchers", "environmental awareness groups"],
    "length_in_minutes": 1
}

response = requests.post(API_URL, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    data = response.json()
    print("Video generated successfully!")
    print("Video URL:", data.get("video_url"))
    print("Thumbnail URL:", data.get("thumbnail_url"))
else:
    print("❌ Failed to generate video:", response.status_code)
    print(response.text)
