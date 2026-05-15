import { useState } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";

const Chart = (props) => {
   const [ox, setOx] = useState("Платформа");
   const [oy, setOy] = useState([true, false])
   const [typeGraph, setTypeGraph] = useState("dot");

    const handleSubmit = (event) => {        
        event.preventDefault();
        setOx(event.target["ox"].value); 
		    setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);
        setTypeGraph(event.target["typeGraph"].value);		
	}

  const changeOY = (event) => {
    setOy([event.target.form["oy"][0].checked, event.target.form["oy"][1].checked]);
  }  


  const createArrGraph =(data, key)=>{   
        const groupObj =Array.from(d3.group(data, d => d[key]));
        if(key === "Год") {
            groupObj.sort((a, b) => Number(a[0]) - Number(b[0]));
        };
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Балл Metacritic']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        return arrGraph;
  }

   return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p> Значение по оси OX: </p>
		<div>
          <input type="radio" name="ox" value="Платформа" defaultChecked={ ox === "Платформа"} />
		  Платформа
		  <br/>		
          <input type="radio" name="ox" value="Год" defaultChecked={ ox === "Год"} />
		  Год
		</div>

        <p> Значение по оси OY </p>
		<div>
          <input type="checkbox" name="oy" onChange={changeOY} defaultChecked={ oy[0] === true }/>
		  Максимальный балл <br/>
          <input  type="checkbox" name="oy" onChange={changeOY} defaultChecked={ oy[1] === true } />
		  Минимальный балл
		</div>
    <div>
      <select name="typeGraph">
        <option value="bar">Гистограмма</option>
        <option value="dot" selected>Точечная диаграмма</option>
      </select>
    </div>
        <p>  
          <button type="submit">Построить </button>
        </p>
      </form> 
      <ChartDraw  data= {createArrGraph(props.data, ox)} oy = {oy} type={typeGraph}/>   
	</>
    )
}

export default Chart;