function min(a, b){ return a < b ? a : b ; }
function max(a, b){ return a > b ? a : b; }

function getLB10(a) {return 10  * (Math.floor(a/10))}
function getLB100(a){return 100 * (Math.floor(a/100))}
function getUB10(a) {return 10  * (Math.ceil(a/10))}
function getUB100(a){return 100 * (Math.ceil(a/100))}          //for finding round number levels

function addSpreadToData(data){
    for (var i=0;i<data.length;i++){
        data[i].spread=parseFloat(dataDaily.Ask)-parseFloat(dataDaily.Bid)
    }
}

function buildChart(data){
    addSpreadToData(data);
		  var chart = d3.select("#chart1")
			  .append("svg:svg")
			  .attr("class", "chart1")
			  .attr("width", width)
			  .attr("height", height);
		  var y = d3.scale.linear()
			  .domain([d3.min(data.map(function(x) {return x["Low"];})), d3.max(data.map(function(x){return x["High"];}))])
			  .range([height-margin, margin]);
		  var x = d3.scale.linear()
			  .domain([d3.min(data.map(function(d){return dateFormat.parse(d.Date).getTime();})),
			  	   d3.max(data.map(function(d){return dateFormat.parse(d.Date).getTime();}))])
			  .range([margin,width-2*margin]);

          chart.selectAll("line.x")
           .data(x.ticks(10))
           .enter().append("svg:line")
           .attr("class", "x")
           .attr("x1", x)
           .attr("x2", x)
           .attr("y1", margin)
           .attr("y2", height - 2*margin)
           .attr("stroke", "#ccc");

          chart.selectAll("line.y")
           .data(y.ticks(10))
           .enter().append("svg:line")
           .attr("class", "y")
           .attr("x1", margin)
           .attr("x2", width - 2*margin)
           .attr("y1", y)
           .attr("y2", y)
           .attr("stroke", "#ccc");

          chart.selectAll("text.xrule")
           .data(x.ticks(10))
           .enter().append("svg:text")
           .attr("class", "xrule")
           .attr("x", x)
           .attr("y", height - margin)
           .attr("dy", 20)
           .attr("text-anchor", "middle")
           .text(function(d){ var date = new Date(d);  return (date.getMonth() + 1)+"/"+date.getDate(); });

         chart.selectAll("text.yrule")
          .data(y.ticks(10))
          .enter().append("svg:text")
          .attr("class", "yrule")
          .attr("x", width - 2*margin)
          .attr("y", y)
          .attr("dy", 0)
          .attr("dx", 20)
          .attr("text-anchor", "middle")
          .text(String);

		chart.selectAll("rect")
		  .data(data)
		  .enter().append("svg:rect")
		  .attr("x", function(d) { return x(dateFormat.parse(d.Date).getTime()); })
	          .attr("y", function(d) {return y(max(d.Open, d.Close));})
		  .attr("height", function(d) { return y(min(d.Open, d.Close))-y(max(d.Open, d.Close));})
		  .attr("width", function(d) { return 0.5 * (width - 2*margin)/data.length; })
	          .attr("fill",function(d) { return d.Open > d.Close ? "red" : "green" ;});

        chart.selectAll("line.stem")
          .data(data)
          .enter().append("svg:line")
          .attr("class", "stem")
          .attr("x1", function(d) { return x(dateFormat.parse(d.Date).getTime()) + 0.25 * (width - 2 * margin)/ data.length;})
          .attr("x2", function(d) { return x(dateFormat.parse(d.Date).getTime()) + 0.25 * (width - 2 * margin)/ data.length;})
          .attr("y1", function(d) { return y(d.High);})
          .attr("y2", function(d) { return y(d.Low );})
          .attr("stroke", function(d){ return d.Open > d.Close ? "red" : "green"; })
      }

function buildChart2(data2){

		  var chart = d3.select("#chart2")
			  .append("svg:svg")
			  .attr("class", "chart2")
			  .attr("width", width)
			  .attr("height", height);
		  var y = d3.scale.linear()
			  .domain([d3.min(data2.map(function(x) {return x["Low"];})), d3.max(data2.map(function(x){return x["High"];}))])
			  .range([height-margin, margin]);
		  var x = d3.scale.linear()
			  .domain([d3.min(data2.map(function(d){return dateFormat.parse(d.Date).getTime();})),
			  	   d3.max(data2.map(function(d){return dateFormat.parse(d.Date).getTime();}))])
			  .range([margin,width-2*margin]);

          chart.selectAll("line.x")
           .data(x.ticks(10))
           .enter().append("svg:line")
           .attr("class", "x")
           .attr("x1", x)
           .attr("x2", x)
           .attr("y1", margin)
           .attr("y2", height - 2*margin)
           .attr("stroke", "#ccc");

          chart.selectAll("line.y")
           .data(y.ticks(10))
           .enter().append("svg:line")
           .attr("class", "y")
           .attr("x1", margin)
           .attr("x2", width - 2*margin)
           .attr("y1", y)
           .attr("y2", y)
           .attr("stroke", "#ccc");

          chart.selectAll("text.xrule")
           .data(x.ticks(10))
           .enter().append("svg:text")
           .attr("class", "xrule")
           .attr("x", x)
           .attr("y", height - margin)
           .attr("dy", 20)
           .attr("text-anchor", "middle")
           .text(function(d){ var date = new Date(d);  return (date.getMonth() + 1)+"/"+date.getDate(); });

         chart.selectAll("text.yrule")
          .data(y.ticks(10))
          .enter().append("svg:text")
          .attr("class", "yrule")
          .attr("x", width - 2*margin)
          .attr("y", y)
          .attr("dy", 0)
          .attr("dx", 20)
          .attr("text-anchor", "middle")
          .text(String);

		chart.selectAll("rect")
		  .data(data2)
		  .enter().append("svg:rect")
		  .attr("x", function(d) { return x(dateFormat.parse(d.Date).getTime()); })
	          .attr("y", function(d) {return y(max(d.Open, d.Close));})
		  .attr("height", function(d) { return y(min(d.Open, d.Close))-y(max(d.Open, d.Close));})
		  .attr("width", function(d) { return 0.5 * (width - 2*margin)/data2.length; })
	          .attr("fill",function(d) { return d.Open > d.Close ? "red" : "green" ;});

        chart.selectAll("line.stem")
          .data(data2)
          .enter().append("svg:line")
          .attr("class", "stem")
          .attr("x1", function(d) { return x(dateFormat.parse(d.Date).getTime()) + 0.25 * (width - 2 * margin)/ data2.length;})
          .attr("x2", function(d) { return x(dateFormat.parse(d.Date).getTime()) + 0.25 * (width - 2 * margin)/ data2.length;})
          .attr("y1", function(d) { return y(d.High);})
          .attr("y2", function(d) { return y(d.Low); })
          .attr("stroke", function(d){ return d.Open > d.Close ? "red" : "green"; })
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

function appendToData(x){
	if(data.length > 0){
	    return;
        }
        data = x.query.results.quote;
        for(var i=0;i<data.length;i++){
          data[i].timestamp = (new Date(data[i].date).getTime() / 1000);
        }
          data = data.sort(function(x, y){ return dateFormat.parse(x.Date).getTime() - dateFormat.parse(y.Date).getTime(); });
          var data2 = clone(data);
          data2.splice(0,data2.length/2);
          buildChart(data);
          buildChart2(data2);
      }

function appendToDataDaily(x){
    	if(data.length > 0){
	    return;
        }
         dataDaily = x.query.results.quote;
         drawNameData();
}

function buildQuery(ticker){
        var symbol = window.location.hash;
        if(ticker === ""){
           symbol = "IBM";
        }
        else{
        	symbol=ticker;
        }
        symbol = symbol.replace("#", "");
        var base = "select * from yahoo.finance.historicaldata where symbol = \"{0}\" and startDate = \"{1}\" and endDate = \"{2}\"";
        var getDateString = d3.time.format("%Y-%m-%d");
        var query = base.format(symbol, getDateString(start), getDateString(end));
        query = encodeURIComponent(query);
        var url = "http://query.yahooapis.com/v1/public/yql?q={0}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=appendToData".format(query);
          return url;
      }

function buildDayQuery(ticker){
        var symbol = window.location.hash;
        if(ticker === ""){
           symbol = "IBM";
        }
        else{
        	symbol=ticker;
        }
        symbol = symbol.replace("#", "");
        var base = "select * from yahoo.finance.quotes where symbol in (\"{0}\")";
        var query = base.format(symbol);
        query = encodeURIComponent(query);
        var dailyData = "http://query.yahooapis.com/v1/public/yql?q={0}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=appendToDataDaily".format(query);
        return dailyData;
}

function fetchData(ticker){
        url = buildQuery(ticker);
        scriptElement = document.createElement("SCRIPT");
        scriptElement.type = "text/javascript";
        scriptElement.src = url;
        document.getElementsByTagName("HEAD")[0].appendChild(scriptElement);

        dailyData=buildDayQuery(ticker);
        scriptElement2 = document.createElement("SCRIPT");
        scriptElement2.type = "text/javascript";
        scriptElement2.src = dailyData;
        document.getElementsByTagName("HEAD")[0].appendChild(scriptElement2)
      }

function drawSupRes(){
      drawSupport()
      drawResistance()
      drawSupResInfo()
      drawSupport2b()
      drawResist2b()
 //     document.getElementById("drawSupRes").style.visibility = "hidden";
}


function drawPsychLevel(){
    var p=data.map(function(x){return x["Close"];}).slice(-1)[0]
    var lb10 = getLB10(p)
    var ub10 = getUB10(p)
    var lb100 = getLB100(p)
    var ub100 = getUB100(p)
    var x1=50;
    var x2=950;
    var y=200;
    var yRange = d3.max(data.map(function(x) {return x["High"];})) - d3.min(data.map(function(x) {return x["Low"];}))
    var yub10=(((d3.max(data.map(function(x) {return x["High"];}))-ub10)/(yRange))*(height-2*margin))+margin;
    var yub100=(((d3.max(data.map(function(x) {return x["High"];}))-ub100)/(yRange))*(height-2*margin))+margin
    var ylb10=(((d3.max(data.map(function(x) {return x["High"];}))-lb10)/(yRange))*(height-2*margin))+margin
    var ylb100=(((d3.max(data.map(function(x) {return x["High"];}))-lb100)/(yRange))*(height-2*margin))+margin
    var yp=(((d3.max(data.map(function(x) {return x["High"];}))-p)/(yRange))*(height-2*margin))+margin
    var chart=d3.select("#chart1").selectAll("svg")
    chart.append("svg").append("svg:line")
           .attr("class", "x")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", yub10)
           .attr("y2", yub10)
           .attr("id","psychLevel_SVG_ID")
           .attr("stroke", "green");

    chart.append("svg")
          .append("text")
          .attr("x", 50)
          .attr("y", yub10)
          .attr("stroke","green")
          .style("font-size","15px")
          .attr("text-anchor", "end")
          .attr("id","psychLevel_SVG_ID")
          .text(ub10);

    chart.append("svg").append("svg:line")
           .attr("class", "x")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", yub100)
           .attr("y2", yub100)
           .attr("id","psychLevel_SVG_ID")
           .attr("stroke", "green");

    chart.append("svg")
          .append("text")
          .attr("x", 50)
          .attr("y", yub100)
          .attr("stroke","green")
          .style("font-size","15px")
          .attr("text-anchor", "end")
          .attr("id","psychLevel_SVG_ID")
          .text(ub100);

    chart.append("svg").append("svg:line")
           .attr("class", "x")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", ylb10)
           .attr("y2", ylb10)
           .attr("id","psychLevel_SVG_ID")
           .attr("stroke", "green");

    chart.append("svg")
          .append("text")
          .attr("x", 50)
          .attr("y", ylb10)
          .attr("stroke","green")
          .style("font-size","15px")
          .attr("text-anchor", "end")
          .attr("id","psychLevel_SVG_ID")
          .text(lb10);

    chart.append("svg").append("svg:line")
           .attr("class", "x")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", ylb100)
           .attr("y2", ylb100)
           .attr("stroke", "green")
           .attr("id","psychLevel_SVG_ID");

    chart.append("svg")
          .append("text")
          .attr("x", 50)
          .attr("y", ylb100)
          .attr("stroke","green")
          .style("font-size","15px")
          .attr("text-anchor", "end")
          .attr("id","psychLevel_SVG_ID")
          .text(lb100);

    chart.append("svg").append("svg:line")
           .attr("class", "x")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", yp)
           .attr("y2", yp)
           .attr("stroke", "blue")
           .attr("id","psychLevel_SVG_ID");
}

function unDrawPsychLevel(){
    d3.selectAll("#psychLevel_SVG_ID").remove();
}

function drawRSI(){
    var last14daysClose=data.map(function(x){return x["Close"];})
    last14daysClose=last14daysClose.slice(-14)
    last14daysClose=last14daysClose.map(function(d){return parseFloat(d)})
    var currentRSI=rsiCalculator(14,last14daysClose)
    var rsiHistory=rsiCalculatorAllHistorySafe(14,(data.map(function(x){return x["Close"];})))
    //console.log(rsiHistory)
    rsiHistory[rsiHistory.length]=50;        //So that fill draws a line in the middle from 50 to 50 (centre)
    drawRSIHistory(rsiHistory);
//    document.getElementById("drawRSI").style.visibility = "hidden";
    var chart = d3.select("#chart1RSI").select("svg")
    chart.append("svg")
         .append("text")
         .attr("x", 55)
         .attr("y", 60)
         .attr("stroke","Blue").style("font-size","25px")
         .text("RSI");
}

function unDrawRSI(){
    d3.select("#chart1RSI").remove();
}


function drawNameData(){
    var dataDaily2=[dataDaily,dataDaily]
    var fullName = dataDaily2.map(function(x) {return x["Name"];})[0];
    document.getElementById("nameHeader").innerHTML=fullName

    var bid = dataDaily2.map(function(x) {return x["Bid"];})[0];
    var ask = dataDaily2.map(function(x) {return x["Ask"];})[0];
    var currency = dataDaily2.map(function(x) {return x["Currency"];})[0];
    var daysHigh = dataDaily2.map(function(x) {return x["DaysHigh"];})[0];
    var daysLow = dataDaily2.map(function(x) {return x["DaysLow"];})[0];
    var bidAskDif=Math.floor(Math.abs(bid-ask)*100)/100
    var priceInfo="Bid: ".concat(bid).concat("   Ask: ").concat(ask).concat(" Day High: ").concat(daysHigh).concat(" Days Low: ").concat(daysLow);
    document.getElementById("dataHeader").innerHTML=priceInfo;
}

function drawSupResInfo(){
    var supResDif=Math.abs(futurePRS1-futurePRR1)
    var dataDaily2=[dataDaily,dataDaily]
    //console.log(dataDaily2);
    var chart = d3.select("#chart1").selectAll("svg")
    var bid = dataDaily2.map(function(x) {return x["Bid"];})[0];
    var ask = dataDaily2.map(function(x) {return x["Ask"];})[0];
    var fullName = dataDaily2.map(function(x) {return x["Name"];})[0];
    var currency = dataDaily2.map(function(x) {return x["Currency"];})[0];
    var daysHigh = dataDaily2.map(function(x) {return x["DaysHigh"];})[0];
    var daysLow = dataDaily2.map(function(x) {return x["DaysLow"];})[0];
    var bidAskDif=Math.floor(Math.abs(bid-ask)*100)/100
    var priceInfo="Bid: ".concat(bid).concat("   Ask: ").concat(ask).concat(" Day High: ").concat(daysHigh).concat(" Days Low: ").concat(daysLow);

    chart.append("svg")
          .append("text")
          .attr("x", 20)
          .attr("y", 30)
          .attr("stroke","Blue")
          .style("font-size","20px")
          .attr("id","supRes_SVG_ID")
          .text("Bid Ask Spread: ".concat(bidAskDif));

    chart.append("svg")
          .append("text")
          .attr("x", 20)
          .attr("y", 50)
          .attr("stroke","Black")
          .style("font-size","20px")
          .attr("id","supRes_SVG_ID")
          .text("Support-Resistance Difference: ".concat(Math.floor(supResDif*100)/100));
    //document.getElementById("nameHeader").innerHTML=fullName;
}


function drawRSIHistory(data){
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 1000,
        height = 150 - margin.top - margin.bottom;
    var x = d3.scale.linear().domain([0, data.length]).range([0, width-leftMargin-rightMargin]);
    var y = d3.scale.linear().domain([0,100 ]).range([height, 0]);
    var line = d3.svg.line().x(function(d,i) { return x(i);})
        .y(function(d) {return y(d); })

    var graph = d3.select("#chart1RSI").append("svg:svg")
			      .attr("width", width)
			      .attr("height", height + margin.top + margin.bottom ).style("fill", "#EEEEEE")
			      .append("svg:g")
			      .attr("transform", "translate(" + leftMargin + "," + 20 + ")");

    var xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true);
    graph.append("svg:g")
			  .attr("class", "x axis") // .style("fill","black")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis);

    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
    graph.append("svg:g")
			  .attr("class", "y axis").style("fill","grey")
	      .attr("transform", "translate(0,0)")
			  .call(yAxisLeft);

    var yAxisRight = d3.svg.axis().scale(y).ticks(4).orient("right");
    graph.append("svg:g")
	      .attr("class", "y axis").style("fill","grey")
			  .attr("transform", "translate("+(width-leftMargin-rightMargin)+",0)")
			  .call(yAxisRight);

    graph.append("svg:path").attr("d", line(data)).style("fill", "#46DDE8"); // .style("opacity",0.5);
}

function drawSupport(){

		var supportArray = [];
    //console.log("test");
		var resistArray = [];
		var lowArray = data.map(function(x) {return x["Low"];});
		var highArray = data.map(function(x) {return x["High"];});

    for (i=0;i<(lowArray.length/20)+1; i++) {                    //Finds support points by scanning through array setting
			lowPrice = 999999;                                        //everything in a moving window to the lowest/highest val
			for (j=-10;j<10;j++){
				if((20*i)+j >= 0 && (20*i)+j < lowArray.length && lowPrice > lowArray[(20*i)+j]){
					lowPrice = lowArray[(20*i)+j];
					supportArray[i]=data[(20*i)+j];
				}
			}
		}
    /////////TD-points
//    console.log("data.length");
//    console.log(data.length);

//    for(var i=0;i<data.length;i++){
//        var currentClose=data[i].close
//        for(var j=-2;j<=2;j++){
//            if(!(i=0) && !(data[i].close<currentClose)){data[i].isSup=true}
//            else{data[i].isSup=false}
//        }
//    }
//    console.log("data itself:");
//    console.log(data);
//    console.log("after");


//This currently make browser hang


///////////////////



		var startDay = d3.min(supportArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))
		var endDay = d3.max(supportArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))
		var bestLR_R2 = 0;
		var bestLR;
		var lr;
		var bestScore = 0;
		var finalSupportArray = []

		for(var i=supportArray.length-1;i>=0;i--){
			for(var q= 0;q<i;q++){
				var subArray=[]
				for (var j=0;j<=supportArray.length-1-i-q;j++){
					subArray[j]=supportArray[supportArray.length-j-1-q]
				}

				lr = linearRegression(subArray.map(function(d){return Number(d.Low);}),subArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))   //.getTime()/8.64e7   returns number of days since 1970/01/01

				if(lr.score>bestScore && subArray.length>3){
					bestScore = lr.score
					bestLR = lr
					finalSupportArray=subArray
				}
			}
		}                               //block to find best linearRegression

		var yRange = d3.max(data.map(function(x) {return x["High"];})) - d3.min(data.map(function(x) {return x["Low"];}))
		var xRange = parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[data.length -1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7)
		  var y1Coord= (height-2*margin) - ( (height-2*margin) * ( (finalSupportArray.map(function(d){return Number(d.Low);})[finalSupportArray.length-1]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x1Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalSupportArray.map(function(d){return d.Date;})[finalSupportArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )
		  var y2Coord= (height-2*margin) - ( (height-2*margin) * ( (finalSupportArray.map(function(d){return Number(d.Low);})[0]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x2Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalSupportArray.map(function(d){return d.Date;})[0]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

      var maxValue=d3.max(data.map(function(x) {return x["High"];}))
      var slopeBest=-((y2Coord-y1Coord)/(x2Coord-x1Coord))
      var y2CoordExtrapolated=( ( (-slopeBest*((width-margin)-x1Coord)+y1Coord )))
      var futurePRS1 =maxValue-(yRange)*(y2CoordExtrapolated/(height-2*margin))
      window.futurePRS1=futurePRS1
      var x2CoordExtrapolated= (width-margin)


		var chart = d3.select("#chart1").selectAll("svg")

		chart.append("svg")
		.append("line")
		.attr("x1", margin + x1Coord)
		.attr("x2", x2CoordExtrapolated+margin-50)
		.attr("y1", margin + y1Coord)
		      .attr("y2", y2CoordExtrapolated+margin)
      .style("stroke-dasharray", ("10,5"))
		    .attr("stroke", "blue")
        .attr("id","supRes_SVG_ID");

      var minValue=d3.min(data.map(function(x) {return x["Low"];}))
      chart.append("svg")
          .append("text")
          .attr("x", margin + x2CoordExtrapolated-50)
          .attr("y", y2CoordExtrapolated+margin)
          .attr("stroke","blue").attr("text-anchor", "start")
          .text(futurePRS1);

//testing purposes////////////////////////////////////
//		for (i = 0;i<supportArray.length;i++){
//			var y1= (height-2*margin) - ( (height-2*margin) * ( (supportArray.map(function(d){return Number(d.Low);})[i]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
//			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(supportArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",6)
//			.attr("fill","blue")
//		}
//testing purposes///////////////////////////////////

//		for (i = 0;i<finalSupportArray.length;i++){

//			var y1= (height-2*margin) - ( (height-2*margin) * ( (finalSupportArray.map(function(d){return Number(d.Low);})[i]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
//			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalSupportArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",6)
//			.attr("fill","blue")
//		}

//		for (i = 0;i<supportArray.length;i++){
//			var y1= (height-2*margin) - ( (height-2*margin) * ( (supportArray.map(function(d){return Number(d.Low);})[i]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
//			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(supportArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",3)
//			.attr("fill","white")
//		}
	}









	function drawSupport2b(){
    var data2 = clone(data);
    data2.splice(0,data2.length/2);
		var supportArray = [];
		var resistArray = [];
		var lowArray = data2.map(function(x) {return x["Low"];});
		var highArray = data2.map(function(x) {return x["High"];});

		for (i=0;i<(lowArray.length/10)+1; i++){                    //Finds support points by scanning through array setting
			lowPrice = 999999;                                        //everything in a moving window to the lowest/highest val
			for (j=-5;j<5;j++){
				if((10*i)+j >= 0 && (10*i)+j < lowArray.length && lowPrice > lowArray[(10*i)+j]){
					lowPrice = lowArray[(10*i)+j];
					supportArray[i]=data2[(10*i)+j];
				}
			}
		}
		var startDay = d3.min(supportArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))
		var endDay = d3.max(supportArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))
		var bestLR_R2 = 0;
		var bestLR;
		var lr;
		var bestScore = 0;
		var finalSupportArray = []

		for(var i=supportArray.length-1;i>=0;i--){
			for(var q= 0;q<i;q++){
				var subArray=[]
				for (var j=0;j<=supportArray.length-1-i-q;j++){
					subArray[j]=supportArray[supportArray.length-j-1-q]
				}

				lr = linearRegression(subArray.map(function(d){return Number(d.Low);}),subArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))   //.getTime()/8.64e7   returns number of days since 1970/01/01
				if(lr.score>bestScore && subArray.length>3){
					bestScore = lr.score
					bestLR = lr
					  finalSupportArray=subArray
				}
			}
		}                               //block to find best linearRegression


		var yRange = d3.max(data.map(function(x) {return x["High"];})) - d3.min(data.map(function(x) {return x["Low"];}))
		var xRange = parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[data2.length -1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7)
		  var y1Coord= (height-2*margin) - ( (height-2*margin) * ( (finalSupportArray.map(function(d){return Number(d.Low);})[finalSupportArray.length-1]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x1Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalSupportArray.map(function(d){return d.Date;})[finalSupportArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )
		  var y2Coord= (height-2*margin) - ( (height-2*margin) * ( (finalSupportArray.map(function(d){return Number(d.Low);})[0]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x2Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalSupportArray.map(function(d){return d.Date;})[0]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

      var maxValue=d3.max(data2.map(function(x) {return x["High"];}))
      var slopeBest=-((y2Coord-y1Coord)/(x2Coord-x1Coord))
      var y2CoordExtrapolated=( ( (-slopeBest*((width-margin)-x1Coord)+y1Coord )))
      var futurePRS1 =maxValue-(yRange)*(y2CoordExtrapolated/(height-2*margin))
      window.futurePRS1=futurePRS1
      var x2CoordExtrapolated= (width-margin)


		var chart = d3.select("#chart2").selectAll("svg")

		chart.append("svg")
		.append("line")
		.attr("x1", margin + x1Coord)
		.attr("x2", x2CoordExtrapolated+margin-50)
		.attr("y1", margin + y1Coord)
		      .attr("y2", y2CoordExtrapolated+margin)
          .style("stroke-dasharray", ("10,5"))
		      .attr("stroke", "blue")
          .attr("id","supRes_SVG_ID");

      var minValue=d3.min(data2.map(function(x) {return x["Low"];}))
      chart.append("svg")
          .append("text")
          .attr("x", margin + x2CoordExtrapolated-50)
          .attr("y", y2CoordExtrapolated+margin)
          .attr("stroke","blue").attr("text-anchor", "start")
          .text(parseInt(futurePRS1*100)/100);


		for (i = 0;i<finalSupportArray.length;i++){

			var y1= (height-2*margin) - ( (height-2*margin) * ( (finalSupportArray.map(function(d){return Number(d.Low);})[i]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalSupportArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",6)
//			.attr("fill","blue")
		}

		for (i = 0;i<supportArray.length;i++){
			var y1= (height-2*margin) - ( (height-2*margin) * ( (supportArray.map(function(d){return Number(d.Low);})[i]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(supportArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",3)
//			.attr("fill","white")
		}
	}


function drawResist2b(){
    var data2 = clone(data);
    data2.splice(0,data2.length/2);
		var supportArray = [];
		var resistArray = [];
		var lowArray = data2.map(function(x) {return x["Low"];});
		var highArray = data2.map(function(x) {return x["High"];});

		for (i=0;i<(highArray.length/12)+1; i++){
			highPrice = 0;
			for (j=-6;j<6;j++) {
				if((12*i)+j >= 0 && (12*i)+j < highArray.length && highPrice < highArray[(12*i)+j]) {
					highPrice = highArray[(12*i)+j];
					resistArray[i]=data2[(12*i)+j];
				}
			}
		}                                          //block produces the array of points that constitute the resistance
                                               //they are specially chosen local maxima

		var startDay = d3.min(resistArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))
		var endDay = d3.max(resistArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))

		var bestLR_R2 = 0;
		var bestLR;
		var lr;
		var bestScore = 0;
		var finalResistArray = []

		for(var i=resistArray.length-1;i>=0;i--){
			for(var q= 0;q<i;q++){
				var subArray=[]
				for (var j=0;j<=resistArray.length-1-i-q;j++){
					subArray[j]=resistArray[resistArray.length-j-1-q]
				}
				lr = linearRegression(subArray.map(function(d){return Number(d.High);}),subArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))   //.getTime()/8.64e7   returns number of days since 1970/01/01
        if(lr.scoreRes>bestScore && subArray.length>2){
          bestScore = lr.scoreRes
          bestLR = lr
          finalResistArray=subArray
				}
			}
		}
		  var yRange = d3.max(data2.map(function(x) {return x["High"];})) - d3.min(data2.map(function(x) {return x["Low"];}))
      var maxValue=d3.max(data.map(function(x) {return x["High"];}))
	   	var xRange = parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[data2.length -1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7)

	    var y1Coord= (height-2*margin) - ( (height-2*margin) * ( (finalResistArray.map(function(d){return Number(d.High);})[finalResistArray.length-1]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x1Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalResistArray.map(function(d){return d.Date;})[finalResistArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )
		  var y2Coord= (height-2*margin) - ( (height-2*margin) * ( (finalResistArray.map(function(d){return Number(d.High);})[0]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x2Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalResistArray.map(function(d){return d.Date;})[0]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

      var slopeBest=-((y2Coord-y1Coord)/(x2Coord-x1Coord))
      var y2CoordExtrapolated=( ( (-slopeBest*((width-margin)-x1Coord)+y1Coord )))
      var futurePRR1 =maxValue-(yRange)*(y2CoordExtrapolated/(height-2*margin))
      window.futurePRR1=futurePRR1
      var x2CoordExtrapolated= (width-margin)

		var chart =d3.select("#chart2").selectAll("svg")

    chart
		.append("svg")
		.append("line")
		.attr("x1", margin + x1Coord)
		.attr("x2", x2CoordExtrapolated+margin-50)
		.attr("y1", margin + y1Coord)
		      .attr("y2", y2CoordExtrapolated+margin)
          .style("stroke-dasharray", ("10,5"))
		    .attr("stroke", "#8888FF").attr("id","supRes_SVG_ID");        //Teal

      chart.append("svg")
          .append("text")
          .attr("x", margin + x2CoordExtrapolated-50)
          .attr("y", y2CoordExtrapolated+margin)
          .attr("id","supRes_SVG_ID")
        .attr("stroke","blue").attr("text-anchor", "start")
        .attr("id","supRes_SVG_ID")
        .text(parseInt(futurePRR1*100)/100);

		for (i = 0;i<finalResistArray.length;i++){
			var y1= (height-2*margin) - ( (height-2*margin) * ( (finalResistArray.map(function(d){return Number(d.High);})[i]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalResistArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",5)
//			.attr("fill","#8B0000")  //dark red
		}
		for (i = 0;i<resistArray.length;i++){
			var y1= (height-2*margin) - ( (height-2*margin) * ( (resistArray.map(function(d){return Number(d.High);})[i]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(resistArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",4)
//			.attr("fill","white")  //dark red
		}
		var r2y= (height-2*margin) - ( (height-2*margin) * ( (resistArray.map(function(d){return Number(d.Low);})[resistArray.length-1]-d3.min(data2.map(function(d){return Number(d.Low);})) ) / yRange ))
		var r2x= (width-2*margin) * ( ( parseInt(dateFormat.parse(resistArray.map(function(d){return d.Date;})[resistArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )
	}

	function drawResistance(){
		var supportArray = [];
		var resistArray = [];
		var lowArray = data.map(function(x) {return x["Low"];});
		var highArray = data.map(function(x) {return x["High"];});

		for (i=0;i<(highArray.length/12)+1; i++){
			highPrice = 0;
			for (j=-6;j<6;j++) {
				if((12*i)+j >= 0 && (12*i)+j < highArray.length && highPrice < highArray[(12*i)+j]) {
					highPrice = highArray[(12*i)+j];
					resistArray[i]=data[(12*i)+j];
				}
			}
		}                                          //block produces the array of points that constitute the resistance
                                               //they are specially chosen local maxima

		var startDay = d3.min(resistArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))
		var endDay = d3.max(resistArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))

		var bestLR_R2 = 0;
		var bestLR;
		var lr;
		var bestScore = 0;
		var finalResistArray = []


//////////////////////////////////////////////////////////////////////////////////////
///Selects resistPoints
		for(var i=resistArray.length-1;i>=0;i--){
			for(var q= 0;q<i;q++){
				var subArray=[]
				for (var j=0;j<=resistArray.length-1-i-q;j++){
					subArray[j]=resistArray[resistArray.length-j-1-q]
				}
				lr = linearRegression(subArray.map(function(d){return Number(d.High);}),subArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))   //.getTime()/8.64e7   returns number of days since 1970/01/01
        if(lr.scoreRes>bestScore && subArray.length>2){
          bestScore = lr.scoreRes
          bestLR = lr
          finalResistArray=subArray
				}
			}
		}
      bestScore=0;bestLR=0;bestLR_R2=0;
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
///Selects TD Points of degree = 2
      var tdResArray2=[]
      for(var i=resistArray.length-1;i>=0;i--){
          var currentValue=resistArray[i]
          var isTDbool = true;
          if (i-2>=0 && resistArray[i-2] > resistArray[i]){isTDbool=false}
          if (i-1>=0 && resistArray[i-1] > resistArray[i]){isTDbool=false}
          if (i+1<resistArray.length && resistArray[i+1] > resistArray[i]){isTDbool=false}
          if (i+2<resistArray.length && resistArray[i+2] > resistArray[i]){isTDbool=false}
          if (isTDbool){tdResArray2.push(resistArray[i])}

      }
      //console.log("TD-Res-Array of order 2");
      //console.log(tdResArray2);

      var finalTDResistArray = []
	  	for(var i=tdResArray2.length-1;i>=0;i--){
		  	for(var q= 0;q<i;q++){
			  	var subArray=[]
				for (var j=0;j<=tdResArray2.length-1-i-q;j++){
					  subArray[j]=tdResArray2[tdResArray2.length-j-1-q]
				}
				lr = linearRegression(subArray.map(function(d){return Number(d.High);}),subArray.map(function(d){return parseInt(dateFormat.parse(d.Date).getTime()/8.64e7);}))   //.getTime()/8.64e7   returns number of days since 1970/01/01
          if(lr.scoreRes>bestScore && subArray.length>2){
            bestScore = lr.scoreRes
            bestLR = lr
            finalTDResistArray=subArray
			  	}
		  	}
		  }
////////////////////////////////////////////////////////////////////////////////////////
///Selects TD Points of degree = 2
      var tdResArray3=[]
      for(var i=resistArray.length-1;i>=0;i--){
          var currentValue=resistArray[i]
          var isTDbool = true;
          if (i-3>=0 && resistArray[i-3] > resistArray[i]){isTDbool=false}
          if (i-2>=0 && resistArray[i-2] > resistArray[i]){isTDbool=false}
          if (i-1>=0 && resistArray[i-1] > resistArray[i]){isTDbool=false}
          if (i+1<resistArray.length && resistArray[i+1] > resistArray[i]){isTDbool=false}
          if (i+2<resistArray.length && resistArray[i+2] > resistArray[i]){isTDbool=false}
          if (i+3<resistArray.length && resistArray[i+3] > resistArray[i]){isTDbool=false}
          if (isTDbool){tdResArray3.push(resistArray[i])}

      }
      //console.log("TD-Res-Array of order 3");
      //console.log(tdResArray3);
      ////////////////////////////////////////////////////////////////////////////////////////
      //console.log("FinalTDResistArray")
      //console.log(finalTDResistArray)
      //console.log("FinalResistArray")
      //console.log(finalResistArray)

		  var yRange = d3.max(data.map(function(x) {return x["High"];})) - d3.min(data.map(function(x) {return x["Low"];}))
      var maxValue=d3.max(data.map(function(x) {return x["High"];}))
	   	var xRange = parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[data.length -1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7)

      //////////////////GW_POINT LINE COORDS////////////////

	    var y1Coord= (height-2*margin) - ( (height-2*margin) * ( (finalResistArray.map(function(d){return Number(d.High);})[finalResistArray.length-1]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x1Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalResistArray.map(function(d){return d.Date;})[finalResistArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )
		  var y2Coord= (height-2*margin) - ( (height-2*margin) * ( (finalResistArray.map(function(d){return Number(d.High);})[0]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x2Coord= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalResistArray.map(function(d){return d.Date;})[0]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )


      var slopeBest=-((y2Coord-y1Coord)/(x2Coord-x1Coord))
      var y2CoordExtrapolated=( ( (-slopeBest*((width-margin)-x1Coord)+y1Coord )))
      var futurePRR1 =maxValue-(yRange)*(y2CoordExtrapolated/(height-2*margin))
      window.futurePRR1=futurePRR1
      var x2CoordExtrapolated= (width-margin)

		var chart =d3.select("#chart1").selectAll("svg")

    chart
		.append("svg")
		.append("line")
		.attr("x1", margin + x1Coord)
		.attr("x2", x2CoordExtrapolated+margin-50)
		.attr("y1", margin + y1Coord)
		      .attr("y2", y2CoordExtrapolated+margin)
          .style("stroke-dasharray", ("10,5"))
		      .attr("stroke", "#8888FF").attr("id","supRes_SVG_ID");        //blue

      chart.append("svg")
          .append("text")
          .attr("x", margin + x2CoordExtrapolated-50)
          .attr("y", y2CoordExtrapolated+margin)
          .attr("stroke","blue").attr("text-anchor", "start").attr("id","supRes_SVG_ID")
          .text(parseInt(futurePRR1*100)/100);

      //////////////////TD_POINT LINE DRAWING/////////////////

	    var y1CoordTD= (height-2*margin) - ( (height-2*margin) * ( (finalTDResistArray.map(function(d){return Number(d.High);})[finalTDResistArray.length-1]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
        	  var x1CoordTD= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalTDResistArray.map(function(d){return d.Date;})[finalTDResistArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )
		  var y2CoordTD= (height-2*margin) - ( (height-2*margin) * ( (finalTDResistArray.map(function(d){return Number(d.High);})[0]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
		  var x2CoordTD= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalTDResistArray.map(function(d){return d.Date;})[0]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )


      //////////////////TD_POINT LINE COORDS/////////////////

      var slopeBestTD=-((y2CoordTD-y1CoordTD)/(x2CoordTD-x1CoordTD))
      var y2CoordExtrapolatedTD=( ( (-slopeBestTD*((width-margin)-x1CoordTD)+y1CoordTD )))
      var futurePRR1TD =maxValue-(yRange)*(y2CoordExtrapolatedTD/(height-2*margin))
      window.futurePRR1TD=futurePRR1TD
      var x2CoordExtrapolatedTD= (width-margin)

		var chart =d3.select("#chart1").selectAll("svg")
/*
    chart
		.append("svg")
		.append("line")
		.attr("x1", margin + x1CoordTD)
		.attr("x2", x2CoordExtrapolatedTD+margin-50)
		.attr("y1", margin + y1CoordTD)
		      .attr("y2", y2CoordExtrapolatedTD+margin)
          .style("stroke-dasharray", ("10,5"))
		      .attr("stroke", "#3399FF");        //Teal

*/

      /////DEBUGGING WITH CIRCLES TO SHOW POINT SELECTION/////
//		for (i = 0;i<finalResistArray.length;i++){
//			var y1= (height-2*margin) - ( (height-2*margin) * ( (finalResistArray.map(function(d){return Number(d.High);})[i]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
//			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(finalResistArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",5)
//			.attr("fill","#8B0000")  //dark red
//		}
//		for (i = 0;i<resistArray.length;i++){
//			var y1= (height-2*margin) - ( (height-2*margin) * ( (resistArray.map(function(d){return Number(d.High);})[i]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
//			var x1= (width-3*margin) * ( ( parseInt(dateFormat.parse(resistArray.map(function(d){return d.Date;})[i]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )

//			chart
//			.append("svg")
//			.append("circle")
//			.attr("cx",x1 + margin)
//			.attr("cy",y1 + margin)
//			.attr("r",4)
//			.attr("fill","white")  //dark red
//		}

//		var r2y= (height-2*margin) - ( (height-2*margin) * ( (resistArray.map(function(d){return Number(d.Low);})[resistArray.length-1]-d3.min(data.map(function(d){return Number(d.Low);})) ) / yRange ))
//		var r2x= (width-2*margin) * ( ( parseInt(dateFormat.parse(resistArray.map(function(d){return d.Date;})[resistArray.length-1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7) ) / xRange )


  }

function rsiCalculator (period,history){
    var avgUp  =0
    var avgDown=0
    var rs     =0
    var rsi    =0
    var delta  =0
    for(var i =1 ; i<period ; i++){
        delta=history[i]-history[i-1]
        if (delta <=0 ){
            avgDown += delta
        }
        else if (delta > 0){
            avgUp += delta
        }
    }
    avgDown=avgDown/period
    avgUp=avgUp/period
    rs=avgUp/avgDown
    rsi=100-(100/(1-rs))
    return rsi
}

function rsiCalculatorAllHistorySafe (period,history){
    var rsiHistory=[]
    for (var j=0; j<history.length ;j++){
        var avgUp  =0
        var avgDown=0
        var rs     =0
        var rsi    =0
        var delta  =0
        for(var i =1 ; i<period ; i++) {
            if(j-i>0){
                delta=history[j-i]-history[j-i-1]
                if (delta <=0 ){
                    avgDown += delta
                }
                else if (delta > 0){
                    avgUp += delta
                }
            }
            else{avgUp+=0;
                 avgDown+=0;
                }
        }
        avgDown=avgDown/period
        avgUp=avgUp/period
        rs=avgUp/avgDown
        if(j<period){rs= -3;}
        rsi=100-(100/(1-rs))
        if(j<period){rsi=50}
        rsiHistory.push(rsi)
    }
    return rsiHistory
}

function appendRSI(period,data){
    for (var i=0;i<period;i++) {
        data[i].rsi=50
    }
    for (var i=period;i<data.length;i++) {
        var avgUp  =0
        var avgDown=0
        var rs     =0
        var rsi    =0
        var delta  =0
        for (var j=0;j<period;j++){
            delta=history[i-j]-history[i-j-1]
            if (delta <=0 ){
                    avgDown += delta
                }
                else if (delta > 0){
                    avgUp += delta
                }
        }
        avgDown=avgDown/period
        avgUp=avgUp/period
        rs=avgUp/avgDown
        rsi=100-(100/(1-rs))
        data[i].rsi=rsi
    }
}


function getStdDev(period,history){
    var stdDHistory = []
    for (var i=0;i<history.length;i++){
        var stdDev=0
        var yestClose=0
        var hist2=[]
        for (var x=0;x<20;x++){
            hist2.push(history[i+x])
        }
            stdDev = standardDeviation(hist2)
        stdDHistory.push(stdDev)
    }
    return stdDHistory;
}

function drawBollinger(){
    var closes=data.map(function(x) {return x["Close"];})
    var bollinger = getBollinger(closes.map(function(x) {return parseFloat(x)}))
    var data1=bollinger[0]
    var data2=bollinger[2]
    var chart = d3.select("#chart1").select("svg")
    var x = d3.scale.linear().domain([0, data.length]).range([0, width-7*margin]);
    var y = d3.scale.linear().domain([0,22 ]).range([height, 0]);
    var ymax= d3.max(data.map(function(x) {return x["High"]}))
    var ymin= d3.min(data.map(function(x) {return ((x["Low"]))}))
    var yRange=ymax-ymin

    var xRange = parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[data.length -1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data.map(function(d){return d.Date;})[0]).getTime()/8.64e7)
    var dataTopBottomDiff=[]
    var dataTrans=[]
    for (var i=0;i<data1.length;i++){dataTopBottomDiff[i]=(data1[i]-data2[i])}
    for (var i=0;i<data1.length;i++){dataTrans[i]=(data1[i]-data2[i])}
    var graphData=dataTopBottomDiff.splice(0,dataTopBottomDiff.length-19);

    for (var i=0;i<data.length-20;i++){
        data[i+20].top=graphData[i];
    }
    for (var i=0;i<20;i++){
        data[i].top=0
    }
    var area = d3.svg.area()
        .x(function(d,i) {return(margin+( (width-3*margin)*(i+2)/(data.length) ))}) //adding 2 because the bolinger is calculated all wrong, must look at this again
        .y0(function(d,i){return((height-margin)-((height-2*margin)*((d["Close"]-ymin+(0.5*d["top"]))/yRange)))})
        .y1(function(d,i){return((height-margin)-((height-2*margin)*((d["Close"]-ymin-(0.5*d["top"]))/yRange)))});
    chart.append("svg").attr("id","bollinger_SVG_ID").append("path")
        .attr("class", "path")
        .attr("d", area(data)).style("fill", "gold").style("opacity",0.5);


    //Do the same for chart2:
    var data2 = clone(data);
    data2.splice(0,data2.length/2);
    var chart2=d3.select("#chart2").select("svg")
    var ymax2= d3.max(data2.map(function(x) {return x["High"]}))
    var ymin2= d3.min(data2.map(function(x) {return ((x["Low"]))}))
    var yRange2=ymax2-ymin2
    var xRange2 = parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[data2.length -1]).getTime()/8.64e7) - parseInt(dateFormat.parse(data2.map(function(d){return d.Date;})[0]).getTime()/8.64e7)
    var area2 = d3.svg.area()
        .x(function(d,i) {return(margin+( (width-3*margin)*(i+2)/(data2.length) ))})
        .y0(function(d,i){return((height-margin)-((height-2*margin)*((d["Close"]-ymin2+(0.5*d["top"]))/yRange2)))})
        .y1(function(d,i){return((height-margin)-((height-2*margin)*((d["Close"]-ymin2-(0.5*d["top"]))/yRange2)))});
    chart2.append("svg").attr("id","bollinger_SVG_ID").append("path")
        .attr("class", "path")
        .attr("d", area2(data2)).style("fill", "gold").style("opacity",0.5);

}

function unDrawBollinger(){
    d3.selectAll("#bollinger_SVG_ID").remove();
}
function unDrawSupRes(){
    d3.selectAll("#supRes_SVG_ID").remove();
}
function unDrawRSI(){
    //d3.selectAll("#rsi_SVG_ID").remove();
    d3.selectAll("#rsi_SVG_ID").exit().remove();
}

//moving average used for bollinger band calculation and for moving average drawing
function getMvAvg(period,history){
    var closes=(data.map(function(x) {return x["Close"];})).map(function(x) {return parseFloat(x)})
    var answer=[]
    for (var i=1;i<closes.length;i++){
        var temp=[]
        var tempLength=0
        for (var x=0;x<20;x++){
            if(i-x>0){
                temp.push(history[i-x])
                tempLength+=1
            }
            else{
                temp.push(0)
                }
        }
        var avg=0;
        for (var j=0;j<temp.length;j++){
            avg += temp[j];
        }
        avg=avg/tempLength;
        answer.push(avg)
    }
    return answer
}

function getBollinger (history){
    var stdDHist=getStdDev(20,history)
    var mvAvg=getMvAvg(20,history)
    var top = []
    var bottom= []
    for (var i=0;i<stdDHist.length;i++){
        top[i]=mvAvg[i]+(2*stdDHist[i]);
        bottom[i]=mvAvg[i]-(2*stdDHist[i])
    }
    //console.log("top(getBollinger)");
    //console.log(top);
    //console.log("bottom(getBollinger)");
    //console.log(bottom);
    return [top,mvAvg,bottom];
}

//standard deviation used for bollinger band calculation
function standardDeviation(values){
  var avg = average(values);
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  var avgSquareDiff = average(squareDiffs);
  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
  var avg = sum / data.length;
  return avg;
}

function linearRegression(y,x){
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;
    for (var i = 0; i < y.length; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i]*y[i]);
        sum_xx += (x[i]*x[i]);
        sum_yy += (y[i]*y[i]);
    }
    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
    //above is the standard linear regression function. Below is the extra bit to calculate the score:
    var score=0
    var diff=0
    var penalty =0
    var countAboveLine=0
    var countBelowLine=0
    var actualSlope=(y[y.length-1]-y[0])/(x[x.length-1]-x[0])
    for (var j=0;j<n;j++){
        lr['slope'] = Math.round(lr['slope'] * 100000000) / 100000000
        lr['intercept'] = Math.round(lr['intercept']* 100000000) / 100000000
        diff= (lr['slope']*x[j])+lr['intercept'] -y[j]
     	  //diff=   (Math.round(lr['slope'] * 100)   *x[j])+   (Math.round( lr['intercept']* 100)   )-y[j])
        penalty=penalty+ diff/((lr['slope']*x[j])+lr['intercept'])
     	  //score=score + (Math.pow(Math.abs(diff),1)/(lr['slope']*x[j])+lr['intercept'])
        if (diff<0){countAboveLine+=1}
        else {countBelowLine+=1}
    }
    score=countAboveLine/countBelowLine

    //lr['score']= n*lr['r2'] //arraylength * R-squared
    //lr['score']= n*n*Math.pow(lr['r2'],n/4)
    lr['score']=   Math.pow(n,1)*Math.pow(lr['r2'],2)*(Math.pow(score,1))
    lr['scoreRes']=Math.pow(n,1)*Math.pow(lr['r2'],2)*(Math.pow((1/score),1))

        return lr;
}

// Functions to change the buttons between on and off

function toggleBollinger(){
    currentvalue = document.getElementById('toggleBollinger').value;
    if(currentvalue == "unDraw"){
        document.getElementById("toggleBollinger").value="Draw";
        unDrawBollinger();
    }else{
        document.getElementById("toggleBollinger").value="unDraw";
        drawBollinger();
    }
}

function toggleSupRes(){
    currentvalue = document.getElementById('toggleSupRes').value;
    if(currentvalue == "unDraw"){
        document.getElementById("toggleSupRes").value="Draw";
        unDrawSupRes();
    }else{
        document.getElementById("toggleSupRes").value="unDraw";
        drawSupRes();
    }
}

function toggleRSI(){
    console.log("toggleRSI");
    currentvalue = document.getElementById('toggleRSI').value;
    if(currentvalue == "unDraw"){
        document.getElementById("toggleRSI").value="Draw";
        unDrawRSI();
    }else{
        document.getElementById("toggleRSI").value="unDraw";
        drawRSI();
    }
}

function togglePsych(){
    currentvalue = document.getElementById('togglePsych').value;
    if(currentvalue == "unDraw"){
        document.getElementById("togglePsych").value="Draw";
        unDrawPsychLevel();
    }else{
        document.getElementById("togglePsych").value="unDraw";
        drawPsychLevel();
    }
}
