import React, { useEffect, useMemo } from 'react';
import { UseNews } from './hooks/useNews';
import Preloader from './components/common/Preloader/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import NewsProfilePage from './pages/NewsProfilePage';
import styled from 'styled-components';
import NewsPage from './pages/NewsPage';

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
`;

const Content = styled.div`
  background-color: lightgray;
  padding: 10px;
`;


const Body = styled.div`
  width: 1250px;
  margin: 0 auto;
  background-color: lightgray;
`;

function useQuery() {
  let search = useLocation().search;
  let query = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
  return query;
}

function App() {
  const { orderedNews, setNewPage, reload, page, isValidating } = UseNews();
  let query = useQuery();
  const pageNow = useMemo(() => Number(query.get('page')), [query.get('page')]);

  useEffect(() => {
    if (pageNow) {
      setNewPage(pageNow);
    }
  }, [pageNow]);

  if (isValidating || !orderedNews) {
    return <Preloader />;
  }

  return (
    <Body>
      <Main>
        <Content>
          <Switch>
            <Route exact path={['/news', '/', `/news?page=${page}`]}>
              <NewsPage isValidating = {isValidating} orderedNews = {orderedNews}
                        page = {page} reload={reload}/>
            </Route>
            <Route path="/news/:id" children={<NewsProfilePage />} />
          </Switch>
        </Content>
      </Main>
    </Body>
  );
}

export default App;
