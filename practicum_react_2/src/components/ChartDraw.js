import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        if (!chartRef.current) return;
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    });

    // задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};

    // вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    const noValuesSelected = d3.sum(props.oy) === 0;

    const indexOYmin = props.oy[1];
    const indexOYmax = props.oy[0];
    let [min, max] = [0, 1000];

    if (indexOYmin && indexOYmax) {
	    min = d3.min(props.data, d => d.values[0]);
        max = d3.max(props.data, d => d.values[1]);
    } else if (indexOYmin) {
        [min, max] = d3.extent(props.data, d => d.values[0]);
    } else if (indexOYmax) {
        [min, max] = d3.extent(props.data, d => d.values[1]);
    } 
    // формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min - 1, max + 1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

	useEffect(() => {
        if(noValuesSelected) return;
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        //рисуем график
        if (props.type === "dot") {
            if (indexOYmax) {
                svg .selectAll(".dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[1] ) )
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red")
            }
            if (indexOYmin) {
                svg .selectAll(".dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 3)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[0] ) )
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")
            }
        } else {
            if (indexOYmax) {
                svg .selectAll(".rect")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - scaleX.bandwidth()/4)
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", scaleX.bandwidth()/4)
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red")
            }
            if (indexOYmin) {
                svg .selectAll(".rect")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", scaleX.bandwidth()/4)
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")
            }
        }

    }, [scaleX, scaleY, props.data]); 
    if(noValuesSelected) {
        return <p>Выберите хотя бы одно значение по оси OY</p>
    }
    return (
      <svg ref={ chartRef }>  </svg>
    )
}

export default ChartDraw;