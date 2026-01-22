import streamlit as st
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema, OutputFixingParser

#1.Environment variables loading 
load_dotenv()

llm = HuggingFaceEndpoint(
    repo_id="google/gemma-2-9b-it", 
    task="text-generation",
    max_new_tokens=1024,
    temperature=0.1      
)

model = ChatHuggingFace(llm=llm)

# 2.Schema
schema = [
    ResponseSchema(name='modules', description='List of system modules with responsibilities'),
    ResponseSchema(name='database_schemas', description='Database tables with fields and data types'),
    ResponseSchema(name='pseudocode', description='High-level pseudocode for core workflows'),
]

base_parser = StructuredOutputParser.from_response_schemas(schema)


parser = OutputFixingParser.from_llm(parser=base_parser, llm=model)

template = PromptTemplate(
    template="""You are a senior system architect. Convert the business requirement into a technical spec.

{format_instructions}

IMPORTANT: Your response must be a single, valid JSON object. 
Do not include any conversational text, markdown formatting (like ```json), or explanations.

Business Requirement:
{requirement}
""",
    input_variables=['requirement'],
    partial_variables={'format_instructions': base_parser.get_format_instructions()}
)

#chain
chain = template | model | parser

# -------------------- STREAMLIT UI --------------------
st.set_page_config(page_title="AI Tech Spec Generator", layout="wide")
st.title("🤖 AI Requirement → Technical Specification")

requirement = st.text_area(
    "Enter Business Requirement",
    height=150,
    placeholder="e.g., An app for users to book train tickets."
)

if st.button("Generate"):
    if requirement.strip():
        with st.spinner("Generating specifications (this may take a moment)..."):
            try:
                result = chain.invoke({'requirement': requirement})

                st.success("Generated Successfully")
                
                col1, col2 = st.columns(2)
                with col1:
                    st.subheader("Modules")
                    st.write(result["modules"])
                
                with col2:
                    st.subheader("Database Schemas")
                    st.write(result["database_schemas"])

                st.subheader("Pseudocode")
                st.code(result["pseudocode"], language="python")

            except Exception as e:
                st.error(f"Error: The model failed to generate valid JSON. {str(e)}")
    else:
        st.warning("Please enter a business requirement.")
