module Handler.IntelAnnualMACD where

import Import

getIntelAnnualMACDR :: Handler Html
getIntelAnnualMACDR = defaultLayout $ do
  setTitle "Surface Plot"
  addScript $ StaticR js_d3_v3_min_js
  addScript $ StaticR js_surface3d_js                                                 --d3 lib for surface plots
  addScript $ StaticR js_yearlyIntelBackTest_js
 -- addScript $ StaticR js_candlestick_js

  toWidget                                                                            --html
    [hamlet|
          <h1>D3.js Surface Plots
          <div id="graphics">
          <p3>The surface plots show the relative performance of the MACD as a function of the short and long moving averages. The longer EMA is plotted on the x-axis and the shorter EMA was plotted on the y-axis. Half the plot is flat because the short EMA can not be longer than the long EMA. Periods between 2 and 40 days were considered but only one period for the "signal line" EMA was considered (9 days). There is very little correlation between different stocks or even time periods; this means that the naive MACD is not very successful at predicting what the optimal parameters are for use in future trades. See <a href="http://www.investopedia.com/search/default.aspx?q=macd"> investopedia </a> for more on MACD.
    |]
  toWidget
    [julius|
                  var yaw=3.141,pitch=(3.141/2), width=700, height=500, drag=false;  //The yaw&pith must be the same as this.setTurtable(yaw,pitch) in surface3d.js

                  function dataFromFormular(func){
                    var output=[];
                    for(var x=-20;x<20;x++){
                      var f0=[];
                      output.push(f0);
                      for(var y=-20;y<20;y++){
                          f0.push(func(x,y));
                      }
                    }
                   // console.log(output)
                    return output;
                  }                                  //only use this when surface is defined as a function.

                  function pushData(dataArray) {
                      var output=[];
                      for(var x=0;x<dataArray.length;x++) {
                      var f0=[];
                        output.push(f0);
                          for(var y=0;y<(dataArray[x]).length;y++){
                            f0.push(dataArray[x][y]*(-100));
                        }
                    }
                   // console.log(output)
                    return output;
                  }
                  function clone(obj) {
    var copy;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

                  var surfaces=[
                    {
                      name: 'Intel 1990',
                      data: pushData(intel1990)
                    },{
                      name: 'Intel 1991',
                      data: pushData(intel1991)
                    },{
                      name: 'Intel 1992',
                      data: pushData(intel1992)
                    },{
                      name: 'Intel 1993',
                      data: pushData(intel1993)
                    },{
                      name: 'Intel 1994',
                      data: pushData(intel1994)
                    },{
                      name: 'Intel 1995',
                      data: pushData(intel1995)
                    },{
                      name: 'Intel 1996',
                      data: pushData(intel1996)
                    },{
                      name: 'Intel 1997',
                      data: pushData(intel1997)
                    },{
                      name: 'Intel 1998',
                      data: pushData(intel1998)
                    },{
                      name: 'Intel 1999',
                      data: pushData(intel1999)
                    },{
                      name: 'Intel 2000',
                      data: pushData(intel2000)
                    },{
                      name: 'Intel 2001',
                      data: pushData(intel2001)
                    },{
                      name: 'Intel 2002',
                      data: pushData(intel2002)
                    },{
                      name: 'Intel 2003',
                      data: pushData(intel2003)
                    },{
                      name: 'Intel 2004',
                      data: pushData(intel2004)
                    },{
                      name: 'Intel 2005',
                      data: pushData(intel2005)
                    },{
                      name: 'Intel 2006',
                      data: pushData(intel2006)
                    },{
                      name: 'Intel 2007',
                      data: pushData(intel2007)
                    },{
                      name: 'Intel 2008',
                      data: pushData(intel2008)
                    },{
                      name: 'Intel 2009',
                      data: pushData(intel2009)
                    },{
                      name: 'Intel 2010',
                      data: pushData(intel2010)
                    },{
                      name: 'Intel 2011',
                      data: pushData(intel2011)
                    },{
                      name: 'Intel 2012',
                      data: pushData(intel2012)
                    },{
                      name: 'Intel 2013',
                      data: pushData(intel2013)
                    },{
                      name: 'Intel 2014',
                      data: pushData(intel2014)
                    },{
                      name: 'Intel 2015',
                      data: pushData(intel2015)
                    }
                  ];

                 console.log(surfaces[0])
                  var sumArray=(clone(surfaces[0])).data;

                  for(var i=1; i<surfaces.length; i++){
                    for(var j=0; j<surfaces[0].data.length; j++){
                      for(var k=0; k<surfaces[0].data[0].length; k++){
                        var x=  sumArray[j][k];
                        var y = surfaces[i].data[j][k];
                        var z=x+y;
                        sumArray[j][k]=z;
                      }
                      //console.log(sumArray[j]);
                    }
                  }
                  var average=sumArray
                  console.log(sumArray);

        var sumArrayObject=[{name: 'average',data: pushData(sumArray)}]
        //        surfaces.push(sumArrayObject);
        surfaces=surfaces.concat(sumArrayObject);

        console.log(surfaces);

                  var selected=surfaces[0];

                  var ul=d3.select('body')
                           .append('ul');
                  var svg=d3.select('body')
                          .append('svg')
                            .attr('height',height)
                            .attr('width',width);

                  var svgstatic=d3.select('body')
                          .append('svg')
                            .attr('height',(height/2))
                            .attr('width',(width/2));

                  var group = svg.append("g");
                  var groupstatic = svgstatic.append("g");

                  var md=group.data([surfaces[0].data])
                    .surface3D(width,height)
                      .surfaceHeight(function(d){
                        return d;
                      }).surfaceColor(function(d){
                        var c=d3.hsl((d+100), 0.6, 0.5).rgb();
                        return "rgb("+parseInt(c.r)+","+parseInt(c.g)+","+parseInt(c.b)+")";
                      });
                  var mdstatic=groupstatic.data([surfaces[0].data])
                    .surface3D(width,height)
                      .surfaceHeight(function(d){
                        return d;
                      }).surfaceColor(function(d){
                        var c=d3.hsl((d+100), 0.6, 0.5).rgb();
                        return "rgb("+parseInt(c.r)+","+parseInt(c.g)+","+parseInt(c.b)+")";
                      });

                  ul.selectAll('li')
                    .data(surfaces)
                      .enter().append('li')
                        .html(function(d){
                          return d.name
                        }).on('mousedown',function(){
                          md.data([d3.select(this).datum().data]).surface3D()
                            .transition().duration(500)
                            .surfaceHeight(function(d){
                              return d;
                            }).surfaceColor(function(d){
                              var c=d3.hsl((d+100), 0.6, 0.5).rgb();
                              return "rgb("+parseInt(c.r)+","+parseInt(c.g)+","+parseInt(c.b)+")";
                            });
                          mdstatic.data([d3.select(this).datum().data]).surface3D()
                            .transition().duration(500)
                            .surfaceHeight(function(d){
                              return d;
                            }).surfaceColor(function(d){
                              var c=d3.hsl((d+100), 0.6, 0.5).rgb();
                              return "rgb("+parseInt(c.r)+","+parseInt(c.g)+","+parseInt(c.b)+")";
                            });
                        });

                  svg.on("mousedown",function(){
                    drag=[d3.mouse(this),yaw,pitch];
                  }).on("mouseup",function(){
                    drag=false;
                  }).on("mousemove",function(){
                    if(drag){
                      var mouse=d3.mouse(this);
                      yaw=drag[1]-(mouse[0]-drag[0][0])/50;
                      pitch=drag[2]+(mouse[1]-drag[0][1])/50;
                      pitch=Math.max(-Math.PI/2,Math.min(Math.PI/2,pitch));
                      md.turntable(yaw,pitch);
                    }
                  })
            drawHeadings();
      |]

  toWidget
    [lucius|
body{
  font-family: sans;
  padding: 10px;
}
svg path{
  stroke: #000;
  stroke-width: 1px;
  stroke: rgba(0,0,0,0.2);
}
svg{
  border: 1px solid #DED8BF;
  background-color: #f4f4d9;
  width: 700px;
  height: 500px;
}
h1{
  font-weight: normal;
  margin: 0;
  padding-left: 5px;
  color: #53483e;
}
p{
  margin: 0;
  margin-bottom: 10px;
  padding-left: 5px;
  color: #cc7e6b;
}
p3{
  margin: 0;
  margin-bottom: 10px;
  padding-left:  5px;
  color: #917e6b;
}
ul{
  width: 200px;
  float: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-right: 10px;
}
li{
  cursor: pointer;
  background-color: #c8ad93;
  padding: 10px;
  margin: 2px;
  color: #fff;
}
    |]
