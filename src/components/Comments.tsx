import React from 'react';
import { Item } from '../types/News';
import styled from 'styled-components';
interface Comments {
  comments: Item[];
}
const Comment = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;
const CommentsContent = styled.div`
  font-family: Verdana, Geneva, sans-serif;
  font-size: 9pt;
`;
const CommentsItem = styled.li`
  margin-top: 10px;
  background-color: lightgray;
`;
const TittleComment = styled.div`
  display: flex;
  justify-content: left;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 7pt;
  text-align: left;
  margin-bottom: 5px;
`;

const Comments = ({ comments }: Comments) => {
  comments.map((comment) => {
    console.log(comment.comments);
  });
  return (
    <Comment>
      {comments.map((comment) => (
        <CommentsItem key={comment.id} className={'list-group-item'}>
          <TittleComment>
            {' '}
            {comment.user} {comment.time_ago}
          </TittleComment>
          <CommentsContent dangerouslySetInnerHTML={{ __html: comment.content }} />
          {comment.comments.length > 0 && <Comments key={comment.id} comments={comment.comments} />}
        </CommentsItem>
      ))}
    </Comment>
  );
};

export default Comments;
