import React from 'react';
import { StoreNews } from './hooks/store';
import NewsItem from './components/NewsItem';
import Preloader from './components/common/Preloader/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
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
function App() {
  const { orderedNews, setNewPage, reload, page } = StoreNews();
  return (
    <Main>
      {!orderedNews.length ? (
        <Preloader />
      ) : (
        <Content>
          <Switch>
            <Route exact path={'/news'}>
              <Paginator className={'pagination'}>
                <li
                  className={'page-item'}
                  onClick={() => {
                    setNewPage(page - 1);
                  }}
                >
                  {' '}
                  <button className={'page-link'}>&laquo;</button>
                </li>
                <li
                  className={'page-item'}
                  onClick={() => {
                    setNewPage(page + 1);
                  }}
                >
                  <button className={'page-link'}>&raquo;</button>
                </li>
                <Reload onClick={reload} className="btn btn-primary">
                  {' '}
                  reload
                </Reload>
              </Paginator>
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
            </Route>
            <Route path="/news/:id" children={<ProfileNews />} />
          </Switch>
        </Content>
      )}
    </Main>
  );
}

export default App;
