export async function translateText(text, targetLang, sourceLang = 'en') {
  if (!text || targetLang === sourceLang) return text;
  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  return data.translatedText;
} 