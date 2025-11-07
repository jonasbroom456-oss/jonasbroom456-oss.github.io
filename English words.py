import openai

# Set your OpenAI API key
openai.api_key = "your-api-key-here"

def translate_text(text, source_lang, target_lang):
    prompt = (
        f"Translate the following text from {source_lang} to {target_lang}. "
        f"Text: \"{text}\""
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful AI translator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=200
    )

    return response['choices'][0]['message']['content'].strip()

def chat():
    print("Welcome to Homework Companion Translator!")
    while True:
        source = input("\nEnter source language (Spanish, Swedish, English): ").strip().capitalize()
        target = input("Enter target language (Spanish, Swedish, English): ").strip().capitalize()
        if source == target:
            print("Source and target languages must be different.")
            continue
        text = input("Enter text to translate: ").strip()
        translation = translate_text(text, source, target)
        print(f"\nTranslated text:\n{translation}")

if __name__ == "__main__":
    chat()
