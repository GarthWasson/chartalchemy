module Handler.ZoomChart where

import Import

getZoomChartR :: Handler Html
getZoomChartR = defaultLayout $ do
  setTitle "ZoomChart"
  addScriptRemote "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"
  addScriptRemote "http://d3js.org/d3.v3.min.js"
  addScript $ StaticR js_zui53_js
  toWidgetHead
    [julius|
     function initZUI() {
          console.log(ZUI53);
          zui = new ZUI53.Viewport(document.getElementById('zui'));
          zui.addSurface(new ZUI53.Surfaces.SVG($("#linechart")));

          var pan_tool = new ZUI53.Tools.Pan(zui);
          zui.toolset.add(pan_tool);
          pan_tool.attach();

          zui.showBounds({ width: 1000, height: 1000, x: 0, y: 0 });

      }

      function buildSVG() {
          var margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

          d3.selectAll("#zui").append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
                .attr("id", "linechart")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          drawd3line(width, height);
      }

      function drawd3line(width, height) {
          var svg = d3.selectAll("#zui").selectAll("#linechart");

          var parseDate = d3.time.format("%Y-%m-%d").parse,
               bisectDate = d3.bisector(function (d) { return d.date; }).left;

          var x = d3.time.scale()
                .range([0, width]);

          var y = d3.scale.linear()
                .range([height, 0]);

          var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

          var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

          var line = d3.svg.line()
                .x(function (d) { return x(d.date); })
                .y(function (d) { return y(d.cumul); });

          var color = d3.scale.category20();

          d3.csv("indexdata.csv", function (error, data) {
              data.forEach(function (d) {
                  d.date = parseDate(d.date);
                  d.price = +d.price;
              });

              var indexkeys = d3.keys(d3.nest().key(function (d) { return d.indexname; }).map(data))
              indexkeys.forEach(function (name) {
                  //ugly ugly but can't think of the best place to put this transform
                  //gets cumulative growth by dividing price by first price
                  var temp = data.filter(function (d) { return d.indexname == name; });
                  temp.forEach(function (d) { d.cumul = +d.price / temp[0].price });
              })


              indexdata = d3.nest().key(function(d) {return d.indexname;}).entries(data);

              x.domain(d3.extent(data, function (d) { return d.date; }));
              y.domain(d3.extent(data, function (d) { return d.cumul; }));

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Cumulative Growth");

              var indexGroup = svg.selectAll(".indexname")
                  .data(indexdata)
                      .enter().append("g")
                            .attr("class", "indexname")
                            .attr("id", function (d) { return d.key });

              indexGroup.append("path")
                    .attr("class", "line")
                    .attr("d", function (d) { return line(d.values); })
                    .attr("stroke", function (d) { return color(d.key); });

             //original ugly way of doing it until I found Mike Bostock's example
             // var nodes = indexGroup.selectAll()
             //       .data(function (d) { return d.values; })
             //           .enter().append("g")
             //               .attr("class", "points")
             //               .attr("transform", function (d) { return "translate(" + x(d.date) + "," + y(d.cumul) + ")"; });

              //nodes.append('circle')
              //      .attr("r", 10)
              //      .attr("fill", function (d) { return color(d.indexname); })

             // nodes.append('text')
             //       .attr("text-anchor", "middle")
             //       .attr("dx", 12)
             //       .attr("dy", "-.35em")
             //       .text(function (d) { return d.indexname + "\n " + Math.round(d.cumul * 100) / 100; })
             //       .attr("fill", "gray");

              var focus = svg.selectAll(".focus")
                    .data(indexkeys).enter().append("g")
                          .attr("class", "focus")
                          .attr("id", function (d) { return "focus-" + d; })
                          .style("display", "none");

              focus.append("circle")
                  .attr("r", 4.5);

              focus.append("text")
                  .attr("x", 9)
                  .attr("dy", ".35em");

              svg.append("rect")
                  .attr("class", "overlay")
                  .attr("width", width)
                  .attr("height", height)
                  .on("mouseover", function () { focus.style("display", null); })
                  .on("mouseout", function () { focus.style("display", "none"); })
                  .on("mousemove", mousemove);

              function mousemove() {
                  var x0 = x.invert(d3.mouse(this)[0]);
                  indexkeys.forEach(function (indexname, i1) {
                      var i = bisectDate(indexdata[i1].values, x0, 1),
                        d0 = indexdata[i1].values[i - 1],
                        d1 = indexdata[i1].values[i],
                        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                      d3.select("#focus-" + indexname)
                        .attr("transform", "translate(" + x(d.date) + "," + y(d.cumul) + ")")
                        .attr("fill", color(indexname));
                      d3.select("#focus-" + indexname).select("text").text(indexname + " " + Math.round(d.cumul*100)/100).attr("fill", color(indexname));
                  });
              }


          });

          initZUI();
      }
    |]
  toWidgetHead
    [lucius|
            body {
              font: 10px sans-serif;
            }

            .axis path,
            .axis line {
              fill: none;
              stroke: #000;
              shape-rendering: crispEdges;
            }

            .x.axis path {
              display: none;
            }

            .line {
              fill: none;
              stroke-width: 5px;
            }
            .overlay {
              fill: none;
              pointer-events: all;
            }
    |]
  toWidget
    [hamlet|
      <body onload='buildSVG()' style='width:100%; height:100%; margin: 0; padding: 0;'>
      <div id='zui'>
    |]

postZoomChartR :: Handler Html
postZoomChartR = error "Not yet implemented: postZoomChartR"
