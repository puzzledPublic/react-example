import React, { useEffect } from 'react';
import PostList from '../../components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { listPosts } from '../../modules/posts';
import { AxiosError } from 'axios';
import { PostType } from '../../modules/post';
import { UserInfo } from '../../modules/user';

function PostListContainer() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector<
    RootState,
    {
      posts: Array<PostType> | null;
      error: AxiosError | null;
      loading: boolean;
      user: UserInfo | null;
    }
  >(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user,
  }));

  useEffect(() => {
    console.log(location.search);
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const tagParam = tag as string;
    const usernameParam = username as string;
    const pageParam = parseInt(page as string);
    console.log(tag, username, page);
    dispatch(
      listPosts({
        tag: tagParam,
        username: usernameParam,
        page: pageParam,
      }),
    );
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
}

export default PostListContainer;
