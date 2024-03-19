import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import axiosInstance from "@/hooks/axios";

interface ModalOpen {
  isOpen: boolean;
  id: string;
}

const Modal = ({ isOpen, id }: ModalOpen) => {
  const [test, setTest] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    // Fetch quiz data when the component mounts or `id` changes
    if (isOpen) {
      // Fetch quiz data only when modal is open
      axiosInstance
        .get(`https://topgeniuses.tanuweb.cloud/api/v1/quiz/${id}`)
        .then((res) => setTest(res.data.data))
        .catch((error) => console.error("Error fetching quiz data:", error));
    }
  }, [isOpen, id]);

  return (
    <div className="flex justify-center items-center ">
      {open && (
        <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          {/* Modal Content */}
          <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
            {/* Modal Header */}
            <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
              <h2 className="text-lg font-semibold">Тест</h2>
            </div>
            {/* Modal Body */}
            <Quiz quizData={test} />
            {/* Modal Footer */}
            <div className="border-t px-4 py-2 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-indigo-500 text-white rounded-md w-full sm:w-auto"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
