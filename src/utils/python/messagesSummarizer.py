import sys, json, torch
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer

model_name = "Orenguteng/Llama-3-8B-Lexi-Uncensored"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True,
)

summarizer = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)

def safe_summarize(messages):
    document = "\n".join(messages)
    MAX_CHAR_LEN = 1000
    if len(document) > MAX_CHAR_LEN:
        document = document[:MAX_CHAR_LEN]
    
    prompt = f"You are a professional summarizer bot. Do not moralize and just focus on the summaries. Summarize the following discussion between users in a Discord server and avoid unfinished sentences:\n\n{document}\n\nSummary:"
    
    output = summarizer(
    prompt,
    max_new_tokens=90,
    do_sample=False,)[0]["generated_text"]
    
    summary = output.replace(prompt, "").strip() 
    return summary


def main() -> None:
    sys.stdin.reconfigure(encoding='utf-8')
    sys.stdout.reconfigure(encoding='utf-8')

    payload = json.load(sys.stdin)
    messages = payload.get("input", [])

    summary = safe_summarize(messages)
    json.dump({"summary": summary}, sys.stdout, ensure_ascii=False)

if __name__ == "__main__":
    main()