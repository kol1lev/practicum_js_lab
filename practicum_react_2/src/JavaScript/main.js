document.addEventListener("DOMContentLoaded", function() {
    createTable(games, 'list');
    const sortForm = document.getElementById('sort');
    setSortSelects(games[0] , sortForm);
    let filtred = false;
    const btnFind = document.getElementById('findBtn'); 
    const filterForm = document.getElementById('filter'); 
    btnFind.addEventListener('click', function(event) {
        filterTable(games, 'list', filterForm);
        clearSelects(sortForm);
        filtred = true;
    });

    const btnClear = document.getElementById('clearBtn');
    btnClear.addEventListener('click', function(event) {
        clearFilter('list', games, filterForm);
        clearSelects(sortForm);
        filtred = false;
    });

    fieldsFirst = document.getElementById('fieldsFirst');
    fieldsFirst.addEventListener('change', function(event) {
        changeNextSelect(fieldsFirst, 'fieldsSecond');
        changeNextSelect(fieldsSecond, 'fieldsThird');
    });

    fieldsSecond = document.getElementById('fieldsSecond');
    fieldsSecond.addEventListener('change', function(event) {
        changeNextSelect(fieldsSecond, 'fieldsThird');
    });

    const sortBtn = document.getElementById('sortBtn'); 
    sortBtn.addEventListener('click', function(event) {
        if(!sortTable('list', sortForm)) {
            if (filtred) { filterTable(games, 'list', filterForm) }
            else {
                clearTable('list');
                createTable(games, 'list');
                clearSelects(sortForm);
            }
        }
    });

    const clearSortBtn = document.getElementById('clearSort');
    clearSortBtn.addEventListener('click', function(event) {
        clearSort('list', filtred, filterForm, sortForm)
    });
    

})

// формирование полей элемента списка с заданным текстом и значением

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select

const setSortSelect = (arr, sortSelect) => {
    
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    // перебираем массив со значениями опций
    arr.forEach((item, index) => {
        // создаем OPTION из очередного ключа и добавляем в SELECT
        // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(item, index + 1));
    });
}

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => { 

    // выделяем ключи словаря в массив
    const head = Object.keys(data);

    // находим все SELECT в форме
    const allSelect = dataForm.getElementsByTagName('select');
    
    for(let i = 0; i < allSelect.length; i++) {
        setSortSelect(head, allSelect[i]);
        if (i > 0) {
            allSelect[i].disabled = true;
        }
    }

}

const clearSelects = (dataForm) => {
    const allSelect = dataForm.getElementsByTagName('select');
    const checkboxes = dataForm.querySelectorAll('input[type="checkbox"]');
    for(let i = 1; i < allSelect.length; i++) {
        allSelect[i].disabled = true;
    }
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        allSelect[i].selectedIndex = 0;
    }
    
}

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    
    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
       nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}

const clearSort = (idTable, filtred, filterForm, sortForm) => {
    if (filtred) { filterTable(games, idTable, filterForm) }
    else {
        clearTable('list');
        createTable(games, 'list');
    }
    clearSelects(sortForm);
}