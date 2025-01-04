import classes from './index.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiPostNewArticle } from '../../api/apiPostNewArticle.js';
import { Spin } from 'antd';
import AlertSignIn from '../../components/ui/AlertSignIn/index.jsx';

function PageCreateNewArticle() {
  const MAX_TAGS = 5;

  const [tags, setTags] = useState(['', '']);
  const [showAlert, setShowAlert] = useState(false);
  const { statusCreateNewArticle, loadingCreateNewArticle } = useSelector(
    (store) => store.articlesData,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const tagsArray = Object.keys(data)
      .filter((key) => key.startsWith('tag'))
      .map((key) => data[key]);

    const postData = {
      ...data,
      tags: tagsArray,
    };
    // console.log(postData);
    dispatch(apiPostNewArticle(postData));
    // navigate('/');
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const deleteTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleTagChange = (index, event) => {
    const newTags = tags.map((tag, i) =>
      i === index ? event.target.value : tag,
    );
    setTags(newTags);
  };

  const discriptionAlert = { desc: 'Created post!' };

  useEffect(() => {
    if (statusCreateNewArticle) {
      setShowAlert(true);
      reset();
      const time = setTimeout(() => {
        setShowAlert(false);
      }, 10000);
      return () => clearTimeout(time);
    }
  }, [statusCreateNewArticle]);
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {showAlert && <AlertSignIn discriptionAlert={discriptionAlert} />}

      <h1>Create new article</h1>
      <label className={classes.formLabel} htmlFor="title">
        Title
      </label>
      <input
        className={[classes.title, classes.formInput].join(' ')}
        id="title"
        type="text"
        placeholder="Title"
        style={errors.title && { border: '1px solid #e45a5a' }}
        {...register('title', {
          required: 'Title is required!',
          pattern: {
            value: /^[^\s]+(\s+[^\s]+)*$/,
            message:
              'Возможно у тебя пробелы в начале или в конце предложения!',
          },
        })}
      />
      {errors.title && (
        <p className={classes.errorInput}>{errors.title.message}</p>
      )}
      <label className={classes.formLabel} htmlFor="description">
        Short description
      </label>
      <input
        className={[classes.description, classes.formInput].join(' ')}
        id="description"
        type="text"
        placeholder="Description"
        style={errors.description && { border: '1px solid #e45a5a' }}
        {...register('description', {
          required: 'Description is required!',
          pattern: {
            value: /^[^\s]+(\s+[^\s]+)*$/,
            message:
              'Возможно у тебя пробелы в начале или в конце предложения!',
          },
        })}
      />
      {errors.description && (
        <p className={classes.errorInput}>{errors.description.message}</p>
      )}
      <label className={classes.formLabel} htmlFor="body">
        Text
      </label>
      <textarea
        className={[classes.text, classes.formInput].join(' ')}
        id="body"
        placeholder="Text"
        autoComplete="username email"
        style={errors.body && { border: '1px solid #e45a5a' }}
        {...register('body', {
          required: 'Text is required!',
          pattern: {
            value: /^[^\s]+(\s+[^\s]+)*$/,
            message:
              'Возможно у тебя пробелы в начале или в конце предложения!',
          },
        })}
      />
      {errors.body && (
        <p className={classes.errorInput}>{errors.body.message}</p>
      )}
      <div className={classes.container}>
        <label className={classes.formLabel} htmlFor="body">
          Tags
        </label>
        <div className={classes.containerTags}>
          {tags.map((tag, index) => (
            <div key={index} className={classes.formLabel}>
              <input
                className={[classes.description, classes.formInput].join(' ')}
                type="text"
                placeholder="Tag"
                id={`tag${index}`}
                onChange={(event) => handleTagChange(index, event)}
                style={errors[`tag${index}`] && { border: '1px solid #e45a5a' }}
                {...register(`tag${index}`, {
                  required: 'Text is required!',
                  pattern: {
                    value: /^[^\s]+(\s+[^\s]+)*$/,
                    message:
                      'Возможно у тебя пробелы в начале или в конце предложения!',
                  },
                })}
              />
              <button
                className={classes.btnDelete}
                type="button"
                onClick={() => deleteTag(index)}
              >
                Delete
              </button>
              {index === tags.length - 1 && tags.length < MAX_TAGS && (
                <button
                  className={classes.btnAddTag}
                  type="button"
                  onClick={addTag}
                >
                  Add tag
                </button>
              )}
              {tags.length === 0 ? (
                <button
                  className={classes.btnAddTag}
                  type="button"
                  onClick={addTag}
                >
                  Add tag
                </button>
              ) : null}
            </div>
          ))}

          {tags.length === 0 ? (
            <button
              className={classes.btnAddTag}
              type="button"
              onClick={addTag}
            >
              Add tag
            </button>
          ) : null}
          {(errors.tag0 && (
            <p className={classes.errorInput}>{errors.tag0.message}</p>
          )) ||
            (errors.tag1 && (
              <p className={classes.errorInput}>{errors.tag1.message}</p>
            )) ||
            (errors.tag2 && (
              <p className={classes.errorInput}>{errors.tag2.message}</p>
            )) ||
            (errors.tag3 && (
              <p className={classes.errorInput}>{errors.tag3.message}</p>
            )) ||
            (errors.tag4 && (
              <p className={classes.errorInput}>{errors.tag4.message}</p>
            ))}
        </div>
        <button
          className={classes.btn}
          type="submit"
          disabled={loadingCreateNewArticle}
        >
          {!loadingCreateNewArticle ? 'Send' : <Spin />}
        </button>
      </div>
    </form>
  );
}

export default PageCreateNewArticle;
