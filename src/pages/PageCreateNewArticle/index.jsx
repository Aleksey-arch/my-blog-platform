import classes from './index.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { apiPostNewProfile } from '../../api/apiPostNewProfile.js';
import { useState } from 'react';
import { apiPostNewArticle } from '../../api/apiPostNewArticle.js';

function PageCreateNewArticle() {
  const MAX_TAGS = 5;
  const [tags, setTags] = useState(['', '']); // Инициализируем с двумя пустыми тегами

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const tagsArray = Object.keys(data)
      .filter((key) => key.startsWith('tag_')) // Фильтруем поля тегов
      .map((key) => data[key]); // Извлекаем значения

    const postData = {
      ...data,
      tags: tagsArray, // Добавляем массив tags к отправляемым данным
    };
    console.log(postData);
    dispatch(apiPostNewArticle(postData));
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
        {...register('description', { required: 'Description is required!' })}
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
                className={[classes.description, classes.formInput].join(' ')}
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
            </div>
          ))}
        </div>
        <button className={classes.btn} type="submit">
          Send
        </button>
      </div>
    </form>
  );
}

export default PageCreateNewArticle;
