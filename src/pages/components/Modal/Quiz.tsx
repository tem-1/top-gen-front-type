import { useState } from "react";
interface QuizProp {
  quizData: any;
}
const Quiz = ({ quizData }: QuizProp) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const handleAnswerOptionClick = (selectedOption: string) => {
    if (selectedOption === quizData[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
    let nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData?.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return quizData?.length == 0 || quizData == null ? (
    <div>loading</div>
  ) : (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg w-full h-full items-center justify-center">
      {showScore ? (
        <div className="text-center text-xl font-semibold">
          You scored {score} out of {quizData?.length}
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
            {quizData[currentQuestion]?.options?.map((option: any) => (
              <button
                key={option}
                onClick={() => handleAnswerOptionClick(option)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
