import { useState } from "react";
import CircularProgress from "../Progress/Progress";

interface QuizProp {
  quizData: any;
}
const Quiz = ({ quizData }: QuizProp) => {
  console.log(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption: string) => {
    setScore((prevScore) => {
      if (selectedOption === quizData[currentQuestion]?.correctAnswer) {
        return prevScore + 1;
      }
      return prevScore;
    });

    setCurrentQuestion((prevQuestion) => {
      let nextQuestion = prevQuestion + 1;
      if (nextQuestion < quizData?.length) {
        return nextQuestion;
      } else {
        setShowScore(true);
        return prevQuestion;
      }
    });

    // Reset showScore when quiz completes
    if (currentQuestion === quizData.length - 1) {
      setShowScore(false);
    }
  };

  const percent = (score / quizData?.length) * 100;

  return quizData == null ? (
    <div>loading</div>
  ) : quizData?.length == 0 ? (
    <div className="w-full text-center py-4">Тест байхгүй байна</div>
  ) : (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg w-full h-full items-center justify-center">
      {showScore ? (
        <div className="text-center text-xl font-semibold">
          Та {quizData?.length} тестээс {score}-г зөв хариуллаа
          <br />
          <div className="flex flex-col items-center justify-center w-full my-8">
            <CircularProgress percent={percent} />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-center text-lg font-semibold">
              Question {currentQuestion + 1}/{quizData?.length}
            </div>
            <div className="text-center text-xl mt-2">
              {quizData[currentQuestion]?.question}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {quizData[currentQuestion]?.options?.map(
              (option: any, index: any) => {
                console.log(option);
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(option)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {option}
                  </button>
                );
              }
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
