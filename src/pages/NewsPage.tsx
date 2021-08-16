import React from 'react';
import NewsItem from './NewsItem';
import Preloader from '../components/common/Preloader/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { News } from '../types/News';

interface NewsPageProps {
  isValidating: boolean;
  orderedNews: News[];
  page: number;
  reload: () => void;
}

const Reload = styled.button`
  margin-left: 30px;
`;

const ListNews = styled.ul``;

const Paginator = styled.ul`
  display: flex;
  justify-content: center;
`;

function NewsPage({ isValidating, orderedNews, page, reload }: NewsPageProps) {
  if (isValidating || !orderedNews) {
    return <Preloader />;
  }

  return (
    <div>
      <Paginator className={'pagination'}>
        <li className={'page-item'}>
          {' '}
          <NavLink to={page <= 1 ? `/news?page=${1}` : `/news?page=${page - 1}`} className={'page-link'}>
            &laquo;
          </NavLink>
        </li>
        <li className={'page-item'}>
          <NavLink to={page >= 12 ? `/news?page=${12}` : `/news?page=${page + 1}`} className={'page-link'}>
            &raquo;
          </NavLink>
        </li>
        <Reload onClick={reload} className="btn btn-primary">
          reload
        </Reload>
      </Paginator>
      {!orderedNews.length ? (
        <div> Нет данных</div>
      ) : (
        <ListNews className={'list-group'}>
          {orderedNews.map((newsItem) => (
            <NewsItem
              key={newsItem.id}
              title={newsItem.title}
              points={newsItem.points}
              user={newsItem.user}
              timeAgo={newsItem.time_ago}
              id={newsItem.id}
            />
          ))}
        </ListNews>
      )}
    </div>
  );
}

export default NewsPage;
