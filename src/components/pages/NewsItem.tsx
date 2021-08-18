import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface NewsProps {
  title: string;
  points?: number | null;
  user?: string | null;
  timeAgo: string;
  id: number;
}
const StyleItem = styled.li`
  margin-top: 10px;
`;
const StyleItemContent = styled.div`
  justify-content: left;
  text-align: left;
`;

const StyleFooterItem = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: left;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 7pt;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 10pt;
  color: black;
`;

const NewsItem = ({ title, points, user, timeAgo, id }: NewsProps) => {
  return (
    <div>
      <StyleItem className={'list-group-item'}>
        <StyleItemContent>
          <NavLink to={`/news/${id}`}>{title}</NavLink>
          <StyleFooterItem>
            <span>
              {' '}
              {points} points by {user} {timeAgo}{' '}
            </span>
          </StyleFooterItem>
        </StyleItemContent>
      </StyleItem>
    </div>
  );
};

export default NewsItem;
