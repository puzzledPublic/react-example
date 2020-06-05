import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import TagBox from '../../components/write/TagBox';
import { changeField } from '../../modules/write';

function TagBoxContainer() {
  const dispatch = useDispatch();
  const { tags } = useSelector<RootState, { tags: Array<string> }>(
    ({ write }) => ({
      tags: write.tags,
    }),
  );

  const onChangeTags = (nextTags: Array<string>) => {
    dispatch(changeField({ key: 'tags', value: nextTags }));
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
}

export default TagBoxContainer;
