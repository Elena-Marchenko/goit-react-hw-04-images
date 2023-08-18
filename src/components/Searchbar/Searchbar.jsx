import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleSearchChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      return toast.error('Enter the name you are looking for');
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchForm_button}>
          <span className={s.searchForm_button_label}>Search</span>
        </button>

        <input
          className={s.searchForm_input}
          name="name"
          type="text"
          value={imageName}
          onChange={handleSearchChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
