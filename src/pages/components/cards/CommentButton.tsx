import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";

interface CommentButtonProps {}

const CommentButton: FunctionComponent<CommentButtonProps> = () => {
  return (
    <div className="w-auto rounded-xl mb-12 bg-white shadow-xl flex py-2 gap-2   ">
      <textarea
        rows={3}
        className=" border rounded-xl flex-1  p-2"
        placeholder="Сэтгэгдэл бичих..."
      ></textarea>
      <Button className="primary-button p-6  flex ">Илгээх</Button>
    </div>
  );
};

export default CommentButton;
