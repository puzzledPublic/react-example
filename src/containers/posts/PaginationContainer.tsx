import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { PostType } from '../../modules/post';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

function PaginationContainer() {
  const location = useLocation();
  const { lastPage, posts, loading } = useSelector<
    RootState,
    { lastPage: number; posts: Array<PostType> | null; loading: boolean }
  >(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  if (!posts || loading) {
    return null;
  }

  const { tag, username, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  
  return (
    <Pagination
      tag={tag as string}
      username={username as string | null}
      lastPage={lastPage}
      page={parseInt(page as string)}
    />
  );
}

export default PaginationContainer;
