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
    const yAxisGroup = svg.append("g").attr("class", "axis y-axis");

    const xAxisGroup = svg
        .append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`);

    function update(filtered) {
        // have to make a group by function that will appropriately group the murder weapons used

        xScale.domain([d3.min(filtered, d => d.year), d3.max(filtered, d=>d.year)])
        yScale.domain([0, d3.max(filtered, d=>d.count)])

        
    }

}