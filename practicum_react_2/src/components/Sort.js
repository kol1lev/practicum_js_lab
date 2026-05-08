import { useState, useEffect } from 'react';

/*
   компонент для сортировки таблицы
   пропсы:
      data - текущие данные таблицы (отфильтрованные или полные)
      filteredData - отфильтрованные данные без сортировки
      columns - массив заголовков столбцов
      sorting - функция обновления данных после сортировки
      changePage - функция установки страницы
*/

const Sort = (props) => {
  const [level1, setLevel1] = useState('0');
  const [level2, setLevel2] = useState('0');
  const [level3, setLevel3] = useState('0');
  const [desc1, setDesc1] = useState(false);
  const [desc2, setDesc2] = useState(false);
  const [desc3, setDesc3] = useState(false);

  const numericColumns = ['Год', 'Балл Metacritic'];

  const handleLevel1 = (event) => {
    const value = event.target.value;
    setLevel1(value);
    if (value === '0') {
      setLevel2('0');
      setLevel3('0');
    } else if (level2 === value) {
      setLevel2('0');
      setLevel3('0');
    } else if (level3 === value) {
      setLevel3('0');
    }
  };

  const handleLevel2 = (event) => {
    const value = event.target.value;
    setLevel2(value);
    if (value === '0') {
      setLevel3('0');
    } else if (level3 === value) {
      setLevel3('0');
    }
  };

  const handleLevel3 = (event) => {
    setLevel3(event.target.value);
  };

 

  const resetSort = () => {
    setLevel1('0');
    setLevel2('0');
    setLevel3('0');
    setDesc1(false);
    setDesc2(false);
    setDesc3(false);
    props.changePage(1);
    props.sorting(props.filteredData);
  };

  useEffect(() => {
    props.onResetSort(resetSort);
  }, [props.filteredData]);

  const buildSortArr = () => {
    const sortArr = [];
    if (level1 !== '0') {
      sortArr.push({ column: Number(level1) - 1, direction: desc1 });
      if (level2 !== '0') {
        sortArr.push({ column: Number(level2) - 1, direction: desc2 });
        if (level3 !== '0') {
          sortArr.push({ column: Number(level3) - 1, direction: desc3 });
        }
      }
    }
    return sortArr;
  };


  const sortValues = (event) => {
    event.preventDefault();

    const sortArr = buildSortArr();
    if (sortArr.length === 0) {
      return;
    }

    const sorted = [...props.data].sort((first, second) => {
      for (const { column, direction } of sortArr) {
        const field = props.columns[column];
        const firstValue = first[field];
        const secondValue = second[field];
        let comparison = 0;

        if (numericColumns.includes(field)) {
          comparison = Number(firstValue) - Number(secondValue);
        } else {
          comparison = String(firstValue).localeCompare(String(secondValue), undefined, { sensitivity: 'base' });
        }

        if (comparison !== 0) {
          return direction ? -comparison : comparison;
        }
      }
      return 0;
    });

    props.changePage(1);
    props.sorting(sorted);
  };

  const options1 = props.columns.map((column, index) => ({ value: String(index + 1), label: column }));
  const options2 = props.columns
    .map((column, index) => ({ value: String(index + 1), label: column }))
    .filter(option => option.value !== level1);
  const options3 = props.columns
    .map((column, index) => ({ value: String(index + 1), label: column }))
    .filter(option => option.value !== level1 && option.value !== level2);

  return (
    <form onSubmit={sortValues}>
      <h4>Сортировка</h4>
      <p>
        <label>Уровень 1:</label>
        <select name="level1" value={level1} onChange={handleLevel1}>
          <option value="0">Нет</option>
          {options1.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <label>
          <input type="checkbox" checked={desc1} onChange={(e) => setDesc1(e.target.checked)} /> По убыванию
        </label>
      </p>
      <p>
        <label>Уровень 2:</label>
        <select name="level2" value={level2} onChange={handleLevel2} disabled={level1 === '0'}>
          <option value="0">Нет</option>
          {options2.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <label>
          <input type="checkbox" checked={desc2} onChange={(e) => setDesc2(e.target.checked)} disabled={level1 === '0'} /> По убыванию
        </label>
      </p>
      <p>
        <label>Уровень 3:</label>
        <select name="level3" value={level3} onChange={handleLevel3} disabled={level1 === '0' || level2 === '0'}>
          <option value="0">Нет</option>
          {options3.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <label>
          <input type="checkbox" checked={desc3} onChange={(e) => setDesc3(e.target.checked)} disabled={level1 === '0' || level2 === '0'} /> По убыванию
        </label>
      </p>
      <p>
        <button type="submit">Сортировать</button>
        <button type="button" onClick={resetSort}>Очистить</button>
      </p>
    </form>
  );
};

export default Sort;
