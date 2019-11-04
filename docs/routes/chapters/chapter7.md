## 示例 7-1

<Example-7-1 />

---

```js
function makeTicks() {
    var sc = d3
        .scaleLinear()
        .domain([0, 10])
        .range([0, 200]); // <1>
    // top left: default settings
    d3.select("#ticks")
        .append("g") // <2>
        .attr("transform", "translate( 50,50)")
        .call(d3.axisBottom(sc));
    // bottom left: additional decimal in labels
    d3.select("#ticks")
        .append("g") // <3>
        .attr("transform", "translate( 50,125)")
        .call(d3.axisBottom(sc).tickFormat(d3.format(".1f")))
        .selectAll("text")
        .filter((d, i) => i % 2 != 0)
        .attr("visibility", "hidden");
    // top right: minor and major tick marks, additional label for axis
    d3.select("#ticks")
        .append("g") // <4>
        .attr("transform", "translate(350,50)")
        .call(
            d3
                .axisBottom(sc)
                .tickSize(3)
                .tickFormat("")
        );
    d3.select("#ticks")
        .append("g")
        .attr("transform", "translate(350,50)")
        .call(d3.axisBottom(sc).ticks(2))
        .append("text")
        .text("Metric")
        .attr("x", sc(5))
        .attr("y", 35)
        .attr("font-size", 12)
        .attr("fill", "black");

    // bottom right: custom appearance
    var g = d3
        .select("#ticks")
        .append("g") // <5>
        .attr("transform", "translate(350,125)")
        .call(d3.axisBottom(sc).tickPadding(5));
    g.select(".domain").attr("visibility", "hidden");
    g.selectAll(".tick")
        .select("line")
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    g.selectAll("text").attr("font-size", 14);
}
```

## 示例 7-2

<Example-7-2 />

---

```js
function makeGraph() {
    d3.text("/dataBase/phonecost.tsv").then(res => {
        var data = d3.tsvParseRows(res, d => [+d[0], +d[1]]); //<1>
        function draw(sel, scX, scY, width, height) {
            //<2>
            scX = scX
                .domain(d3.extent(data, d => d[0]))
                .nice() //<3>
                .range([0, width]);
            scY = scY
                .domain(d3.extent(data, d => d[1]))
                .nice()
                .range([height, 0]);
            var ds = data.map(d => [scX(d[0]), scY(d[1])]); //<4>
            sel.append("path")
                .classed("curve", true)
                .attr("d", d3.line()(ds))
                .attr("fill", "none");
            sel.append("g")
                .call(d3.axisBottom(scX).ticks(10, "d")) //<5>
                .attr("transform", "translate( 0," + height + ")");

            sel.append("g").call(d3.axisLeft(scY)); //<6>
        }

        d3.select("#graph")
            .append("g") //<7>
            .attr("transform", "translate( 50, 50 )")
            .call(draw, d3.scaleLinear(), d3.scaleLinear(), 500, 500)
            .select(".curve")
            .attr("stroke", "red");

        d3.select("#graph")
            .append("g") //<8>
            .attr("transform", "translate( 200, 50 )")
            .call(draw, d3.scaleLinear(), d3.scaleLog(), 350, 250)
            .select(".curve")
            .attr("stroke", "blue");
    });
}
```
