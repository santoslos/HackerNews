import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Preloader from './common/Preloader/Preloader';
import Comments from './Comments';
import styled from 'styled-components';

import { StoreComments } from '../hooks/storeComments';

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

const ItemStyle = styled.div`
  margin: 0 auto;
`;

const ItemButton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileNews = () => {
  let { id }: NewsProps = useParams();
  const { data, reload } = StoreComments(id);

  if (!data) {
    return <Preloader />;
  } else {
    return (
      <ItemStyle>
        <ItemButton>
          <button onClick={reload} className="btn btn-primary">
            {' '}
            reload
          </button>
        </ItemButton>
        <ItemTitle>
          <LinkBack to={'/news'}>
            {' '}
            <img src="https://img.icons8.com/material-outlined/24/000000/back--v1.png" />
          </LinkBack>
          <NavLink href={`${data.url}`}>{data.title}</NavLink>
        </ItemTitle>
        <StyleFooterItem>
          {data.points} points by {data.user} {data.time_ago} | commentsCount: {data.comments_count}
        </StyleFooterItem>
        <ListComments className={'list-group'}>
          <Comments key={data.id} comments={data.comments} />
        </ListComments>
      </ItemStyle>
    );
  }
};

export default ProfileNews;
