import classes from './index.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiPutEditProfile } from '../../api/apiPutEditProfile.js';

function PageEditProfile() {
  const { profile, status, error, loading, user, isAuthenticated } =
    useSelector((store) => store.loginProfile);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const usernameError = errors['username']?.message;
  const emailError = errors['email']?.message;

  const onSubmit = (data) => {
    dispatch(apiPutEditProfile(data));
  };
  useEffect(() => {
    reset({
      username: profile?.user?.username,
      email: profile?.user?.email,
      password: null,
      image: profile?.user?.image,
    });
  }, [reset, profile]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit Profile</h1>
      <label className={classes.formLabel} htmlFor="username">
        Username
      </label>
      <input
        className={classes.formInput}
        id="username"
        type="text"
        placeholder="Username"
        autoComplete="username email"
        style={errors.username && { border: '1px solid #e45a5a' }}
        {...register('username', { required: 'Username is required!' })}
      />
      {usernameError && <p className={classes.errorInput}>{usernameError}</p>}
      <label className={classes.formLabel} htmlFor="email">
        Email address
      </label>
      <input
        className={classes.formInput}
        id="email"
        type="text"
        placeholder="Email address"
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
        New password
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
          maxLength: {
            value: 40,
            message:
              'Your password must consist of a maximum of 40 characters.',
          },
        })}
      />
      {errors.password && (
        <p className={classes.errorInput}>{errors.password.message}</p>
      )}

      <label className={classes.formLabel} htmlFor="repeatPassword">
        Avatar image (url)
      </label>
      <input
        className={classes.formInput}
        id="image"
        type="text"
        placeholder="Avatar image"
        style={errors.avatarUrl && { border: '1px solid #e45a5a' }}
        {...register('image', {
          required: 'AvatarUrl is required!',
          pattern: {
            value: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i,
            message: 'Invalid avatar url',
          },
        })}
      />
      {errors.image && (
        <p className={classes.errorInput}>{errors.image.message}</p>
      )}

      <button className={classes.btn} type="submit">
        Save
      </button>
    </form>
  );
}

export default PageEditProfile;
