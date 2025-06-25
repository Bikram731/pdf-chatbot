import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

# environment variables
load_dotenv()

# api key and url
api_key = os.getenv("OPENAI_API_KEY")
base_url = os.getenv("OPENAI_BASE_URL")

# Language model
llm = ChatOpenAI(
    model="mistralai/mistral-7b-instruct",
    temperature=0.7
)

# Full prompt and model
def get_answer(question: str, context: str) -> str:
    print("🤖 get_answer() called with question:", question)
    prompt = PromptTemplate(
        input_variables=["context", "question"],
        template="""
    You are an intelligent AI assistant that answers questions based on the content of a PDF document.
    The content may include paragraphs, headings, and tables.

    Carefully read and understand the context below, which may include tabular data (like grades, values, or records).

    - Use exact values from the context if available.
    - If the context includes a table, interpret it logically.
    - If the answer is not found, reply: "The document does not contain enough information to answer this question."

    ----------------------
    PDF Content:
    {context}

    ----------------------
    User Question:
    {question}

    Answer:
    """
    )
    
    formatted_prompt = prompt.format(context=context[:4000], question=question)
    return llm.invoke(formatted_prompt).content