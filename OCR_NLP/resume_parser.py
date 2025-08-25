# GEMINI_API_KEY=AIzaSyCPPchfID9xC9Op669Oab67UmfiZn0esnQ

import os
import re
import json
import textract
import spacy
import argparse
from dateutil.parser import parse

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

def Clean_Text(file):
    """
    Extract and normalize text from a PDF file using textract + tesseract OCR.
    """
    text = textract.process(file, method='tesseract')
    text = text.decode('utf-8', errors='ignore')

    # Clean OCR bullets and fix line endings
    text = text.replace('\u00a2', '-').replace('•', '-').replace('–', '-')
    text = text.replace("\r\n", "\n")
    text = re.sub(" +", " ", text)

    return text


def Extract_Email(text):
    """
    Extract email address using regex.
    """
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    emails = email_pattern.findall(text)
    return emails[0] if emails else "No Email Found"



def Extract_Skills(text):
    """
    Extract known skills from a predefined keyword list.
    """
    skills_keywords = ['python', 'java', 'sql', 'excel', 'project management',
                       'machine learning', 'data analysis', 'communication',
                       'leadership', 'javascript', 'c++', 'aws', 'docker']

    text_lower = text.lower()
    found_skills = [skill for skill in skills_keywords if skill in text_lower]

    return found_skills if found_skills else ["No Skills Found"]

def Extract_Education(text):
    """
    Extract lines related to education from the resume.
    """
    education_keywords = ['bachelor', 'master', 'phd', 'university', 'college', 'degree', 'mba']
    sentences = re.split(r'\.|\n', text.lower())
    education_sentences = [s.strip() for s in sentences if any(kw in s for kw in education_keywords)]

    return education_sentences if education_sentences else ["No Education Details Found"]

def Extract_Experience(text):
    """
    Extract a snippet of work experience based on keywords.
    """
    experience_keywords = ['experience', 'worked', 'employment', 'responsibilities', 'projects']
    lines = text.split('\n')

    for i, line in enumerate(lines):
        if any(kw in line.lower() for kw in experience_keywords):
            snippet = ' '.join(lines[i:i+5])
            snippet = re.sub(r'\s+', ' ', snippet)
            return snippet.strip()
    return "No Work Experience Found"

def Process_Resume(file_path):
    """
    Extract structured data from a resume PDF file.
    """
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return None

    print(f"📄 Processing resume: {file_path}")

    text = Clean_Text(file_path)

    data = {
        "Email": Extract_Email(text),
        "Skills": Extract_Skills(text),
        "Education": Extract_Education(text),
        "Work Experience": Extract_Experience(text),
    }

    return data

def main():
    parser = argparse.ArgumentParser(description="Extract information from resume PDF files.")
    parser.add_argument('files', metavar='F', type=str, nargs='+',
                        help='List of resume PDF files to process')

    args = parser.parse_args()
    resumes = args.files

    for resume_file in resumes:
        result = Process_Resume(resume_file)
        if result:
            file_name = os.path.splitext(resume_file)[0]
            json_file = file_name + ".json"

            with open(json_file, 'w') as f:
                json.dump(result, f, indent=4)

            print(f"✅ Extracted data saved to: {json_file}\n")
        else:
            print(f"❌ Failed to process: {resume_file}")

if __name__ == "__main__":
    main()