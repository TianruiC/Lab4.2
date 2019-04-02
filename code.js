d3.json("data.json").then(function(data){draw(data)},function(err){console.log(err);})

var draw=function(data)
{
  var screen={width:800,height:400}
  var margins = {top: 20, right: 10, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var legengdata=["puppies","kittens"]
  var pound=data.puppies.map(function(d,i){
    return {
      puppies:data.puppies[i],
      kittens:data.kittens[i],
      // day:i,
      // pets:data.puppies[i]+data.kittens[i]
    }
  })
  var color=d3.scaleOrdinal(d3.schemeSet3)
  var xScale=d3.scaleLinear()
     .domain([0,pound.length])
     .nice()
     .range([0,width])
  var yScale = d3.scaleLinear()
                  .domain([0,d3.max(pound,function(d){
                    return d3.max([d.puppies,d.kittens])})])
                  .nice()
                  .range([height,margins.top])
  var svg=d3.select("body").append("svg")
            .attr("id","graph")
            .attr("width",screen.width)
            .attr("height",screen.height)
  //line and area
  var line = svg.append('g')
                .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
  var area = svg.append('g')
                .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
  var drawLine=d3.line()
                 .x(function(d,i){return xScale(i)})
                 .y(function(d){return yScale(d.puppies)})
  line.append("path")
      .datum(pound)
      .attr("d",drawLine)
      .attr("fill","none")
      .attr("stroke", color("puppies"))
  //axis
  var xAxis=d3.axisBottom(xScale)
              .ticks(pound.length)
  var yAxis=d3.axisLeft(yScale)
              .ticks(d3.max(pound,function(d){
                return d3.max([d.puppies,d.kittens])}))
  svg.append("g")
     .attr("id","xAxis")
     .call(xAxis)
     .attr('transform', 'translate(' + (margins.left)+ ',' + (height+margins.top) + ')')
  svg.append("g")
     .attr("id","yAxis")
     .call(yAxis)
     .attr('transform', 'translate(' + 65 + ',' + margins.top + ')')
  //legend
  var legend=svg.append("g")
                .classed("legend",true)
                .attr("transform","translate("+(width+margins.left)+","+margins.top+")");
  var legendLines=legend.selectAll("g")
                        .data(legengdata)
                        .enter()
                        .append("g")
                        .classed("legendLine",true)
                        .attr("transform",function(d,i){
                        return "translate(0,"+(i*20)+")";});
  // ;
  // legendLines.append("rect")
  //            .attr("x",0)
  //            .attr("y",0)
  //            .attr("width",10)
  //            .attr("height",10)
  //            .attr("fill",function(d){return colors(d.name);});

}
