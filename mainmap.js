
export default function mainMap(container,usmap) {
    //margin convention
    const margin = ({ top: 10, right: 10, bottom: 10, left: 10 });

    const width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    const svg = d3.select(container).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    
    svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    //drawing the main map
    const features = topojson.feature(usmap, usmap.objects.states).features;

    const projection=d3.geoAlbersUsa().fitExtent(
        [[0,0],[width,height]],
        topojson.feature(usmap,usmap.objects.states)
    )
    var path = d3.geoPath()
             .projection(projection);
             
    svg
    .selectAll("path")
    .data(features) 
    .join("path")
    .attr("d", d=>path(d))
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    
    svg
    .append("path")
    .datum(topojson.mesh(usmap, usmap.objects.states))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

    function update(data) {
        const colorScale = d3
             .scaleSequential(d3.interpolateReds)
             .domain(d3.extent(data, d => d.count)); 

        svg.selectAll("path")
        .data(features) 
        .style('fill',function(d){
            const state=data.find(s => s.state == d.properties.name)
            if (!state) return "white";
            return colorScale(state.count)
        })
        //tooltip
        .on("mouseover",function(event,d){
            const state=data.find(s => s.state == d.properties.name)
            const pos = d3.pointer(event, window);

            d3.select("#map-tooltip")
            .style("left", pos[0]+20 + "px")
            .style("top", pos[1]+10 + "px")
            .style("opacity", 0.7);	

            if(!state){
                d3.select("#map-tooltip").html(
                    "State: "+d.properties.name+'<br>'
                    +"No Data"
                )
            }else{
                d3.select("#map-tooltip").html(
                    "State: "+d.properties.name+'<br>'
                    + "Crime count: "+state.count
                )
            }
    
        })
        .on("mouseleave",function(d){
            d3.select("#map-tooltip").style("opacity", 0);	
          })

        
    
    }

    //filter data by the year selected
    function filterByYear(data,yearselected){
        let filtered=data.filter(d=>(d.year==yearselected))
        update(filtered)
    }


    return {
        update,
        filterByYear
    }

}