import axios from 'axios';

export async function fetchTranslation(text: string, language:string ) {
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {
      'to[0]': language,
      'api-version': '3.0',
      profanityAction: 'NoAction',
      textType: 'plain'
    },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    data: [
      {
        Text: text,
      }
    ]
  };

  try {
    const response = await axios.request(options);
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
