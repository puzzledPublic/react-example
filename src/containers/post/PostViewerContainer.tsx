import React, { useEffect } from 'react';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { readPost, unloadPost } from '../../modules/post';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import { PostType } from '../../modules/post';
import { UserInfo } from '../../modules/user';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

function PostViewerContainer() {
  const history = useHistory();
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector<
    RootState,
    {
      post: PostType | null;
      error: AxiosError | null;
      loading: boolean;
      user: UserInfo | null;
    }
  >(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user,
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  //수정 할 페이지에서 뒤로가기 후 다시 앞으로가기 눌렀을시 복구되지 않는 문제 생김. (write 페이지를 벗어날때 상태를 초기화 해버림.)
  const onEdit = () => {
    if (!post) return;
    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={user != null && user._id === post?.user._id}
    />
  );
}

export default PostViewerContainer;
