## 示例 4-1

<Example-4-1 />

-   显示鼠标在 SVG 中的坐标

---

```js
function coordsPixels(selector) {
    var txt = d3.select(selector).append("text");
    var svg = d3
        .select(selector)
        .attr("cursor", "crosshair")
        .on("mousemove", function() {
            var pt = d3.mouse(svg.node());
            txt.attr("x", 18 + pt[0])
                .attr("y", 6 + pt[1])
                .text("" + pt[0].toFixed(1) + " , " + pt[1].toFixed(1));
        });
}
```

## 示例 4-2

<Example-4-2 />

---

```js
   function makeBrush() {
      d3.csv("dense.csv").then( function ( data ) {
        var svg1 = d3.select( "#brush1" ), svg2 = d3.select( "#brush2" );
        var sc1 = d3.scaleLinear()
          .domain([0, 10, 50])
          .range(["lime", "yellow", "red"]);
        var sc2 = d3.scaleLinear()
          .domain([0, 10, 50])
          .range(["lime", "yellow", "blue"]);
        var cs1 = drawCircles( svg1, data, d => d["A"], d => d["B"], sc1);
        var cs2 = drawCircles( svg2, data, d => d["A"], d => d["B"], sc2);
        svg1.call(installHandlers, data, cs1, cs2, sc1, sc2);
      });
    }

    function drawCircles( svg, data, accX, accY, sc ) {
      var color = sc(Infinity);
      return svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", accX)
        .attr("cy", accY)
        .attr("fill", color)
        .attr("fill-opacity", 0.4);
    }

    function installHandlers2( svg, data, cs1, cs2, sc1, sc2 ) {
      var cursor = svg.append( "circle" ).attr( "r", 50 )                  //<1>
          .attr( "fill", "none" ).attr( "stroke", "black" )
          .attr( "stroke-width", 10 ).attr( "stroke-opacity", 0.1 )
          .attr( "visibility", "hidden" );                                 //<2>

      var hotzone = svg.append( "rect" ).attr( "cursor", "none" )          //<3>
          .attr( "x", 50 ).attr( "y", 50 )
          .attr( "width", 200 ).attr( "height", 200 )
          .attr( "visibility", "hidden" ).attr( "pointer-events", "all" )
          .on("mouseenter", function() {
            cursor.attr("visbility", "visible")
          })
          .on("mousemove", function(){
            var pt = d3.mouse( svg.node() );
            cursor.attr("cx", pt[0]).attr("cy", pt[1]);
            cs1.attr("fill", function(d, i) {
              var r = Math.hypot(pt[0] - d3.select(this).attr("cx"),
                                pt[1] - d3.select(this).attr("cy"));
              data[i]["r"] = r;
              return sc1(r);
            })
            cs2.attr("fill", (d, i) => sc2(data[i]["r"]))
              .on("mouseleave", function() {
                cursor.attr("visibility", "hidden");
                cs1.attr("fill", sc1(Infinity));
                cs2.attr("fill", sc2(Infinity));
              })
          })
```

## 示例 4-3

<Example-4-3 />

-   拖放小球

---

```js
function makeDragDrop() {
    var widget = undefined,
        color = undefined;
    var drag = d3
        .drag()
        .on("start", function() {
            color = d3.select(this).attr("fill");
            widget = d3.select(this).attr("fill", "lime");
        })
        .on("drag", function() {
            var pt = d3.mouse(d3.select(this).node());
            widget.attr("cx", pt[0]).attr("cy", pt[1]);
        })
        .on("end", function() {
            widget.attr("fill", color);
            widget = undefined;
        });

    drag(d3.select("#dragdrop").selectAll("circle"));
}
```

## 示例 4-4

<Example-4-4 />

-   点击触发动画

---

```js
function makeStagger() {
    var ds1 = [2, 1, 3, 5, 7, 8, 9, 9, 9, 8, 7, 5, 3, 1, 2]; //<1>
    var ds2 = [8, 9, 8, 7, 5, 3, 2, 1, 2, 3, 5, 7, 8, 9, 8];
    var n = ds1.length,
        mx = d3.max(d3.merge([ds1, ds2])); //<2>

    var svg = d3.select("#stagger");
    var scX = d3
        .scaleLinear()
        .domain([0, n])
        .range([50, 540]); //<3>
    var scY = d3
        .scaleLinear()
        .domain([0, mx])
        .range([250, 50]);
    svg.selectAll("line")
        .data(ds1)
        .enter()
        .append("line") //<4>
        .attr("stroke", "red")
        .attr("stroke-width", 20)
        .attr("x1", (d, i) => scX(i))
        .attr("y1", scY(0))
        .attr("x2", (d, i) => scX(i))
        .attr("y2", d => scY(d));
    svg.on("click", function() {
        //<5>
        [ds1, ds2] = [ds2, ds1]; //<6>

        svg.selectAll("line")
            .data(ds1) //<7>
            .transition()
            .duration(1000)
            .delay((d, i) => 200 * i) //<8>
            .attr("y2", d => scY(d)); //<9>
    });
}
```

## 示例 4-6

<Example-4-6 />

---

```js
function makeLissajous() {
    var svg = d3.select("#lissajous");
    var a = 1.9,
        b = 3.2; // Lissajous frequencies
    var phi,
        omega = (2 * Math.PI) / 10000; // 10 seconds per period
    var crrX = 150 + 100,
        crrY = 150 + 0;
    var prvX = crrX,
        prvY = crrY;
    var timer = d3.timer(function(t) {
        phi = omega * t;
        crrX = 150 + 100 * Math.cos(a * phi);
        crrY = 150 + 100 * Math.sin(b * phi);
        svg.selectAll("line")
            .each(function() {
                this.bogus_opacity *= 0.99;
            })
            .attr("stroke-opacity", function() {
                return this.bogus_opacity;
            })
            .filter(function() {
                return this.bogus_opacity < 0.05;
            })
            .remove();

        svg.append("line")
            .each(function() {
                this.bogus_opacity = 1.0;
            })
            .attr("x1", prvX)
            .attr("y1", prvY)
            .attr("x2", crrX)
            .attr("y2", crrY)
            .attr("stroke", "green")
            .attr("stroke-width", 2);
        prvX = crrX;
        prvY = crrY;
        if (t > 120e3) {
            timer.stop();
        } // 120 seconds
    });
}
```

## 示例 4-7

<Example-4-7 />

---

```js
function makeVetors() {
    var n = 50,
        w = 300 / n,
        dt = 3000,
        svg = d3.select("#voters");

    var data = d3.range(n * n).map(d => {
        return { x: d % n, y: (d / n) | 0, val: Math.random() };
    });

    var sc = d3.scaleQuantize().range(["white", "red", "black"]);

    function update() {
        var nbs = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ];
        return d3.shuffle(d3.range(n * n)).map(i => {
            var nb = nbs[(nbs.length * Math.random()) | 0];
            var x = (data[i].x + nb[0] + n) % n;
            var y = (data[i].y + nb[1] + n) % n;
            data[i].val = data[y * n + x].val;
        });
    }

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => w * d.x)
        .attr("y", d => w * d.y)
        .attr("width", w - 1)
        .attr("height", w - 1)
        .attr("fill", d => sc(d.val));

    d3.interval(function() {
        update();
        svg.selectAll("rect")
            .data(data)
            .transition()
            .duration(dt)
            .delay((d, i) => (i * 0.25 * dt) / (n * n))
            .attr("fill", d => sc(d.val));
    }, dt);
}
```
