import React, { useEffect, useMemo } from 'react';
import { StoreNews } from './hooks/storeNews';
import NewsItem from './components/NewsItem';
import Preloader from './components/common/Preloader/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, NavLink, useLocation } from 'react-router-dom';
import ProfileNews from './components/ProfileNews';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
`;

const Reload = styled.button`
  margin-left: 30px;
`;

const Content = styled.div`
  background-color: lightgray;
  padding: 10px;
`;

const ListNews = styled.ul``;

const Paginator = styled.ul`
  display: flex;
  justify-content: center;
`;

const Body = styled.div`
  width: 1250px;
  margin: 0 auto;
  background-color: lightgray;
`;

function useQuery() {
  let search = useLocation().search;
  let query = useMemo(()=>  { return new URLSearchParams(search); },
      [search]);
  return query;
}

function App() {
  const { orderedNews, setNewPage, reload, page, isValidating } = StoreNews();
  let query = useQuery();
  const pageNow = useMemo(() => Number(query.get('page')), [query.get('page')]);

  useEffect(() => {
    if (pageNow) {
      setNewPage(pageNow);
    }
  }, [pageNow]);

  if (isValidating || !orderedNews){
    return  (<Preloader />);
  }

  return (
    <Body>
      <Main>
          <Content>
            <Switch>
              <Route exact path={['/news', '/', `/news?page=${page}`]}>
                <Paginator className={'pagination'}>
                  <li className={'page-item'}>
                    {' '}
                    <NavLink to={page <= 1 ? `/news?page=${1}` : `/news?page=${page - 1}`} className={'page-link'}>&laquo;</NavLink>
                  </li>
                  <li className={'page-item'}>
                    <NavLink to={page >= 12 ? `/news?page=${12}` : `/news?page=${page + 1}`} className={'page-link'}>&raquo;</NavLink>
                  </li>
                  <Reload onClick={reload} className="btn btn-primary">
                    reload
                  </Reload>
                </Paginator>
                {!(orderedNews.length) ? (
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
                </ListNews>)}
              </Route>
              <Route path='/news/:id' children={<ProfileNews />} />
            </Switch>
          </Content>
      </Main>
    </Body>
  );
}

export default App;
