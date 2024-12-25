import classes from './index.module.scss';
import ItemList from '../ItemList/index.jsx';
import { ConfigProvider, Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiGetArticles } from '../../api/apiGetArticles.js';
import { actions } from '../../store/slices/articlesDataSlice.js';

function List() {
  // const [paginationNumber, setPaginationNumber] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.articlesData);
  const { articles, articlesCount } = data.articles;
  const { paginationNumber } = data;

  useEffect(() => {
    dispatch(apiGetArticles(paginationNumber));
  }, [dispatch, paginationNumber]);

  console.log(paginationNumber);

  return (
    <>
      <div className={classes.listContainer}>
        {articles && !data.loading ? (
          articles.map((article) => {
            return <ItemList key={article.slug} article={article} />;
          })
        ) : (
          <Spin />
        )}

        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                colorBgContainer: 'transparent',
              },
            },
          }}
        >
          <Pagination
            defaultCurrent={1}
            total={articlesCount}
            align="center"
            showSizeChanger={false}
            onChange={(e) => {
              dispatch(actions.setPaginationNumber(e));
            }}
            current={paginationNumber}
          />
        </ConfigProvider>
      </div>
    </>
  );
}

export default List;
