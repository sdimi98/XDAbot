import sys, json, torch
from transformers import pipeline

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn",
    device=0 if torch.cuda.is_available() else -1
)
    
def safe_summarize(document):
    MAX_CHAR_LEN = 3000
    document = document[:MAX_CHAR_LEN]

    if not document.strip():
        return "No valid text provided for summarization."

    result = summarizer(
        document,
        max_length=75,
        min_length=28,
        truncation=True,
        do_sample=False,
    )
    return result[0]["summary_text"]

def main() -> None:
    sys.stdin.reconfigure(encoding='utf-8')
    sys.stdout.reconfigure(encoding='utf-8')

    payload = json.load(sys.stdin)
    document = payload.get("input", "").strip()

    summary = safe_summarize(document)
    json.dump({"summary": summary}, sys.stdout, ensure_ascii=False)

if __name__ == "__main__":
    main()
