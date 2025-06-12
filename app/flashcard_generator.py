from pypdf import PdfReader
import tensorflow as tf
import re, random

# LOAD MODEL TENSORFLOW
model = tf.keras.models.load_model('my_pdf_text_classifier.h5')

# Jika model kamu butuh tokenizer khusus, load/definisikan di sini
# tokenizer = ... 

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    return {
        f"Seksi {i+1}": page.extract_text().strip()
        for i, page in enumerate(reader.pages)
        if page.extract_text()
    }

def generate_question(text, answer):
    # Temukan satu kalimat acak dari text untuk konteks (tidak harus yang ada answer-nya)
    sentences = [s.strip() for s in re.split(r'[.?!]', text) if len(s.strip()) > 20]
    context = random.choice(sentences) if sentences else text.strip()[:120]
    
    # Pilihan pertanyaan variatif tanpa menyebut jawaban
    patterns = [
        # Definisi (pendek & panjang)
        lambda: "Apa yang dimaksud dengan konsep berikut dalam materi ini?",
        lambda: f"Jelaskan pengertian sebuah istilah penting yang berkaitan dengan konteks: '{context}'.",
        # Aplikasi (pendek & panjang)
        lambda: "Bagaimana penerapan dari salah satu konsep utama materi ini?",
        lambda: f"Berikan satu contoh nyata penggunaan teori dalam paragraf: '{context}'.",
        # Alasan/Sebab-akibat
        lambda: "Mengapa suatu hal dalam materi ini dianggap penting untuk dipelajari?",
        lambda: f"Apa yang menyebabkan fenomena yang dijelaskan dalam kalimat berikut terjadi: '{context}'?",
        # Hubungan konsep
        lambda: "Sebutkan satu hubungan antara dua konsep yang dibahas dalam materi ini.",
        lambda: f"Ada dua istilah dalam materi ini yang saling berkaitan. Jelaskan hubungan tersebut berdasarkan paragraf berikut: '{context}'.",
        # Manfaat
        lambda: "Apa manfaat utama mempelajari materi ini bagi mahasiswa?",
        # Contoh (panjang & pendek)
        lambda: "Berikan sebuah contoh penerapan konsep dari materi ini.",
        lambda: f"Buat contoh kasus sesuai dengan materi berikut: '{context}'",
        # Proses/urutan
        lambda: "Jelaskan urutan langkah atau proses utama dalam topik yang dipelajari.",
        # Sifat/karakteristik
        lambda: "Sebutkan salah satu ciri khas utama dari materi yang dibahas.",
        # Komparasi
        lambda: "Apa perbedaan utama antara dua istilah yang sering muncul dalam materi ini?",
        lambda: f"Bandingkan dua konsep yang dijelaskan pada konteks berikut: '{context}'.",
        # Isian (tanpa jawaban bocor)
        lambda: f"Lengkapi kalimat berikut dengan istilah yang tepat: '{context.replace(answer, '_____')}'" if answer in context else "Lengkapi kalimat berikut dengan istilah penting yang sesuai.",
        # Ringkasan
        lambda: "Ringkaslah inti materi ini dalam satu atau dua kalimat.",
        # Studi kasus/skenario
        lambda: f"Berdasarkan kalimat berikut, buatlah skenario singkat yang sesuai: '{context}'.",
        # True/False
        lambda: "Benar atau salah: Salah satu konsep materi ini adalah bagian dari teori utama bidang studi ini. Jelaskan jawaban Anda.",
        # Analisis kritis
        lambda: "Buat analisis singkat tentang manfaat atau tantangan mempelajari topik ini."
    ]
    # Pilih pertanyaan random dari pola di atas
    question = random.choice(patterns)()
    return question

def generate_flashcards_from_pdf(pdf_path):
    sections = extract_text_from_pdf(pdf_path)
    all_cards = []
    for section, text in sections.items():
        # Pilih kata kunci/jawaban unik dari teks yang cukup panjang
        words = list(set(w for w in text.split() if len(w) > 4 and not w.isdigit()))
        selected = random.sample(words, min(3, len(words)))
        for answer in selected:
            try:
                q = generate_question(text, answer)
                # Jawaban bisa pendek/panjang, random (contoh, satu kata, atau satu kalimat jika ingin)
                answer_variasi = [
                    answer,                                  # satu kata
                    answer.capitalize(),                     # kapitalisasi
                    f"Contohnya adalah {answer}.",           # jawaban sedang
                    f"{answer} adalah bagian penting materi.",# jawaban kalimat
                    f"Misal: {answer}."                      # variasi singkat
                ]
                answer_final = random.choice(answer_variasi)
                opts = random.sample([w for w in words if w != answer], min(3, len(words)-1))
                options = opts + [answer]
                random.shuffle(options)
                all_cards.append({
                    "question": q,
                    "options": options,
                    "answer": answer_final  # ini jawaban aslinya, bisa disesuaikan di client jika mau satu kata
                })
            except Exception as e:
                print(f"Error menghasilkan kartu: {e}")
                continue
    return all_cards
