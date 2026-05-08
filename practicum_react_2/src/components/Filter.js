/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
      filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
  const handleReset = (event) => {
    event.target.form.reset();
    props.changePage(1);
    props.filtering(props.fullData);
    if (props.resetSort && typeof props.resetSort === 'function') {
      props.resetSort();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const filterField = {
      "Название": event.target["title"].value.toLowerCase(),
      "Платформа": event.target["platform"].value.toLowerCase(),
      "Студия": event.target["studio"].value.toLowerCase(),
      "Жанр": event.target["genre"].value.toLowerCase(),
    };

    const filterRange = {
      "Год": [
        event.target["yearFrom"].value ? Number(event.target["yearFrom"].value) : -Infinity,
        event.target["yearTo"].value ? Number(event.target["yearTo"].value) : Infinity
      ],
      "Балл Metacritic": [
        event.target["scoreFrom"].value ? Number(event.target["scoreFrom"].value) : -Infinity,
        event.target["scoreTo"].value ? Number(event.target["scoreTo"].value) : Infinity
      ]
    };

    let arr = props.fullData;
    for (const key in filterField) {
      const value = filterField[key];
      if (value) {
        arr = arr.filter(item =>
          String(item[key]).toLowerCase().includes(value)
        );
      }
    }

    for (const key in filterRange) {
      const [min, max] = filterRange[key];
      if (min !== -Infinity || max !== Infinity) {
        arr = arr.filter(item => {
          const value = Number(item[key]);
          return value >= min && value <= max;
        });
      }
    }

    props.changePage(1);
    props.filtering(arr);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Название:</label>
        <input name="title" type="text" />
      </p>
      <p>
        <label>Платформа:</label>
        <input name="platform" type="text" />
      </p>
      <p>
        <label>Студия:</label>
        <input name="studio" type="text" />
      </p>
      <p>
        <label>Жанр:</label>
        <input name="genre" type="text" />
      </p>
      <p>
        <label>Год от:</label>
        <input name="yearFrom" type="number" />
      </p>
      <p>
        <label>Год до:</label>
        <input name="yearTo" type="number" />
      </p>
      <p>
        <label>Балл Metacritic от:</label>
        <input name="scoreFrom" type="number" />
      </p>
      <p>
        <label>Балл Metacritic до:</label>
        <input name="scoreTo" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="button" onClick={handleReset}>Очистить фильтр</button>
      </p>
    </form>
  )
}

export default Filter;