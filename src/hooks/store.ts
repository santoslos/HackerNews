import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { News } from '../types/News';

export function StoreNews() {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<News[]>([]);
  const [idInterval, setIdInterval] = useState(0);

  let time = React.useCallback(() => {
    return setInterval(() => {
      axios.get<News[]>(`https://api.hnpwa.com/v0/newest/${page}.json`).then((responses) => {
        setNews(responses.data);
      });
    }, 1000);
  }, [page]);

  const setNewPage = React.useCallback((newPage: number) => {
    if (newPage > 12) setPage(12);
    else if (newPage < 1) {
      setPage(1);
    } else {
      setPage(newPage);
    }
  }, []);

  useEffect(() => {
    if (idInterval) {
      clearInterval(idInterval);
    }
    axios.get<News[]>(`https://api.hnpwa.com/v0/newest/${page}.json`).then((responses) => {
      setNews(responses.data);
    });
    const id = time();
    // @ts-ignore
    setIdInterval(id);
  }, [page]);

  const orderedNews = useMemo(() => [...news].sort((a, b) => (a.time < b.time ? 1 : -1)), [news]);
  return {
    orderedNews,
    setNewPage,
  };
}
