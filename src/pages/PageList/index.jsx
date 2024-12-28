import List from '../../components/List/index.jsx';
import AlertSignIn from '../../components/ui/AlertSignIn/index.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function PageList() {
  // const [showAlert, setShowAlert] = useState(false);
  // const { profile } = useSelector((store) => store.loginProfile);
  // useEffect(() => {
  //   if (profile?.user?.email) {
  //     setShowAlert(true);
  //     const time = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000);
  //     return () => clearTimeout(time);
  //   }
  // }, [profile]);

  return (
    <>
      <List />;
    </>
  );
}

export default PageList;
