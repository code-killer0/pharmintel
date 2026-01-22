import requests
from playwright.sync_api import sync_playwright
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain

from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


AMAZON_URL = "https://www.amazon.in/gp/bestsellers"
HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"

SCOPES = ["https://www.googleapis.com/auth/blogger"]
BLOG_ID = "YOUR_BLOGGER_BLOG_ID"   
CLIENT_SECRET_FILE = "client_secret.json" 



def scrape_products(limit=5):
    products = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(AMAZON_URL, timeout=60000)

        page.wait_for_selector(".p13n-sc-truncate-desktop-type2")

        titles = page.locator(".p13n-sc-truncate-desktop-type2")

        for i in range(min(limit, titles.count())):
            title = titles.nth(i).inner_text().strip()
            products.append(title)

        browser.close()

    return products


# keyword generation

def generate_keywords(title):
    words = title.lower().split()
    base = words[0] if len(words) > 0 else "product"

    return [
        f"best {base}",
        f"{title} review",
        f"buy {title} online",
        f"cheap {base}"
    ]


# llm

def load_llm():
    llm = HuggingFaceEndpoint(
        repo_id=HF_MODEL,
        temperature=0.6,
        max_new_tokens=350
    )
    return ChatHuggingFace(llm=llm)


# blog post 

def generate_blog(llm, product, keywords):
    prompt = PromptTemplate(
        template="""
            Write a 150–200 word SEO-optimized blog post.

            Product:
            {product}

            SEO Keywords:
            {keywords}

            Rules:
            - Natural keyword usage
            - No keyword stuffing
            - Friendly, informative tone
            - No markdown headings
            """,
            input_variables=["product", "keywords"]
    )

    chain = LLMChain(llm=llm, prompt=prompt)

    return chain.run(
        product=product,
        keywords="\n".join(keywords)
    )


# blogger auth

def blogger_auth():
    flow = InstalledAppFlow.from_client_secrets_file(
        CLIENT_SECRET_FILE, SCOPES
    )
    creds = flow.run_local_server(port=0)

    return build("blogger", "v3", credentials=creds)


# blogger post

def publish_blog(service, title, content):
    post = {
        "kind": "blogger#post",
        "title": title,
        "content": content
    }

    request = service.posts().insert(
        blogId=BLOG_ID,
        body=post,
        isDraft=False
    )

    response = request.execute()
    return response["url"]


# main

def main():
    print("🔍 Scraping Amazon products...")
    products = scrape_products()

    if not products:
        print("No products found")
        return

    llm = load_llm()
    blogger_service = blogger_auth()

    for product in products:
        print(f"\n Generating blog for: {product}")

        keywords = generate_keywords(product)
        blog_content = generate_blog(llm, product, keywords)

        post_url = publish_blog(
            blogger_service,
            product,
            blog_content
        )

        print(f"Published successfully!")
        print(f"URL: {post_url}")

    print("\n")


if __name__ == "__main__":
    main()
