export default function areachart(container){
    
    // Define margin convention
    const margin = {top:50, left:50, right:50, bottom:50};
    const width = 850 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3.selectAll(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // Create path for area and assign it a class name
    svg.append("path")
        .attr("class", "area")

    // Create scales without domains
    const xScale = d3.scaleTime()
		.range([0, width])

	const yScale = d3.scaleLinear()
		.rangeRound([height, 0])

    // Create axes
    const xAxis = d3.axisBottom()
        .scale(xScale)

    const yAxis = d3.axisLeft()
        .scale(yScale)

    const xAxisGroup = svg.append("g")
        .attr("class", "axis x-axis")
    
    const yAxisGroup = svg.append("g")
        .attr("class", "axis y-axis")

    function update(filtered) {
        
        // Update domains and scales using data passed to update
        xScale.domain([d3.min(filtered, d => d.year), d3.max(filtered, d=>d.year)])
        yScale.domain([0, d3.max(filtered, d=>d.count)])

        // Create an area generator
        var area = d3.area()
            .x(d => xScale(d.year))
            .y0(yScale(0))
            .y1(d => yScale(d.count))

        // Select the area and set data using datum, call the area function
        d3.select(".area")
            .datum(filtered)
            .attr("d", area)
            .attr("fill", "#4E79A7")

        // Update axes using update scales
        xAxisGroup
            .call(xAxis)
            .attr("transform", `translate(0, ${height})`)
        
        yAxisGroup
            .call(yAxis)
    }

    return {
        update
    }
}