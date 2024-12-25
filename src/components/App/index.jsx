import Header from '../Header/index.jsx';
import PageList from '../../pages/PageList/index.jsx';
import PageListItem from '../../pages/PageListItem/index.jsx';
import { Routes, Route } from 'react-router';
import PageSignUp from '../../pages/PageSignUp/index.jsx';
import PageSignIn from '../../pages/PageSignIn/index.jsx';
import PageEditProfile from '../../pages/PageEditProfile/index.jsx';
import PageCreateNewArticle from '../../pages/PageCreateNewArticle/index.jsx';
import PageEditArticle from '../../pages/PageEditArticle/index.jsx';
import Tooltips from '../ui/TooltipsDelete/index.jsx';

function App() {
  return (
    <>
      <Header />
      {/*<TooltipsDelete />*/}
      <Routes>
        <Route path="/" element={<PageList />} />
        <Route path="/article" element={<PageListItem />} />{' '}
        <Route path="/sign-up" element={<PageSignUp />} />
        <Route path="/sign-in" element={<PageSignIn />} />
        <Route path="/profile" element={<PageEditProfile />} />
        <Route path="/new-article" element={<PageCreateNewArticle />} />
        <Route path="/edit-article" element={<PageEditArticle />} />
      </Routes>
    </>
  );
}

export default App;
