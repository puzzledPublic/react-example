import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { WritePostState, writePost, updatePost } from '../../modules/write';
import { useHistory } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';

function WriteActionButtonsContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector<
    RootState,
    WritePostState
  >(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    originalPostId: write.originalPostId,
  }));

  //포스트 등록
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ id: originalPostId, title, body, tags }));
      return;
    }
    dispatch(writePost({ title, body, tags }));
  };

  //취소
  const onCancel = () => {
    history.goBack();
  };

  //성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
}

export default WriteActionButtonsContainer;
