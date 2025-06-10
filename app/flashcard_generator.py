from pypdf import PdfReader
from transformers import T5Tokenizer, T5ForConditionalGeneration
import re, random

tokenizer = T5Tokenizer.from_pretrained("valhalla/t5-base-qg-hl")
model = T5ForConditionalGeneration.from_pretrained("valhalla/t5-base-qg-hl")

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    return {
        f"Seksi {i+1}": page.extract_text().strip()
        for i, page in enumerate(reader.pages)
        if page.extract_text()
    }

def generate_question(text, answer):
    sentence = next((s for s in re.split(r'[.?!]', text) if answer in s), text[:512])
    highlighted = sentence.replace(answer, f"<hl> {answer} <hl>", 1)
    input_text = f"generate question: {highlighted}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True, max_length=512)
    outputs = model.generate(input_ids, max_length=64, num_beams=4)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

def generate_flashcards_from_pdf(pdf_path):
    sections = extract_text_from_pdf(pdf_path)
    all_cards = []

    for section, text in sections.items():
        words = list(set(w for w in text.split() if len(w) > 4))
        selected = random.sample(words, min(3, len(words)))
        for answer in selected:
            try:
                q = generate_question(text, answer)
                opts = random.sample([w for w in words if w != answer], min(3, len(words)-1))
                options = opts + [answer]
                random.shuffle(options)
                # Memastikan all_cards berisi dictionary
                all_cards.append({
                    "question": q,  # Pastikan ini adalah string
                    "options": options,  # Pastikan ini adalah list
                    "answer": answer  # Pastikan ini adalah string
                })
            except Exception as e:
                print(f"Error generating card: {e}")
                continue
    return all_cards
