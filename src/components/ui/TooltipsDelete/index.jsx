import { useNavigate } from 'react-router';
import classes from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import warningImage from '../../../../public/assets/warning.svg';
import { actions } from '../../../store/slices/articlesDataSlice.js';
import { apiDeleteArticle } from '../../../api/apiDeleteArticle.js';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter.js';

function TooltipsDelete() {
  const { currentArticle } = useSelector((store) => store.articlesData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteArticle = () => {
    dispatch(apiDeleteArticle(currentArticle));
    navigate('/');
  };
  const outsideAlerterRef = useOutsideAlerter(() =>
    dispatch(actions.changeConditionTooltipsDelete()),
  );
  return (
    <>
      <div className={classes.container} ref={outsideAlerterRef}>
        <div className={classes.decorativeCube}></div>
        <div className={classes.containerContent}>
          <div className={classes.heading}>
            <img className={classes.warningImage} src={warningImage} />
            <h1>Are you sure to delete this article?</h1>
          </div>
          <div className={classes.containerBtn}>
            <button
              className={classes.btnNo}
              onClick={() => dispatch(actions.changeConditionTooltipsDelete())}
            >
              No
            </button>
            <button className={classes.btnYes} onClick={() => deleteArticle()}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TooltipsDelete;
