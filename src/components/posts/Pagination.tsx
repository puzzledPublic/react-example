import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({
  username,
  tag,
  page,
}: {
  username: string | null;
  tag: string | null;
  page: number;
}) => {
  const query = qs.stringify({ tag, page, username });
  //   return username ? `@${username}?${query}` : `/?${query}`;
  return `?${query}`;
};

interface PaginationPropType {
  page: number;
  lastPage: number;
  username: string | null;
  tag: string | null;
}

function Pagination({ page, lastPage, username, tag }: PaginationPropType) {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
}

export default Pagination;
