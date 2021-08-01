import React from 'react';
import { useParams } from 'react-router-dom';

import Preloader from './common/Preloader/Preloader';
import Comments from './Comments';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {StoreComments} from '../hooks/storeComments';

interface NewsProps {
  id: string | undefined;
}


const StyleFooterItem = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: left;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 7pt;
  text-align: left;
  margin-bottom: 10px;
  margin-left: 30px;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 15pt;
  color: black;
  text-align: left;
`;
const LinkBack = styled(Link)`
  text-decoration: none;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 10pt;
  color: black;
`;

const ItemTitle = styled.div`
  align-items: center;
  display: flex;
`;

const ListComments = styled.ul``;

const ProfileNews = () => {
  let { id }: NewsProps = useParams();
  let { data } = StoreComments(id);
  if (!data) {
    return <Preloader />;
  } else {
    return (
      <div>
        <ItemTitle>
          <LinkBack to={'/news'}>
            {' '}
            <img src="https://img.icons8.com/material-outlined/24/000000/back--v1.png" />
          </LinkBack>
          <NavLink href={`${data.url}`}>{data.title}</NavLink>
        </ItemTitle>
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
