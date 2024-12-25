import classes from './index.module.scss';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router';
import TooltipsDelete from '../../components/ui/TooltipsDelete/index.jsx';
import { actions } from '../../store/slices/articlesDataSlice.js';
import { apiAddFavorite } from '../../api/apiAddFavorite.js';
import { apiDeleteArticle } from '../../api/apiDeleteFavorite.js';

function PageArticle() {
  const { currentArticle, conditionTooltipsDelete } = useSelector(
    (store) => store.articlesData,
  );
  const dispatch = useDispatch();
  const { profile, status, error, loading, user, isAuthenticated } =
    useSelector((store) => store.loginProfile);
  const formatDate = currentArticle?.createdAt
    ? format(currentArticle.createdAt, 'MMM d, yyyy')
    : null;

  const onDelete = (e) => {
    // console.log(currentArticle);
    dispatch(actions.changeConditionTooltipsDelete());
    // setTooltips(!tooltips);
  };
  const addLike = () => {
    dispatch(apiAddFavorite(currentArticle?.slug));
  };
  const removeLike = () => {
    dispatch(apiDeleteArticle(currentArticle?.slug));
  };

  return (
    <div className={classes.container}>
      {!currentArticle ? null : (
        <div className={classes.header}>
          <div className={classes.topWrapper}>
            <div className={classes.leftContainer}>
              <div className={classes.titleLikeContainer}>
                <h1 className={classes.title}>{currentArticle.title}</h1>
                <div className={classes.like}>
                  {currentArticle.favorited ? (
                    <div
                      className={classes.heartFavorited}
                      onClick={() => removeLike()}
                    ></div>
                  ) : (
                    <div
                      className={classes.heart}
                      onClick={() => addLike()}
                    ></div>
                  )}
                  <span>{currentArticle.favoritesCount}</span>
                </div>
              </div>
              <div className={classes.tagsContainer}>
                {currentArticle.tagList
                  .filter((tag) => tag.trim() !== '')
                  .map((tag, index) => (
                    <div key={index} className={classes.tag}>
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className={classes.rightContainer}>
                <div className={classes.info}>
                  <h2>{currentArticle.author.username}</h2>
                  <span>{formatDate}</span>
                </div>
                <img src={currentArticle.author.image} />
              </div>
              {profile?.user?.username === currentArticle?.author?.username ? (
                <div className={classes.btnContainer}>
                  <button
                    className={classes.btnDelete}
                    onClick={(e) => onDelete(e)}
                  >
                    Delete
                  </button>
                  {conditionTooltipsDelete ? <TooltipsDelete /> : null}

                  <Link to="/edit-article">
                    <button className={classes.btnEdit}>Edit</button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <div className={classes.bottomWrapper}>
            <div className={classes.articleTextContainer}>
              <p>{currentArticle.description}</p>
            </div>
          </div>
          <Markdown>{currentArticle.body}</Markdown>
        </div>
      )}
    </div>
  );
}

export default PageArticle;
