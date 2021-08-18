import React from 'react';
import { Item } from '../../../types/News';
import CommentPage from './CommentPage';
interface CommentsPageType {
  comments: Item[];
}

const CommentsPage = ({ comments }: CommentsPageType) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentPage key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsPage;
