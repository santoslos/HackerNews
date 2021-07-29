import React from 'react';

interface NewsProps {
  title: string;
  points?: number | null;
  user?: string | null;
  timeAgo: string;
}
const NewsItem = ({ title, points, user, timeAgo }: NewsProps) => {
  return (
    <div>
      <li>
        {title}:{points}:{user}:{timeAgo}
      </li>
    </div>
  );
};

export default NewsItem;
