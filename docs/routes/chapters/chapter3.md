

# 第三章

## 示例3-1

<Example-3-3 />

- 可点击进行改变

```js
function makeKeys() {
    var ds1 = [['Mary', 1], ['Jane', 4], ['Anne', 2]];
    var ds2 = [['Anne', 5], ['Jane', 3]];
    var scX = d3
            .scaleLinear()
            .domain([0, 6])
            .range([50, 300]),
        scY = d3
            .scaleLinear()
            .domain([0, 3])
            .range([50, 150]);
    var j = -1,
        k = -1;
    var svg = d3.select('#key');
    svg.selectAll('text')
        .data(ds1)
        .enter()
        .append('text')
        .attr('x', 20)
        .attr('y', d => scY(++j))
        .text(d => d[0]);
    svg.selectAll('circle')
        .data(ds1)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', 'red')
        .attr('cx', d => scX(d[1]))
        .attr('cy', d => scY(++k) - 5);
    svg.on('click', function() {
        var cs = svg.selectAll('circle').data(ds2, d => d[0]);
        cs.transition()
            .duration(1000)
            .attr('cx', d => scX(d[1]));
        cs.exit().attr('fill', 'blue');
    });
}
```

## 示例3-2

<Example-3-5 />

- 可点击进行改变

```js
function makeUpdate() {
    var ds1 = [[2, 3, 'green'], [1, 2, 'red'], [2, 1, 'blue'], [3, 2, 'yellow']];
    var ds2 = [[1, 1, 'red'], [3, 3, 'black'], [1, 3, 'lime'], [3, 1, 'blue']];
    var scX = d3
            .scaleLinear()
            .domain([1, 3])
            .range([100, 200]),
        scY = d3
            .scaleLinear()
            .domain([1, 3])
            .range([50, 100]);
    var svg = d3.select('#update');
    svg.on('click', function() {
        [ds1, ds2] = [ds2, ds1];
        var cs = svg.selectAll('circle').data(ds1, d => d[2]);
        cs.exit().remove();
        cs = cs
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('fill', d => d[2])
            .merge(cs);
        cs.transition()
            .duration(1000)
            .attr('cx', d => scX(d[0]))
            .attr('cy', d => scY(d[1]));
    });
    svg.dispatch('click');
}
```

## 示例3-3

<Example-3-6 />

- 点击可排序

```js
function makeSort() {
    var data = ['Jane', 'Anne', 'Mary'];
    var ul = d3.select('#sort');
    ul.selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .text(d => d);
    // insert on mouse enter
    var once;
    ul.on('mouseenter', function() {
        if (once) {
            return;
        }
        once = 1;
        ul.insert('li', ':nth-child(2)')
            .datum('Lucy')
            .text('Lucy');
        ul.insert('li', ':first-child')
            .datum('Lisa')
            .text('Lisa');
    });
    // sort on click
    ul.on('click', function() {
        ul.selectAll('li').sort((a, b) => (a < b ? 1 : b < a ? -1 : 0));
    });
}
```