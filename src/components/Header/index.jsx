import classes from './index.module.scss';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import HeaderProfileIcon from '../ui/HeaderProfileIcon/index.jsx';
import { actions } from '../../store/slices/profileSlice.js';
import { useEffect } from 'react';
import { apiGetProfileToken } from '../../api/apiGetProfileToken.js';

function Header() {
  const { profile, user, isAuthenticated } = useSelector(
    (store) => store.loginProfile,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickBtn = () => {
    dispatch(actions.profileLogOut());
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  useEffect(() => {
    dispatch(apiGetProfileToken());
  }, []);

  return (
    <>
      <div className={classes.headerContainer}>
        <h1 className={classes.logo}>
          <Link to="/">Realworld Blog</Link>
        </h1>
        <div className={classes.authorizationContainer}>
          {profile?.user?.email ? (
            <>
              <Link to="/new-article">
                <button className={classes.createArticle}>
                  Create article
                </button>
              </Link>
              <HeaderProfileIcon />
              <button className={classes.logOut} onClick={() => onClickBtn()}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button className={classes.signIn}>Sign In</button>
              </Link>
              <Link to="/sign-up">
                <button className={classes.signUp}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
