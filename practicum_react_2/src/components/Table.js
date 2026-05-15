import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js'
import Sort from './Sort.js'

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {


    const [filteredData, setFilteredData] = useState(props.data);
    const [dataTable, setDataTable] = useState(props.data);
    const [resetSortFunc, setResetSortFunc] = useState(null);
    const updateDataTable = (value) => setDataTable(value);
    const updateFilteredData = (value) => {
        setFilteredData(value);
        setDataTable(value);
    };


	//количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows); 
    const [activePage, setActivePage] = useState(n);
    const changeActive = (event) => {
        setActivePage(Number(event.target.innerHTML));
    };
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    //формируем совокупность span с номерами страниц
    const pages =  (props.pagination === "1")
    ? arr.map((item, index) =>  
          <span 
            key={ index } 
            className = {(index === activePage - 1) ? "current" : "normal"}
            onClick = {changeActive}
          > { item } </span>
    )
    : [];

    const tableBody = (props.pagination === "1") 
    ? <TableBody body={ dataTable } amountRows={ props.amountRows } numPage= {activePage}/>
    : <TableBody body={ dataTable } amountRows={ dataTable.length } numPage="1"/>

    const headKeys = props.data && props.data.length ? Object.keys(props.data[0]) : [];

    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateFilteredData } data={ dataTable } fullData={ props.data } changePage={ setActivePage } resetSort={ resetSortFunc } amountRows={ props.amountRows} setCurrentData={props.setCurrentData}/>
        <Sort data={ dataTable } filteredData={ filteredData } columns={ headKeys } sorting={ updateDataTable } changePage={ setActivePage } onResetSort={ setResetSortFunc } />
        <table>
            <TableHead head={ headKeys } />
            {tableBody}
        </table>

	    <div>
          {pages}
        </div>
	  </>   
    )   
}

export default Table;