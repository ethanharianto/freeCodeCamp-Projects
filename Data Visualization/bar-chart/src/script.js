(function() {
  'use strict'
fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(function(response) { return response.json() })
.then(function(data) { 

var marginTop = 25;
var marginBottom = 25;
var marginLeft = 60;
var marginRight = 15;
var width = 700 - marginLeft;
var height = 400 - marginBottom;
var maxDate = new Date(data.to_date);
var minDate = new Date(data.from_date);

var scaleY = d3.scale.linear()
    .domain([0, d3.max(data.data.map(function(d) { return d[1]; }))])
    .range([0, height - marginTop]);

var scaleX = d3.scale.ordinal()
    .domain(d3.range(0, data.data.length))
    .rangeBands([0, width - marginRight]);
  
var axisY = d3.svg.axis()
  .scale(d3.scale.linear()
    .domain([d3.max(data.data.map(function(d) { return d[1]; })), 0])
    .range([0, height - marginTop]))
  .orient("left")
  .ticks(11);

var axisX = d3.svg.axis()
  .scale(d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, width -marginRight ]))
  .orient('bottom')
  .ticks(d3.time.years, 5);

var bar = d3.select('.chart')
  .append('svg')
  .attr('width', width + marginLeft)
  .attr('height', height + marginBottom)
  .style({'background': '#fff', 'position' : 'relative'})

var toolTip = d3.select('.chart')
  .append('div')
  .attr('class', 'tooltip')
  .attr('style','visibility: hidden;')

// title
bar.append('g')
  .append('text')
  .attr('id', 'title')
  .attr('x', width/2 - marginLeft)
  .attr('y', marginBottom)
  .attr("style","font-family:sans;font-size: 29px;font-weight:80; stroke:#000;")
  .text("United States GDP")
  
// y-axis
bar.append('g')
  .attr('transform', 'translate('+(marginLeft - 1)+', '+marginTop+')')
  .attr('id', 'y-axis')
  .call(axisY)
  .selectAll('line')
  .style({ 'stroke': '#000', 'stroke-width': '0.1'})
  .selectAll('text')
  .attr("style","font-size: 12px;")
  
  
// x-axis
bar.append('g')
  .attr('transform', 'translate('+(marginLeft - 1)+', '+(height + 1)+')')
  .attr('id', 'x-axis')
  .call(axisX)
  .selectAll('line')
  .style({ 'stroke': '#000', 'stroke-width': '0.1'})
  .selectAll('text')
  .style('transform','rotate(-90deg)')
  .attr("style","font-size: 12px;")
  
  
//bars and hover effect
bar.append('g')
  .attr('transform', 'translate(' + marginLeft + ',0)')
  .selectAll('rect')
  .data(data.data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .style({'fill' : '#00c8ff'})
  .attr('data-date', (d) => d[0])
  .attr('data-gdp', (d) => d[1])
  .attr('width', scaleX.rangeBand())
  .attr('height', function(d) { return scaleY(d[1]) })
  .attr('x', function(d, i) { return i * scaleX.rangeBand()})
  .attr('y', function(d) { return height - scaleY(d[1]) })
  .on('mouseover', function(d) {
    var posX = d3.event.pageX;
    var posY = d3.event.pageY;
    toolTip
      .attr('style','left:'+ posX +'px;top:'+ posY +'px; visibility: visible;')
      .attr('id', 'tooltip')
      .attr('data-date', d[0])
      .html(d[0] + '<br /><strong>'+d[1]+'</strong>')
    
    // hover effect
    d3.select(this).style('fill', '#ffffff');
  })
  .on('mouseout', function(d) {
    d3.select(this).style('fill', '#00c8ff');
    toolTip.attr('style', 'visibility: hidden;');
  })
});
})();