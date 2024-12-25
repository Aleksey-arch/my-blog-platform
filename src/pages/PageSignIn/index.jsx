import classes from './index.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { apiPostLogin } from '../../api/apiPostLogin.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function PageSignIn() {
  const { profile, status, error, loading } = useSelector(
    (store) => store.loginProfile,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const emailError = errors['email']?.message;
  const onSubmit = (data) => {
    dispatch(apiPostLogin(data));
    // получили токен
  };

  useEffect(() => {
    // console.log('profile: ', profile);
    if (profile?.user?.email) {
      navigate('/');
      localStorage.setItem('token', profile?.user?.token);
    }
  }, [profile, navigate]);
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>

      <label className={classes.formLabel} htmlFor="email">
        Email address
      </label>
      <input
        className={classes.formInput}
        id="email"
        type="text"
        placeholder="Email address"
        autoComplete="username email"
        style={errors.email && { border: '1px solid #e45a5a' }}
        {...register('email', {
          required: 'Email is required!',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      {emailError && <p className={classes.errorInput}>{emailError}</p>}
      <label className={classes.formLabel} htmlFor="password">
        Password
      </label>
      <input
        className={classes.formInput}
        id="password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        style={errors.password && { border: '1px solid #e45a5a' }}
        {...register('password', {
          required: 'Password is required!',
          minLength: {
            value: 6,
            message: 'Your password needs to be at least 6 characters.',
          },
        })}
      />
      {errors.password && (
        <p className={classes.errorInput}>{errors.password.message}</p>
      )}

      <button className={classes.btnLogin} type="submit">
        Login
      </button>
      <p className={classes.signIn}>
        Don’t have an account?
        <Link className={classes.linkSingIn} to={'/sign-up'}>
          {' Sign Up'}
        </Link>
        .
      </p>
    </form>
  );
}

export default PageSignIn;
