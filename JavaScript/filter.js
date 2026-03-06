const correspond = {
    "Название": "name",
    "Платформа": "platform",
    "Балл Metacritic": ["scoreFrom", "scoreTo"],
    "Год": ["yearFrom", "yearTo"],
    "Студия": "publisher",
    "Жанр": "genre"
};

const dataFilter = (dataForm) => {
    
    let dictFilter = {};

    // перебираем все элементы формы с фильтрами
    for (const item of dataForm.elements) {
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } 
        if (item.type === "number") {
            if (valInput !==  "") {
                valInput = Number(valInput);
            } else if (item.id.includes("From")) {
                valInput = -Infinity;
            } else if (item.id.includes("To")) {
                valInput = +Infinity;
            }
        }
        if (item.type === "button") {
            continue;
        }

         // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

// фильтрация таблицы
const filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    const datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
         Object.entries(item).map(([key, val]) => {
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                const filterVal = datafilter[correspond[key]];
                if (filterVal && filterVal !== "" && typeof filterVal === 'string') {
                    result &&= val.toLowerCase().includes(filterVal);
                }
            }

             if (typeof val == 'number') {
                result &&= datafilter[correspond[key][0]] <= val;
                result &&= val <= datafilter[correspond[key][1]];
            }
         });

         return result;
    });     

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);
    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);  
}

const clearFilter = (idTable, data, dataForm) => {
    dataForm.reset();  
    clearTable(idTable);
    createTable(data, idTable);
}