import classes from './index.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { apiGetArticle } from '../../api/apiGetArticle.js';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import avatarPictures from '../../../public/assets/author.svg';
import { Spin } from 'antd';
import { apiAddFavorite } from '../../api/apiAddFavorite.js';
import { useEffect, useState } from 'react';
import { apiDeleteArticle } from '../../api/apiDeleteFavorite.js';

function ItemList({ article }) {
  const [likeCount, setLikeCount] = useState(0);
  const [block, setBlock] = useState(false);
  const dispatch = useDispatch();
  const formatDate = format(article?.updatedAt, 'MMM d, yyyy');
  const data = useSelector((store) => store.articlesData);
  const { isAuthenticated } = useSelector((store) => store.loginProfile);

  const getArticle = (e) => {
    sessionStorage.setItem('slug', e);
    dispatch(apiGetArticle(e));
  };
  const addLike = () => {
    setLikeCount((item) => item + 1);
    setBlock(true);
    dispatch(apiAddFavorite(article?.slug));
  };
  const removeLike = () => {
    setLikeCount((item) => item - 1);
    setBlock(false);
    dispatch(apiDeleteArticle(article?.slug));
  };
  useEffect(() => {
    setLikeCount(article.favoritesCount);
    setBlock(article.favorited);
  }, []);
  return (
    <>
      {data.loading ? (
        <Spin />
      ) : (
        <div className={classes.ItemlistContainer}>
          <header className={classes.header}>
            <div className={classes.leftContainer}>
              <div className={classes.titleLikeContainer}>
                <h1 className={classes.title}>
                  <Link to="/article" onClick={() => getArticle(article?.slug)}>
                    {article?.title}
                  </Link>
                </h1>
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
                {article.tagList
                  .filter((tag) => tag.trim() !== '')
                  .map((tag, index) => (
                    <div key={index} className={classes.tag}>
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
            <div className={classes.rightContainer}>
              <div className={classes.info}>
                <h2>{article.author.username}</h2>
                <span>{formatDate}</span>
              </div>
              <img
                src={
                  article?.author?.image ? article.author.image : avatarPictures
                }
                alt={'authorImage'}
                onError={(e) => {
                  e.target.src = avatarPictures;
                }}
              />
            </div>
          </header>

          <footer className={classes.footer}>
            <div className={classes.articleTextContainer}>
              <p>{article.description}</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

ItemList.propTypes = {
  article: PropTypes.object,
};

export default ItemList;
