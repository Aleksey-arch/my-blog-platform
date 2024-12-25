import { Link, useNavigate } from 'react-router';
import classes from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import avatarPictures from '../../../../public/assets/author.svg';

function HeaderProfileIcon() {
  const { profile, status, error, loading } = useSelector(
    (store) => store.loginProfile,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/profile">
        <div className={classes.container}>
          <p className={classes.userName}>{profile.user.username}</p>
          <img
            className={classes.userAvatar}
            src={profile?.user?.image ? profile?.user?.image : avatarPictures}
            alt="userAvatar"
          ></img>
        </div>
      </Link>
    </>
  );
}

export default HeaderProfileIcon;
