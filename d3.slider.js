const createSlider = (value = 0) => {

  const margin = { left: 30, right: 30 },
    width = 860,
    height = 70,
    range = [0, 100],
    step = 50; // change the step and if null, it'll switch back to a normal slider

  // append svg
  const svg = d3.select('div#chart').append('svg')
    .attr('width', width)
    .attr('height', height);

  const defs = svg.append('defs');

  const mainGradient = defs.append('linearGradient')
    .attr('id', 'grad')

  mainGradient.append('stop')
    .attr('stop-color', 'orange')
    .attr("stop-opacity", 1);
  mainGradient.append('stop')
    .attr('stop-color', 'yellow')
    .attr('offset', '20%')
    .attr("stop-opacity", 1);
  mainGradient.append('stop')
    .attr('stop-color', 'green')
    .attr('offset', '100%')
    .attr("stop-opacity", 1);

  // append filter element
  const filter = defs.append('filter')
    .attr('id', 'dropshadow') /// !!! important - define id to reference it later
    .attr('x', '-40%')
    .attr('y', '-40%')
    .attr('width', '200%')
    .attr('height', '200%')
  // append gaussian blur to filter
  filter.append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 5) // !!! important parameter - blur
    .attr('result', 'blur');

  // append offset filter to result of gaussion blur filter
  filter.append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 1) // !!! important parameter - x-offset
    .attr('dy', 2) // !!! important parameter - y-offset
    .attr('result', 'offsetBlur');

  // merge result with original image
  const feMerge = filter.append('feMerge');

  // first layer result of blur and offset
  feMerge.append('feMergeNode')
    .attr('in", "offsetBlur')

  // original image on top
  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');

  const slider = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + (height / 2.5) + ')');


  // using clamp here to avoid slider exceeding the range limits
  const xScale = d3.scaleLinear()
    .domain(range)
    .range([0, width - margin.left - margin.right])
    .clamp(true);

  const track = slider.append('rect')
    .attr('width', width - margin.left - margin.right)
    .attr('height', 14)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('class', "gradient")

  // drag handle
  const circle = slider.append('circle')
  circle.classed('handle', true)
    .attr('transform', 'translate(0, 5)')
    .attr('filter', 'url(#dropshadow)')
    .attr('r', 15)
    .attr("cx", xScale(0))
    .transition()
    .duration(750)
    .attr("cx", xScale(value))

  return {
    svg: svg,
    circle: circle,
    xScale: xScale
  }

}

