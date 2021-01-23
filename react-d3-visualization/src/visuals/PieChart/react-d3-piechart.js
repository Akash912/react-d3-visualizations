import React, { useState, useEffect, useContext } from 'react';

import * as d3 from 'd3';
import './react-d3-piechart.css';
import d3Tip from "d3-tip";


const PieChart = props => {
    useEffect(() => {
        var w =props && props.width ? props.width : 200;
        var h = props && props.height ? props.height : 200;
        var paddingAngle = props && props.paddingAngle ? props.paddingAngle : 0;
        var innerRadius = props && props.innerRadius ? props.innerRadius : 0;
        var outerRadius = props && props.outerRadius ? props.outerRadius : w / 2;
        var color = props && props.color ? d3.scaleOrdinal(props.color) : d3.scaleOrdinal(['#B0D69B','#000000']);
        var textColor = props && props.textColor ? props.textColor : 'White';

        var tip = d3Tip()
        .attr('className', 'd3-pie-tip')
        .offset([-10, 0])
        .html(function (d , i) {
            var iterate = i.data[1] && i.data[1].tooltip[0] && Object.entries(i.data[1].tooltip[0]).map((d,i)=>{
                return `<tr> 
                <td>${d[0]}</td> 
                <td>:</td>
                <td> ${d[1]}</td>
                 </tr>`
            })
            var sHtml =  `<table>${iterate}</table>`;
            return sHtml;
        })
        .style("z-index", "999");

        var dataset = props.data;



        var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        

        // Easy colors accessible via a 10-step ordinal scale
        // var color = d3.scaleOrdinal(d3.schemeOranges[9]);

        
        let id = props && props.id ? props.id : 'pie_chart'
        // Create SVG element
        var svg = d3.select("#" + id)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

            var pie = d3.pie()
            .padAngle(paddingAngle)
            .value(function(d) {
                return d[1].value; 
            });

            let ent =  Object.entries(dataset);
            let ulData=pie(ent);

        const handleClick = (val) =>{
            props && props.click && props.click(val) ;
            tip.hide()
        }

        // Set up groups
        var arcs = svg.selectAll("g.arc")
            .data(ulData)
            .enter()
            .append("g")
            .attr("className", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
            .on("click", (val)=>handleClick(val))
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .call(tip)
            
            function tweenIn(data) {
                var interpolation = d3.interpolate({ startAngle: 0, endAngle: 0 }, data);
                this._current = interpolation(0);
                return function (t) {
                    return arc(interpolation(t));
                };
            }
            
        // Draw arc paths
        arcs.append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .transition().duration(1000)
            .attrTween("d", tweenIn);

        // Labels
        arcs.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .style('fill',textColor)
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.value;
            });


    }, []);
    return (
        <div id={props && props.id ? props.id : 'pie_chart'} >
            <div id="tooltip" style={{ opacity: 0 }}>
            </div>
        </div>
    )
}

export default PieChart;