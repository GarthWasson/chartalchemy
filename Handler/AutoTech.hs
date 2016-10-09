module Handler.AutoTech where

import Import

getAutoTechR :: Handler Html
getAutoTechR =defaultLayout $ do
    setTitle "Chart Alchemy"

    addStylesheet $ StaticR css_better_autocomplete_css                                 --stylesheet for autocomplete

    addScriptRemote "http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"  --jquery
    addScriptRemote "http://d3js.org/d3.v2.js"                                          --d3
    addScript $ StaticR js_candlestick_js                                               --d3 lib for candlestick charts
    addScript $ StaticR js_jquery_better_autocomplete_js                                --autocomplete
    addScript $ StaticR js_tickersautocomplete_js                                       --dicitonary of tickers for autocomplete

    toWidget                                                                            --html
      [hamlet|
      <!-- <div id="areaExample"></div> -->
       <h1 id="Welcome">Welcome to ChartAlchemy</h1>
       <h2 id="header">Input a ticker to select a stock and automatically draw curves to perform a technical analysis.</h2>
       <h2 id="tickerHeader"></h2>
           <form>
        Input Ticker: <input type="search" id="inputTicker" placeholder="eg:SSL;IBM(default)"> </form>
        <button id="submit" onclick="selectTicker()">GO</button>
       <button id="drawSupRes" onclick="drawSupRes()">Support&Resistance</button>
       <button id="drawRSI" onclick="drawRSI()">RSI</button>
       <button id="drawPsychLevel" onclick="drawPsychLevel()">Psych Levels</button>
       <button id="drawBollinger" onclick="drawBollinger()">Bollinger Bands</button>
       <h2 id="nameHeader">default=IBM</h2>
       <h4 id="dataHeader"></h4>
       <center><h2 id="fromDatetoDate"></h2></center>
       <div id="chart1"></div>
       <div id="chart1RSI"></div>
       <center><h2 id="fromDatetoDate2"></h2></center>
       <div id="chart2"></div>
       <div id="chart2RSI"></div>
       <div id="chart3"></div>
       <div id="explainCandleStick">The first chart shows a 300 day history and the second shows a 150 day history. Click on Support&Resistance and an algorithm will automatically find and draw support and resistance curves. This is an attempt at automating technical analysis. Beneath each candle-stick chart is the RSI (Relative Strength Idex). </div>
<!--
       <div id="explainRoundNumbers">The market often moves towards psychological levels and these are usually just round numbers. Computers might not be very good at psychology but they are quite good at finding round numbers. The next chart draws price-levels determined by the nearest round numbers.</div>


       -->

      |]



    toWidget                                                                            --javascript to build candlestick chart
      [julius|
       //drawExample();
       //console.log(screen.width);
       //console.log(window.innerWidth)
       var width=1000
       var height=500           //618      //1000/phi=618  //golden rectangle
       var margin=50
       var leftMargin=50
       var rightMargin=100
       var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];
       String.prototype.format = function() {
         var formatted = this;
         for (var i = 0; i < arguments.length; i++) {
           var regexp = new RegExp('\\{'+i+'\\}', 'gi');
           formatted = formatted.replace(regexp, arguments[i]);
         }
       return formatted;
       };
         var dateFormat = d3.time.format("%Y-%m-%d");
         var end = new Date();                                                                                        //end date for price history queury (today)
         var historyLength=320
         var start = new Date(end.getTime() - 1000 * 60 * 60 * 24 * historyLength);                                   //start date for price history query in ms(last number is days)
         var start2=new Date(end.getTime() -1000*60*60*24*(historyLength/2))
         document.getElementById("fromDatetoDate").innerHTML=start.getFullYear()+"-"+monthNames[start.getMonth()]+"-"+start.getDate()+"  to  "+end.getFullYear()+"-"+monthNames[end.getMonth()]+"-"+end.getDate();
         //document.getElementById("fromDatetoDate2").innerHTML=start2.getFullYear()+"-"+monthNames[start2.getMonth()]+"-"+start2.getDate()+"  to  "+end.getFullYear()+"-"+monthNames[end.getMonth()]+"-"+end.getDate();
          document.getElementById("fromDatetoDate2").innerHTML=monthNames[start2.getMonth()]+"-"+start2.getDate()+"  to  "+monthNames[end.getMonth()]+"-"+end.getDate()
         var data = [];
         $(document).ready(fetchData(""));                                                                            //fethData is from candlestick.js
         function selectTicker() {                                                                                    //Fetches yahoo finance data
           document.getElementById("tickerHeader").innerHTML = "Ticker = "+document.getElementById("inputTicker").value;
           data = [];
           d3.select("#chart1").selectAll("svg").remove();
           d3.select("#chart2").selectAll("svg").remove();
           //cleans away old svg before rebuilding chart
           d3.select("#chart1RSI").selectAll("svg").remove();
           d3.select("#chart2RSI").selectAll("svg").remove();
           $(document).ready(fetchData(document.getElementById("inputTicker").value));                     //calls func in candlestick.js
                                                                                                              document.getElementById("drawSupRes").style.visibility = "visible";
           document.getElementById("drawRSI").style.visibility = "visible";
           document.getElementById("drawPsychLevel").style.visibility = "visible";
           document.getElementById("drawBollinger").style.visibility = "visible";
         }


      |]





    toWidget                                                                   --css for dropdown list (part of autocomplete)
      [lucius|

#drawSupRes , #drawPsychLevel, #drawRSI, #submit, #drawBollinger {
    background-color: #ccc;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius:6px;
    color: #fff;
    font-family: 'Oswald';
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
    border:none;
}
#drawSupRes:hover , #drawPsychLevel:hover , #drawRSI:hover , #submit:hover , #drawBollinger:hover {
    border: none;
    background:red;
    box-shadow: 0px 0px 1px #777;
}
#explainCandleStick {
  width: 1000px ;
  margin-left: auto ;
  margin-right: auto ;
}
#chart1, #chart2 , #chart1RSI {
    width: 1000px ;
    margin-left: auto ;
    margin-right: auto ;
}
/*
#chart1RSI {
    width: 1000px ;
    margin-left: auto ;
    margin-right: auto ;
}

#chart2 {
  width: 1000px ;
    margin-left: auto ;
    margin-right: auto ;
}
*/
body {
  font: 12px 'Lucida Grande', Helvetica, Arial, Verdana, sans-serif;
}
#Welcome{
    font-family: "Times New Roman", Times, serif;
}
#header{
    font-family: "Times New Roman", Times, serif;
   // font-size:0.6vw;
}
#tickerHeader{
    font-family: "Times New Roman", Times, serif;
}
#nameHeader, #dataHeader{
    font-family: "Times New Roman", Times, serif;
}
/*
#explainCandleStick{
    font-family: "Times New Roman", Times, serif;
    font-size: 20px;
}
*/
input {
  width: 500px;
}
#inputTicker {
    width: 150px; //20vw;
    padding:6px 15px 6px 30px;
}
input.fetching {
  background: lightgrey;
}

#last-selection {
  font-size: 10px;
  color: green;
}

p.warning {
  color: red;
}
path {
   stroke: steelblue;
   stroke-width: 1;
   fill: none;
}
.axis {
   shape-rendering: crispEdges;
}
.x.axis line, .x.axis path {
    stroke: grey;
}
.x.axis .minor {
    stroke-opacity: .5;
}
.y.axis line, .y.axis path {
   fill: none;
   stroke: gray;
}
.y.axis .minor {
    stroke-opacity: .5;
}

path2 {
   stroke: steelblue;
   stroke-width: 1;
   fill: none;
}



      |]








postAutoTechR :: Handler Html
postAutoTechR =  error "Not yet implemented: postTechnicalanalysisR"
