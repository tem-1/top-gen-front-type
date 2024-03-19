import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import axiosInstance from "@/hooks/axios";
import { X } from "lucide-react";

interface ModalOpen {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}

const Modal = ({ isOpen, id, onClose }: ModalOpen) => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axiosInstance
        .get(`https://topgeniuses.tanuweb.cloud/api/v1/quiz/${id}`)
        .then((res) => setTest(res.data.data))
        .catch((error) => console.error("Error fetching quiz data:", error));
    }
  }, [isOpen, id]);

  return (
    <div
      className={`fixed inset-0 px-2 z-10 overflow-hidden ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      {isOpen && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      )}
      {isOpen && (
        <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
          {/* Modal Header */}
          <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
            <h2 className="text-lg font-semibold">Тест</h2>
            <X onClick={onClose} className="cursor-pointer" />
          </div>
          {/* Modal Body */}
          <Quiz quizData={test} />
          {/* Modal Footer */}
        </div>
      )}
    </div>
  );
};

export default Modal;
