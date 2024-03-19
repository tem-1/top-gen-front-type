import { useState } from 'react';
import { FunctionComponent } from 'react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/hooks/axios';
import { toast } from 'react-toastify';
interface CommentButtonProps { }

const CommentButton: FunctionComponent<CommentButtonProps> = () => {
  const [comment, setComment] = useState<string>('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      axiosInstance
        .post('/comment', { description: comment })
        .then(() => {
          toast.success("Амжилттай")
        })
        .catch((error: any) => {
          console.error('Error submitting comment:', error);
          toast.error(error.response.data.msg)
        });
    } else {
      console.warn('Please enter a comment');
    }
  };

  return (
    <div className="w-auto rounded-xl mb-12 bg-white shadow-xl flex py-2 gap-2 p-2">
      <textarea
        rows={3}
        className="border rounded-xl flex-1 p-4 my-2"
        placeholder="Сэтгэгдэл бичих..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <Button className="primary-button p-6 flex" onClick={handleCommentSubmit}>
        Илгээх
      </Button>
    </div>
  );
};

export default CommentButton;
