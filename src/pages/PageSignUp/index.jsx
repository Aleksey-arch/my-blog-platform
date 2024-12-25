import classes from './index.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { apiPostNewProfile } from '../../api/apiPostNewProfile.js';

function PageSignUp() {
  const { currentArticle } = useSelector((store) => store.articlesData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const usernameError = errors['username']?.message;
  const emailError = errors['email']?.message;

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(apiPostNewProfile(data)).then(() => {
      navigate('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Create new account</h1>
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
        Repeat Password
      </label>
      <input
        className={classes.formInput}
        id="repeatPassword"
        type="password"
        placeholder="Repeat Password"
        autoComplete="new-password"
        style={errors.repeatPassword && { border: '1px solid #e45a5a' }}
        {...register('repeatPassword', {
          required: 'Repeat password is required!',
          validate: (value) => {
            return value === watch('password') || 'Password does not match';
          },
        })}
      />
      {errors.repeatPassword && (
        <p className={classes.errorInput}>{errors.repeatPassword.message}</p>
      )}

      <div className={classes.decorLine}></div>
      <div className={classes.containerCheckbox}>
        <input
          className={classes.customCheckbox}
          type="checkbox"
          id="checkboxAgreement"
          style={errors.checkboxAgreement && { border: '2px solid red' }}
          {...register('checkboxAgreement', {
            required: 'Checkbox is required!',
            message: 'Checkbox is required!',
          })}
        />

        <label htmlFor="checkboxAgreement"></label>
        <label>I agree to the processing of my personal information</label>
      </div>
      {errors.checkboxAgreement && (
        <p className={classes.errorInput}>
          {errors.checkboxAgreement.message}{' '}
        </p>
      )}
      <button className={classes.btn} type="submit">
        Create
      </button>
      <p className={classes.signIn}>
        Already have an account?
        <Link className={classes.linkSingIn} to={'/sign-in'}>
          {' Sign In'}
        </Link>
        .
      </p>
    </form>
  );
}

export default PageSignUp;
