d3.json("data.json").then(function(data){draw(data)},function(err){console.log(err);})

var draw=function(data)
{
  var screen={width:800,height:400}
  var margins = {top: 20, right: 10, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var pound=data.puppies.map(function(d,i){
    return {
      puppy:data.puppies[i],
      kittens:data.kittens[i],
      day:i,
      pets:data.puppies[i]+data.kittens[i]
    }
  })
  console.log(d3.max(data,function(d){ return d.puppies+d.kittens}))
  var xScale=d3.scaleLinear()
     .domain([0,pound.length)])
     .nice()
     .range([0,width])
  var yScale = d3.scaleLinear()
                  .domain([0,d3.max(data,function(d){ return d.puppies+d.kittens})])
                  .nice()
                  .range([height,margins.top])
}
