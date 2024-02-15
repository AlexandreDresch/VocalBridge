import axios, { AxiosRequestConfig } from "axios";

export interface ITranslationResult {
  from: string;
  to: string;
  translation: string;
}

export async function fetchTranslation(text: string, language: string) : Promise<ITranslationResult> {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to": language,
      "api-version": "3.0",
      profanityAction: "NoAction",
      textType: "plain",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY as string,
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios.request(options);

    const result: ITranslationResult = {
      from: response.data[0].detectedLanguage.language,
      to: response.data[0].translations[0].to,
      translation: response.data[0].translations[0].text,
    };

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
