import React, { useState } from 'react';
import { Item } from '../types/News';
import styled from 'styled-components';
import Comments from './Comments';
import sanitizeHtml from 'sanitize-html';
interface commentProps {
  comment: Item;
}

const CommentMain = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;

const CommentContent = styled.div`
  font-family: Verdana, Geneva, sans-serif;
  font-size: 9pt;
`;

const CommentItem = styled.li`
  margin-top: 10px;
  background-color: lightgray;
`;

const CommentFooter = styled.a`
  text-decoration: none;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 10pt;
  color: black;
`;

const TittleComment = styled.div`
  display: flex;
  justify-content: left;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 7pt;
  text-align: left;
  margin-bottom: 5px;
`;

const Comment = ({ comment }: commentProps) => {
  const [viewAllComments, setViewAllComments] = useState(false);

  const setView = (status: boolean) => {
    setViewAllComments(status);
  };
  const sanitizeContent = sanitizeHtml(comment.content, { allowedTags: false, allowedAttributes: false });
  return (
    <CommentMain>
      <CommentItem key={comment.id} className={'list-group-item'}>
        <TittleComment>
          {' '}
          {comment.user} {comment.time_ago}
        </TittleComment>
        <CommentContent dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
        {comment.comments.length > 0 && (
          <CommentFooter
            onClick={() => {
              setView(!viewAllComments);
            }}
          >
            AllComments
          </CommentFooter>
        )}
        {comment.comments.length > 0 && viewAllComments && (
          <div>
            <Comments key={comment.id} comments={comment.comments} />
          </div>
        )}
      </CommentItem>
    </CommentMain>
  );
};

export default Comment;
