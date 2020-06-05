import client from './client';
import { PostRequest } from '../../modules/write';
import qs from 'qs';

export const writePost = ({ title, body, tags }: PostRequest) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id: string) => client.get(`/api/posts/${id}`);

export const listPost = ({
  page,
  username,
  tag,
}: {
  page: number;
  username: string;
  tag: Array<string>;
}) => {
  const queryString = qs.stringify({ page, username, tag });
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({
  id,
  title,
  body,
  tags,
}: PostRequest & { id: string }) => {
  return client.patch(`/api/posts/${id}`, { title, body, tags });
};

export const removePost = (id: string) => client.delete(`/api/posts/${id}`);
