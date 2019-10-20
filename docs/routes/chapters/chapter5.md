## 示例 5-1

<Example-5-1 />

---

```js
function makeSymbols() {
    var data = [
        { x: 40, y: 0, val: "A" }, // <1>
        { x: 80, y: 30, val: "A" },
        { x: 120, y: -10, val: "B" },
        { x: 160, y: 15, val: "A" },
        { x: 200, y: 0, val: "C" },
        { x: 240, y: 10, val: "B" }
    ];
    var symMkr = d3
        .symbol()
        .size(81)
        .type(d3.symbolStar); // <2>
    var scY = d3
        .scaleLinear()
        .domain([-10, 30])
        .range([80, 40]); // <3>

    d3.select("#symbols")
        .append("g") // <4>
        .selectAll("path")
        .data(data)
        .enter()
        .append("path") // <5>
        .attr("d", symMkr) // <6>
        .attr("fill", "red")
        .attr(
            "transform", // <7>
            d => "translate(" + d["x"] + "," + scY(d["y"]) + ")"
        );
    var scT = d3.scaleOrdinal(d3.symbols).domain(["A", "B", "C"]); // <8>
    d3.select("#symbols")
        .append("g")
        .attr("transform", "translate(300,0)") // <9>
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("d", d => symMkr.type(scT(d["val"]))()) //<10>
        .attr("fill", "none") //<11>
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr(
            "transform", //<12>
            d => "translate(" + d["x"] + "," + scY(d["y"]) + ")"
        );
}
```

## 示例 5-2

<Example-5-2 />

---

```html
<svg id="usedefs" width="600" height="100">
    <defs>
        <g id="crosshair">
            <circle cx="0" cy="0" r="2" fill="none" />
            <line x1="-3" y1="0" x2="-1" y2="0" />
            <line x1="1" y1="0" x2="3" y2="0" />
            <line x1="0" y1="-1" x2="0" y2="-3" />
            <line x1="0" y1="1" x2="0" y2="3" />
        </g>
    </defs>
</svg>
```

```js
function makeCrosshair() {
    var data = [[180, 1], [260, 3], [340, 2], [420, 4]]; // <1>
    d3.select("#usedefs")
        .selectAll("use")
        .data(data)
        .enter()
        .append("use") // <2>
        .attr("href", "#crosshair") // <3>
        .attr(
            "transform", // <4>
            d => "translate(" + d[0] + ",50) scale(" + 2 * d[1] + ")"
        )
        .attr("stroke", "black") // <5>
        .attr("stroke-width", d => 0.5 / Math.sqrt(d[1])); // <6>
}
```

## 示例 5-3

<Example-5-3 />

```js
function makeLines() {
    // Prepare a data set and scale it properly for plotting
    var ds = [
        [1, 1],
        [2, 2],
        [3, 4],
        [4, 4],
        [5, 2],
        [6, 2],
        [7, 3],
        [8, 1],
        [9, 2]
    ];
    var xSc = d3
        .scaleLinear()
        .domain([1, 9])
        .range([50, 250]);
    var ySc = d3
        .scaleLinear()
        .domain([0, 5])
        .range([175, 25]);
    ds = ds.map(d => [xSc(d[0]), ySc(d[1])]); // <1>
    // Draw circles for the individual data points
    d3.select("#lines")
        .append("g")
        .selectAll("circle") // <2>
        .data(ds)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", d => d[0])
        .attr("cy", d => d[1]);

    // Generate a line
    var lnMkr = d3.line(); // <3>
    d3.select("#lines")
        .append("g")
        .append("path") // <4>
        .attr("d", lnMkr(ds)) // <5>
        .attr("fill", "none")
        .attr("stroke", "red"); // <6>
}
```

## 示例 5-4

<Example-5-4 />

```js
function makeCustomCurves() {
    var ds = [
        [1, 1],
        [2, 2],
        [3, 4],
        [4, 4],
        [5, 1],
        [6, 2],
        [7, 3],
        [8, 1],
        [9, 2]
    ];
    var xSc = d3
        .scaleLinear()
        .domain([1, 9])
        .range([50, 550]);
    var ySc = d3
        .scaleLinear()
        .domain([0, 5])
        .range([300, 50]);
    ds = ds.map(d => [xSc(d[0]), ySc(d[1])]);

    var svg = d3.select("#curves");
    // Symbols for individual data points
    svg.append("g")
        .selectAll("circle")
        .data(ds)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", d => d[0])
        .attr("cy", d => d[1]);
    var medMkr = d3.line().curve(curveVerticalMedian);
    svg.append("g")
        .append("path")
        .attr("d", medMkr(ds))
        .attr("fill", "none")
        .attr("stroke", "green");
    var hwMkr = d3.line().curve(curveHoltWinters(0.75));
    svg.append("g")
        .append("path")
        .attr("d", hwMkr(ds))
        .attr("fill", "none")
        .attr("stroke", "red");
    hwMkr = d3.line().curve(curveHoltWinters(0.25));
    svg.append("g")
        .append("path")
        .attr("d", hwMkr(ds))
        .attr("fill", "none")
        .attr("stroke", "blue");
}

function curveVerticalMedian(context) {
    return {
        lineStart: function() {
            this.data = []; // <1>
        },

        point: function(x, y) {
            this.data.push([x, y]); // <2>
        },

        lineEnd: function() {
            var xrange = d3.extent(this.data, d => d[0]); // <3>
            var median = d3.median(this.data, d => d[1]);
            context.moveTo(xrange[0], median); // <4>
            context.lineTo(xrange[1], median); // <5>
        }
    };
}

function curveHoltWinters(alpha) {
    var s; // <1>

    return function(context) {
        // <2>
        return {
            lineStart: function() {
                s = undefined; // <3>
            },

            point: function(x, y) {
                if (s === undefined) {
                    // <4>
                    s = y;
                    context.moveTo(x, y);
                } else {
                    // <5>
                    s = alpha * y + (1 - alpha) * s;
                    context.lineTo(x, s);
                }
            },

            lineEnd: function() {}
        };
    };
}
```

## 示例 5-5

<Example-5-5 />

```js
function makePie() {
    var data = [
        { name: "Jim", votes: 17 },
        { name: "Jon", votes: 5 },
        { name: "Bob", votes: 21 },
        { name: "Sam", votes: 12 },
        { name: "Dan", votes: 3 }
    ];
    var pie = d3
        .pie()
        .value(d => d.votes)
        .padAngle(0.025)(data); // <1>

    var arcMkr = d3
        .arc()
        .innerRadius(50)
        .outerRadius(150) // <2>
        .cornerRadius(10);

    var scC = d3
        .scaleOrdinal(d3.schemePastel2) // <3>
        .domain(pie.map(d => d.index)); // <4>

    var g = d3
        .select("#pie") // <5>
        .append("g")
        .attr("transform", "translate( 300, 200 )");
    g.selectAll("path")
        .data(pie)
        .enter()
        .append("path") // <6>
        .attr("d", arcMkr) // <7>
        .attr("fill", d => scC(d.index))
        .attr("stroke", "grey");
    g.selectAll("text")
        .data(pie)
        .enter()
        .append("text") // <8>
        .text(d => d.data.name) // <9>
        .attr("x", d => arcMkr.innerRadius(85).centroid(d)[0]) // <10>
        .attr("y", d => arcMkr.innerRadius(85).centroid(d)[1])
        .attr("font-family", "sans-serif")
        .attr("font-size", 14)
        .attr("text-anchor", "middle");
}
```

## 示例 5-6

<Example-5-6 />

```js
function button(sel, label) {
    //<1>
    sel.append("rect")
        .attr("rx", 5)
        .attr("ry", 5) //<2>
        .attr("width", 70)
        .attr("height", 30)
        .attr("x", -35)
        .attr("y", -15)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .classed("frame", true); //<3>

    sel.append("text")
        .attr("x", 0)
        .attr("y", 5) //<4>
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 14)
        .classed("label", true)
        .text(label ? label : d => d); //<5>
}
function makeButton() {
    var labels = ["Hello", "World", "How", "Are", "You?"];
    var scX = d3
        .scaleLinear()
        .domain([0, labels.length])
        .range([100, 550]);
    var scY = d3
        .scaleLinear()
        .domain([0, labels.length])
        .range([50, 150]);

    d3.select("#button") //<6>
        .selectAll("g")
        .data(labels)
        .enter()
        .append("g")
        .attr("transform", (d, i) => "translate(" + scX(i) + "," + scY(i) + ")")
        .call(button);
    d3.select("#button")
        .append("g") //<7>
        .attr("transform", "translate(75,150)")
        .call(button, "I'm fine!")
        .selectAll(".label")
        .attr("fill", "red"); //<8>
}
```
