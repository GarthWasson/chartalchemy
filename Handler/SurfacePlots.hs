module Handler.SurfacePlots where

import Import

getSurfacePlotsR :: Handler Html
getSurfacePlotsR = defaultLayout $ do
  setTitle "Surface Plot"
  addScript $ StaticR js_d3_v3_min_js
  addScript $ StaticR js_surface3d_js                                                 --d3 lib for surface plots
  addScript $ StaticR js_hist_js

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

                  var surfaces=[
                    {
                      name: 'Intel 1990-2000',
                      data: pushData(intel1990To2000)
                    },{
                      name: 'Intel 2000-2010',
                      data: pushData(intel2000To2010)
                    },{
                      name: 'Intel 2010-present',
                      data: pushData(intel2010ToPresent)
                    },{
                      name: 'Microsoft 1990-2000',
                      data: pushData(msft1990To2000)
                    },{
                      name: 'Microsoft 2000-2010',
                      data: pushData(msft2000To2010)
                    },{
                      name: 'MicroSoft 2010-present',
                      data: pushData(msft2010ToPresent)
                    },{
                      name: 'Bank of America 1990-2000',
                      data: pushData(bac1990To2000)
                    },{
                      name: 'Bank of America 2000-2010',
                      data: pushData(bac2000To2010)
                    },{
                      name: 'Bank of America 2010-present',
                      data: pushData(bac2010ToPresent)
                    },{
                      name: 'GE 1990-2000',
                      data: pushData(ge1990To2000)
                    },{
                      name: 'GE 2000-2010',
                      data: pushData(ge2000To2010)
                    },{
                      name: 'GE 2010-present',
                      data: pushData(ge2010ToPresent)
                    },{
                      name: 'Loyds 1990-2000',
                      data: pushData(Loyds1990To2000)
                    },{
                      name: 'Loyds 2000-2010',
                      data: pushData(Loyds2000To2010)
                    },{
                      name: 'Loyds 2010-present',
                      data: pushData(Loyds2010ToPresent)
                    },{
                      name: 'SunEdison 1990-2000',
                      data: pushData(SUNE1990To2000)
                    },{
                      name: 'SunEdison 2000-2010',
                      data: pushData(SUNE2000To2010)
                    }
                  ];
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


postSurfacePlotsR :: Handler Html
postSurfacePlotsR = error "Not yet implemented: postSurfacePlotsR"
