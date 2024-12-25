import classes from './index.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiEditArticle } from '../../api/apiEditArticle.js';
import { useNavigate } from 'react-router';

function PageEditArticle() {
  const { currentArticle } = useSelector((store) => store.articlesData);
  const MAX_TAGS = 5;
  const [tags, setTags] = useState(['', '']); // Инициализируем с двумя пустыми тегами
  const { profile, status, error, loading, user, isAuthenticated } =
    useSelector((store) => store.loginProfile);

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

  useEffect(() => {
    // setTags([...currentArticle.tagList]);
    reset({
      title: currentArticle?.title,
      description: currentArticle?.description,
      body: currentArticle?.body,
    });
    console.log(currentArticle);
  }, [reset, currentArticle]);

  const onSubmit = (data) => {
    const tagsArray = Object.keys(data)
      .filter((key) => key.startsWith('tag_')) // Фильтруем поля тегов
      .map((key) => data[key]); // Извлекаем значения

    const postData = {
      ...data,
      tags: tagsArray,
      slug: currentArticle?.slug,
    };
    console.log(postData);
    dispatch(apiEditArticle(postData));
    navigate('/');
  };

  const addTag = () => {
    setTags([...tags, '']); // Добавляем пустой тег
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

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {loading ? null : (
        <>
          <h1>Edit article</h1>
          <label className={classes.formLabel} htmlFor="title">
            Title
          </label>
          <input
            className={[classes.title, classes.formInput].join(' ')}
            id="title"
            type="text"
            placeholder="Title"
            style={errors.title && { border: '1px solid #e45a5a' }}
            {...register('title', { required: 'Title is required!' })}
          />
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
            })}
          />
          <label className={classes.formLabel} htmlFor="body">
            Text
          </label>
          <textarea
            className={[classes.text, classes.formInput].join(' ')}
            id="body"
            placeholder="Text"
            autoComplete="username email"
            style={errors.body && { border: '1px solid #e45a5a' }}
            {...register('body', { required: 'Text is required!' })}
          />
          <div className={classes.container}>
            <label className={classes.formLabel} htmlFor="body">
              Tags
            </label>
            <div className={classes.containerTags}>
              {tags.map((tag, index) => (
                <div key={index} className={classes.formLabel}>
                  <input
                    className={[classes.description, classes.formInput].join(
                      ' ',
                    )}
                    type="text"
                    placeholder="Tag"
                    onChange={(event) => handleTagChange(index, event)}
                    style={errors.tag && { border: '1px solid #e45a5a' }}
                    {...register(`tag_${index}`)}
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
            </div>
            <button className={classes.btn} type="submit">
              Send
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default PageEditArticle;
