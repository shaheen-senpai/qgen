import axios from "axios";

export const generateQuestions = async (inputText: string) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: `Generate multiple choice questions based on the following passage:\n\n${inputText}\n\nQuestions:\n1. `,
        max_tokens: 1024,
        temperature: 0.5,
        n: 3,
        stop: "\n",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );
    const { choices } = response.data?.choices[0];
    const generatedQuestions = choices
      .map((choice: any) => choice.text.trim())
      .join("")
      .split("1. ")
      .slice(1)
      .map((q: any) => {
        const parts = q.split(/(a\)|b\)|c\)|d\))/i);
        const question = parts[0].trim();
        const options = parts.slice(1).map((part: any) => part.trim());
        return { question, options };
      });
    return generatedQuestions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
