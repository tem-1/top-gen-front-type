import React from "react";
import { Undo2 } from "lucide-react";
const CommentCard = () => {
  const userComments = [
    {
      name: "bataa sda bna ",
      comments:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well ",
    },
    {
      name: "bataa sda bna ",
      comments:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well ",
    },
    {
      name: "bataa sda bna ",
      comments:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well ",
    },
    {
      name: "bataa sda bna ",
      comments:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well ",
    },
    {
      name: "bataa sda bna ",
      comments:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well ",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {userComments.map((item, index) => (
        <div
          key={index}
          className="w-auto h-auto bg-white rounded-xl flex flex-col  p-4 m-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-full w-10 h-10 bg-green-600"></div>
              <span className="font-semibold"> {item?.name} </span>
            </div>
          </div>
          <div className="mt-2">
            <p className="line-clamp-3 text-[#67727E]">{item.comments}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
