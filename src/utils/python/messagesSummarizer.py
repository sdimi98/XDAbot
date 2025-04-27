import sys, json, torch
from transformers import pipeline

summarizer = pipeline("summarization", model="philschmid/bart-large-cnn-samsum")

def safe_summarize(messages):
    document = "\n".join(messages)
    MAX_CHAR_LEN = 4000
    if len(document) > MAX_CHAR_LEN:
        document = document[:MAX_CHAR_LEN]
    return summarizer(
        document,
        max_length=60,
        min_length=10,
        truncation=True,
        do_sample=False,
    )[0]["summary_text"]

def main() -> None:
    sys.stdin.reconfigure(encoding='utf-8')
    sys.stdout.reconfigure(encoding='utf-8')

    payload = json.load(sys.stdin)
    messages = payload.get("input", [])

    summary = safe_summarize(messages)
    json.dump({"summary": summary}, sys.stdout, ensure_ascii=False)

if __name__ == "__main__":
    main()