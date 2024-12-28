import classes from './index.module.scss';

function AlertSignIn() {
  // const { currentArticle } = useSelector((store) => store.articlesData);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const AlertSignIn = () => {
  //   dispatch(apiDeleteArticle(currentArticle));
  //   navigate('/');
  // };
  // const outsideAlerterRef = useOutsideAlerter(() =>
  //   dispatch(actions.changeConditionTooltipsDelete()),
  // );
  return (
    <>
      <div className={classes.alertSuccess}>
        <p>Successfully!</p>
      </div>
    </>
  );
}

export default AlertSignIn;
