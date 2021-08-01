import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Item } from '../types/News';
import useSWR from 'swr';

const getItem = async (url: string) => {
  let response = await axios.get<Item>(url);
  return response.data;
};

export function StoreComments(id: string | undefined) {
  const [idInterval, setIdInterval] = useState(0);
  let { data, mutate } = useSWR(`https://api.hnpwa.com/v0/item/${id}.json`, getItem);

  let time = React.useCallback(() => {
    return setInterval(() => {
      mutate(data, true);
    }, 60000);
  }, [id]);

  const reload = () => {
    mutate(data, true);
  };

  useEffect(() => {
    if (idInterval) {
      clearInterval(idInterval);
    }
    mutate(data, true);
    const id = time();
    // @ts-ignore
    setIdInterval(id);
  }, [id]);

  return {
    data,
    reload,
  };
}
