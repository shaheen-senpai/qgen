import { useState } from "react";
import axios from "axios";
import { generateQuestions } from "./api/api";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState(0);
  const [inputText, setInputText] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "A report generator is used to",
      options: [
        "a) update files",
        "b) print files on paper",
        "c) perform data entry",
        "d) All of the above",
      ],
    },
  ]);

  const renderQuestions = () => {
    return questions.map((question, index) => {
      return (
        <div key={index} className="m-4">
          <p>{question.question}</p>
          <div className="ml-4">
            {question.options.map((option: string, index: number) => {
              return (
                <li key={index} className="ml-4">
                  {option}
                </li>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const generatedQuestions = await generateQuestions(inputText);
    setQuestions(generatedQuestions);
    setLoading(false);
  };

  return (
    <>
      <div className="bg-slate-400 min-h-screen flex flex-col items-center justify-center font-mono">
        {loading ? (
          <div className="spinner bg-gradient-to-br from-purple-500 to-teal-400 w-24 h-24 animate-spin rounded-full text-center shadow-lg">
            <div className="spinner1 bg-gray-700 w-24 h-24 rounded-full filter blur-lg"></div>
          </div>
        ) : (
          <>
            <div className="h-1/6 font-extrabold text-5xl m-6 text-red-500">
              ShooperQuestion Generator
            </div>
            <div className="container max-w-screen-xl flex w-full">
              <div className="w-full flex flex-col">
                <h1 className="m-2 text-lg">
                  Text length: <b>50 - 2000 words</b>. Supports English.
                </h1>
                <p className="m-2">
                  Words Entered: <b>{words}</b>
                </p>
                <textarea
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setWords(e.target.value.split(" ").length);
                  }}
                  value={inputText}
                  className="flex-1 px-4 py-2 m-3 overflow-y-auto shadow-2xl rounded-lg align-top bg-yellow-200"
                />
                <button
                  className="bg-red-600 w-fit mr-4 rounded-md p-3 text-lg font-semibold self-end"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="w-full h-96 overflow-y-auto">
                <h1 className="m-2 text-xl font-semibold">Questions</h1>
                {renderQuestions()}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
