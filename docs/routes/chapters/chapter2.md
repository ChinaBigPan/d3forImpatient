

# 第二章 让我们开始画图吧！

## 示例2-2

<Example-2-2 />

```js
    function makeDemo1() {
        d3.csv('/dataBase/examples-simple.csv').then(data => {
            // console.table(data);
            d3.select('#demo1')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', 5)
                .attr('fill', 'red')
                .attr('cx', function(d) {
                    return d['x'];
                })
                .attr('cy', function(d) {
                    return d['y'];
                });
        });
    }
```

---

## 示例2-5

<Example-2-5 />

```js
    function makeDemo2() {
        d3.csv('/dataBase/examples-multiple.csv').then(function(data) {
            var pxX = 625,
                pxY = 325;
            var scX = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d['x']))
                .range([25, pxX]);
            var scY1 = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d['y1']))
                .range([pxY, 25]);
            var scY2 = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d['y2']))
                .range([pxY, 25]);
            d3.select('#demo2')
                .append('g')
                .attr('id', 'ds1')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', 5)
                .attr('fill', 'green')
                .attr('cx', d => scX(d['x']))
                .attr('cy', d => scY1(d['y1']));
            d3.select('#demo2')
                .append('g')
                .attr('id', 'ds2')
                .attr('fill', 'blue')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', 5)
                .attr('cx', d => scX(d['x']))
                .attr('cy', d => scY2(d['y2']));
            var lineMaker = d3
                .line()
                .x(d => scX(d['x']))
                .y(d => scY1(d['y1']));
            d3.select('#ds1')
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('d', lineMaker(data));
            lineMaker.y(d => scY2(d['y2']));
            d3.select('#ds2')
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', 'cyan')
                .attr('d', lineMaker(data));
            //          d3.select( "#ds2" ).attr( "fill", "red" );
        });
    }

```

## 示例2-6

<Example-2-6 />

```js
    function makeDemo3() {
        d3.csv('/dataBase/examples-multiple.csv').then(function(data) {
            var svg = d3.select('svg');
            var pxX = svg.attr('width');
            var pxY = svg.attr('height');
            var makeScale = function(accessor, range) {
                return d3
                    .scaleLinear()
                    .domain(d3.extent(data, accessor))
                    .range(range)
                    .nice();
            };
            var scX = makeScale(d => d['x'], [0, pxX]);
            var scY1 = makeScale(d => d['y1'], [pxY, 0]);
            var scY2 = makeScale(d => d['y2'], [pxY, 0]);
            var drawData = function(g, accessor, curve) {
                // draw circles
                g.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('r', 5)
                    .attr('cx', d => scX(d['x']))
                    .attr('cy', accessor);
                // draw lines
                var lnMkr = d3
                    .line()
                    .curve(curve)
                    .x(d => scX(d['x']))
                    .y(accessor);
                g.append('path')
                    .attr('fill', 'none')
                    .attr('d', lnMkr(data));
            };

            var g1 = svg.append('g');
            var g2 = svg.append('g');
            drawData(g1, d => scY1(d['y1']), d3.curveStep);
            drawData(g2, d => scY2(d['y2']), d3.curveNatural);
            g1.selectAll('circle').attr('fill', 'green');
            g1.selectAll('path').attr('stroke', 'cyan');
            g2.selectAll('circle').attr('fill', 'blue');
            g2.selectAll('path').attr('stroke', 'red');
            var axMkr = d3.axisRight(scY1);
            axMkr(svg.append('g'));
            axMkr = d3.axisLeft(scY2);

            svg.append('g')
                .attr('transform', 'translate(' + pxX + ',0)')
                .call(axMkr);
            svg.append('g')
                .call(d3.axisTop(scX))
                .attr('transform', 'translate(0,' + pxY + ')');
        });
    }
```

## 示例2-7

<Example-2-7 />

```js
    function makeList() {
        var vs = ['From East', 'to West,', 'at Home', 'is Best'];
        d3.select('#demo4')
            .append('ul')
            .selectAll('li')
            .data(vs)
            .enter()
            .append('li')
            .text(d => d)
            .on('click', function() {
                this.toggleState = !this.toggleState;
                d3.select(this)
                    .transition()
                    .duration(2000)
                    .style('color', this.toggleState ? 'red' : 'black');
            });
    }

```


