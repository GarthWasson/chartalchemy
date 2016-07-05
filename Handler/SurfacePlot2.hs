module Handler.SurfacePlot2 where

import Import

getSurfacePlot2R :: Handler Html
getSurfacePlot2R =defaultLayout $ do
    setTitle "Scatter Plot"
    addScript $ StaticR js_scatter_plot_3d_demo_js
    toWidgetHead
      [hamlet|
         <meta http-equiv="X-UA-Compatible" content="chrome=1" />
         <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
         <script type="text/javascript" src="http://d3js.org/d3.v3.min.js">
         <script type="text/javascript" src="http://x3dom.org/x3dom/dist/x3dom-full.js">
         <script type="text/javascript" src="scatter_plot_3d_demo.js">
         <link rel="stylesheet" type="text/css" href="http://www.x3dom.org/download/dev/x3dom.css"/>
      |]
    toWidget
      [hamlet|
        <div id="divPlot">
      |]
    toWidget
      [julius|
       d3.select('html').style('height','100%').style('width','100%')
       d3.select('body').style('height','100%').style('width','100%')
       d3.select('#divPlot').style('width', "500px").style('height', "500px")
       scatterPlot3d( d3.select('#divPlot'));
      |]

postSurfacePlot2R :: Handler Html
postSurfacePlot2R = error "Not yet implemented: postSurfacePlot2R"
