import React from 'react';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostListPage from './pages/PostListPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
      <Route path={['/@:username', '/']} component={PostListPage} exact />
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/register'} component={RegisterPage} />
      <Route path={'/write'} component={WritePage} />
      <Route path={'/@:username/:postId'} component={PostPage} />
    </>
  );
}

export default App;
