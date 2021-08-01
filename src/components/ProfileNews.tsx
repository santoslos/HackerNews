import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import { Item } from '../types/News';
import Preloader from './common/Preloader/Preloader';
import Comments from './Comments';
import styled from 'styled-components';

interface NewsProps {
  id: string | undefined;
}

const getNews = async (url: string) => {
  let response = await axios.get<Item>(url);
  return response.data;
};

const StyleFooterItem = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: left;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 7pt;
  text-align: left;
  margin-bottom: 10px;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 15pt;
  color: black;
  text-align: left;
`;

const ListComments = styled.ul``;

const ProfileNews = () => {
  let { id }: NewsProps = useParams();
  let { data } = useSWR(`https://api.hnpwa.com/v0/item/${id}.json`, getNews);

  if (!data) {
    return <Preloader />;
  } else {
    return (
      <div>
        <NavLink href={`${data.url}`}>{data.title}</NavLink>
        <StyleFooterItem>
          <span>
            {data.points} points by {data.user} {data.time_ago} | commentsCount: {data.comments_count}
          </span>
        </StyleFooterItem>
        <ListComments className={'list-group'}>
          <Comments comments={data.comments} />
        </ListComments>
      </div>
    );
  }
};

export default ProfileNews;
