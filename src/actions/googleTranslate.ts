"use server";
import axios from "axios";

export const Translate = async (text: string) => {
  try {
    const translation = await axios({
      url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `q=${encodeURIComponent(text)}&target=${"th"}`,
    });

    return translation.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
  }
};
