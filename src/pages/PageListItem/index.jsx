import classes from './index.module.scss';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router';
import TooltipsDelete from '../../components/ui/TooltipsDelete/index.jsx';
import { actions } from '../../store/slices/articlesDataSlice.js';
import { apiAddFavorite } from '../../api/apiAddFavorite.js';
import { apiDeleteArticle } from '../../api/apiDeleteFavorite.js';
import { useEffect, useState } from 'react';
import { apiGetArticle } from '../../api/apiGetArticle.js';

function PageArticle() {
  const [likeCount, setLikeCount] = useState(0);
  const [block, setBlock] = useState(false);
  const { currentArticle, conditionTooltipsDelete } = useSelector(
    (store) => store.articlesData,
  );
  const dispatch = useDispatch();
  const { profile, isAuthenticated } = useSelector(
    (store) => store.loginProfile,
  );
  const formatDate = currentArticle?.createdAt
    ? format(currentArticle.createdAt, 'MMM d, yyyy')
    : null;

  const onDelete = (e) => {
    dispatch(actions.changeConditionTooltipsDelete());
  };
  const addLike = () => {
    console.log('addLike');
    setLikeCount((item) => item + 1);
    setBlock(true);
    dispatch(apiAddFavorite(currentArticle?.slug));
  };
  const removeLike = () => {
    console.log('delete');
    setLikeCount((item) => item - 1);
    setBlock(false);
    dispatch(apiDeleteArticle(currentArticle?.slug));
  };

  useEffect(() => {
    if (!currentArticle) {
      dispatch(apiGetArticle(sessionStorage.getItem('slug')));
    }
    setLikeCount(currentArticle?.favoritesCount || 0);
    setBlock(currentArticle?.favorited);
  }, [currentArticle]);

  return (
    <div className={classes.container}>
      {!currentArticle ? null : (
        <div className={classes.header}>
          <div className={classes.topWrapper}>
            <div className={classes.leftContainer}>
              <div className={classes.titleLikeContainer}>
                <h1 className={classes.title}>{currentArticle.title}</h1>
                <div className={classes.like}>
                  {!isAuthenticated ? (
                    <div className={classes.heart}></div>
                  ) : block ? (
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
                  <span>{likeCount}</span>
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
          <div className={classes.markdownContainer}>
            <Markdown>{currentArticle.body}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageArticle;
