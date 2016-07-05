module Handler.Draw where

import Import

getDrawR :: Handler Html
getDrawR = defaultLayout $ do
  setTitle "Draw lines"
  addStylesheet $ StaticR css_better_autocomplete_css
  addScriptRemote "http://d3js.org/d3.v3.min.js"
  addScriptRemote "http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"  --jquery
  toWidget                                                                            --html
    [hamlet|
     <body>
     <p>Click Me!
     <div id="chart1">
     <iframe width="420" height="345" src="http://www.youtube.com/embed/XGSy3_Czz8k">
     <script>
        
        var mainw = 960,
            mainh = 500;

        d3.select('body').append('svg')
            .attr('width', mainw)
            .attr('height', mainh);

        function draw(selection){
            var xy0,
                path,
                keep = false,
                line = d3.svg.line()
                         .x(function(d){ return d[0]; })
                         .y(function(d){ return d[1]; });

            selection
                .on('mousedown', function(){
                    keep = true;
                    xy0 = d3.mouse(this);
                    path = d3.select('svg')
                             .append('path')
                             .attr('d', line([xy0, xy0]))
                             .style({'stroke': 'black', 'stroke-width': '1px'});
                })
                .on('mouseup', function(){
                    keep = false;
                })
                .on('mousemove', function(){
                    if (keep) {
                        Line = line([xy0, d3.mouse(this).map(function(x){ return x - 1; })]);
                        console.log(Line);
                        path.attr('d', Line);
                    }
                });
        }

        d3.select('svg').append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', mainw)
            .attr('height', mainh)
            .style({'fill': 'white'})
            .call(draw);

        d3.select("p").on("click", function() {
          alert("Hey, don't click that!");
        });


   |]
  toWidget
    [lucius|
      body {
        background: rgb(200,200,200);
      }
      svg {
        margin: auto;
        display: block;
        background: white;
      }

    |]

postDrawR :: Handler Html
postDrawR = error "Not yet implemented: postDrawR"
