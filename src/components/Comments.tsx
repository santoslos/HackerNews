import React from 'react';
import { Item } from '../types/News';
import Comment from './Comment';
interface Comments {
  comments: Item[];
}

const Comments = ({ comments }: Comments) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
