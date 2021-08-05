import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { News } from '../types/News';
import useSWR from 'swr';

const getNews = async (url: string) => {
  let response = await axios.get<News[]>(url);
  return response.data;
};

export function StoreNews() {
  const [page, setPage] = useState(1);
  const [idInterval, setIdInterval] = useState(0);
  let { data, mutate } = useSWR(`https://api.hnpwa.com/v0/newest/${page}.json`, getNews);

  let time = React.useCallback(() => {
    return setInterval(() => {
      mutate(data, true);
    }, 60000);
  }, [page]);

  const reload = () => {
    mutate(data, true);
  };

  const setNewPage = React.useCallback((newPage: number) => {
    if (newPage > 10) setPage(10);
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
    mutate(data, true);
    const id = time();
    // @ts-ignore
    setIdInterval(id);
  }, [page]);

  const orderedNews = useMemo(() => {
    if (data) {
      let sort = [...data].sort((a, b) => (a.time < b.time ? 1 : -1));
      return sort;
    } else {
      return [];
    }
  }, [data]);

  return {
    orderedNews,
    setNewPage,
    reload,
    page,
  };
}
