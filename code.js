d3.json("data.json").then(function(data){draw(data)},function(err){console.log(err);})

var draw=function(data)
{
  var screen={width:800,height:400}
  var margins = {top: 20, right: 40, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var legengdata=["puppies","kittens"]
  var pound=data.puppies.map(function(d,i){
    return {
      puppies:data.puppies[i],
      kittens:data.kittens[i],}
  })
  console.log(pound)
  var color=d3.scaleOrdinal(d3.schemeSet2)
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
  var drawArea=d3.area()
                 .x(function(d,i){return xScale(i);})
                 .y0(function(d){return height})
                 .y1(function(d){return yScale(d.puppies);})
  line.append("path")
      .attr("id","puppies")
      .classed("notshow",false)
      .datum(pound)
      .attr("d",drawLine)
      .attr("fill","none")
      .attr("stroke", color("puppies"))
  area.append("path")
      .attr("id","Area")
      .classed("notshow",true)
      .datum(pound)
      .attr("d",drawArea)
      .attr("fill","red")
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
                .attr("transform","translate("+(width+margins.right)+","+margins.top+")");
  var legendLines=legend.selectAll("g")
                        .data(legengdata)
                        .enter()
                        .append("g")
                        .classed("legendLine",true)
                        .attr("transform",function(d,i){return "translate(0,"+(i*20)+")";})
  legendLines.append("rect")
             .attr("x",0)
             .attr("y",0)
             .attr("width",10)
             .attr("height",10)
             .attr("fill",function(d){return color(d);})
             .on("click",function(d){
               var g=d3.select("#"+d)
               var toggled=!g.classed("notshow")
               g.classed("notshow",toggled)
             })
             .on("mouseover",function(d){d3.select("#"+d+".dots").classed("notshow",true)})
             .on("mouseout",function(d){d3.select("#"+d+".dots").classed("notshow",false)})
  legendLines.append("text")
             .attr("x",20)
             .attr("y",10)
             .text(function(d){return d;})
}
