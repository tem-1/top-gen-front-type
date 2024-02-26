import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";

interface CommentButtonProps {}

const CommentButton: FunctionComponent<CommentButtonProps> = () => {
  return (
    <div className="w-auto rounded-xl my-12 bg-white shadow-xl flex px-2 py-2 gap-2 mx-3  ">
      <textarea
        rows={3}
        className=" border rounded-xl flex-1  p-2"
        placeholder="Сэтгэгдэл бичих..."
      ></textarea>
      <Button className="primary-button p-6 mt-2 flex ">Илгээх</Button>
    </div>
  );
};

export default CommentButton;
