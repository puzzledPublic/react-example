import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const SubInfoBlock = styled.div<{ hasMarginTop: boolean }>`
    ${(props) =>
      props.hasMarginTop &&
      css`
        margin-top: 1rem;
      `}

    color: ${palette.gray[6]};

    span + span::before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7'; /* 가운데점 문자 */
    }
`;

interface SubInfoPropType {
  username: string;
  publishedDate: Date;
  hasMarginTop?: boolean;
}

function SubInfo({
  username,
  publishedDate,
  hasMarginTop = false,
}: SubInfoPropType) {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
}

export default SubInfo;
