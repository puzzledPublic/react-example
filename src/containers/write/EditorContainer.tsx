import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { changeField, initialize, ChangeFieldInfo } from '../../modules/write';
import Editor from '../../components/write/Editor';

function EditorContainer() {
  const dispatch = useDispatch();
  const { title, body } = useSelector<
    RootState,
    { title: string; body: string }
  >(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(
    (payload: ChangeFieldInfo) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      //언마운트될 때 초기화
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
}

export default EditorContainer;
