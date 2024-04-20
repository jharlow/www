// set the dimensions and margins of the graph
let width = 1600;
let height = 400;

let data = {
  name: "The Earth's surface area",
  children: [
    {
      name: 'Land',
      value: 30
    },
    {
      name: 'Ocean',
      value: 70
    }
  ]
};

const addSvgTo = (appendTo, width, height) => {
  return d3
    .select(appendTo)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .append('g');
};

// append the svg object to the body of the page
let svg = addSvgTo('#container', width, height);

// Give the data to this cluster layout:
var root = d3
  .hierarchy(data)
  .sum(d => d.value)
  .sort((a, b) => b.value - a.value); // Here the size of each leave is given in the 'value' field in input data

var color = d3
  .scaleOrdinal()
  .domain(['Ocean', 'Land'])
  .range(['#D18975', '#8FD175']);

// Then d3.treemap computes the position of each element of the hierarchy
d3
  .treemap()
  .size([width, height])
  .padding(2)(root);

// use this information to add rectangles:
svg
  .selectAll('rect')
  .data(root.leaves())
  .enter()
  .append('rect')
  .attr('x', d => d.x0)
  .attr('y', d => d.y0)
  .attr('width', d => d.x1 - d.x0)
  .attr('height', d => d.y1 - d.y0)
  .style('stroke', 'black')
  .style('fill', d => {
    return color(d.data.name);
  });

// and to add the text labels
svg
  .selectAll('text')
  .data(root.leaves())
  .enter()
  .append('text')
  .attr('x', d => d.x0 + 25) // +10 to adjust position (more right)
  .attr('y', d => d.y0 + 65) // +20 to adjust position (lower)
  .text(d => d.data.name)
  .attr('font-size', '3rem')
  .attr('fill', 'white');
