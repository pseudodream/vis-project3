export default function barchart(container) {
    
    // Define margin convention
    const margin = {top:50, left:50, right:50, bottom:50};
    const width = 600 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3
        .selectAll(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // scales & axes
    const xScale = d3
        .scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    const yScale = d3.scaleLinear().rangeRound([height, 0]);

    const xAxis = d3.axisBottom();
    const yAxis = d3.axisLeft().ticks(10, "s");

    // axis containers
    svg.append("g").attr("class", "axis y-axis");

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`);

    function update(filtered) {
        // have to make a group by function that will appropriately group the murder weapons used

        xScale.domain(filtered.map(d => d.weapon))  
	    yScale.domain([0, d3.max(filtered, d => d.count)])

        const updateBars = svg.selectAll('rect').data(filtered)

        updateBars.enter().append('rect')
            .merge(updateBars)
            .transition()
            .duration(1000)
            // in transition change x and y positions as well as height and width
            .attr('x', d => xScale(d.weapon))
            .attr('y', d => yScale(d.count))
            .attr('width', d=> xScale.bandwidth())
            .attr('height', d=>(height - yScale(d.count)))
            .attr('fill', '#9b4dca')

        updateBars.exit().transition().duration(750).remove()

        // Update axes and title
        svg.select(".x-axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        svg.select(".y-axis")
            .transition()
            .duration(1000)
            .call(yAxis);
    }
    
    return {
        update
    }

}