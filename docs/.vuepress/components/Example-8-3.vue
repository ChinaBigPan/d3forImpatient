<template>
    <div>
        <svg id="contours" width="600" height="300"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-8-3',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeContours();
    },
    methods: {
        makeContours() {
            let _this = this;
            d3.json('/d3forImpatient/dataBase/haxby.json').then(function(scheme) {
                //<1>
                // Set up scales, including color
                var pxX = 525,
                    pxY = 300; //<2>
                var scX = d3
                    .scaleLinear()
                    .domain([-3, 1])
                    .range([0, pxX]);
                var scY = d3
                    .scaleLinear()
                    .domain([-1.5, 1.5])
                    .range([pxY, 0]);
                var scC = d3.scaleSequential(d3.interpolateRgbBasis(scheme['colors'])).domain([-1, 1]); //<3>
                var scZ = d3
                    .scaleLinear()
                    .domain([-1, -0.25, 0.25, 1])
                    .range(['white', 'grey', 'grey', 'black']);

                // Generate data
                var data = []; //<4>
                var f = (x, y, b) => (y ** 4 + x * y ** 2 + b * y) * Math.exp(-(y ** 2));
                for (var j = 0; j < pxY; j++) {
                    for (var i = 0; i < pxX; i++) {
                        data.push(f(scX.invert(i), scY.invert(j), 0.3));
                    }
                }
                var svg = d3.select('#contours'),
                    g = svg.append('g'); //<5>
                var pathMkr = d3.geoPath(); //<6>

                // Generate and draw filled contours (shading)
                var conMkr = d3
                    .contours()
                    .size([pxX, pxY])
                    .thresholds(100); //<7>
                g.append('g')
                    .selectAll('path')
                    .data(conMkr(data))
                    .enter()
                    .append('path')
                    .attr('d', pathMkr) //<8>
                    .attr('fill', d => scC(d.value))
                    .attr('stroke', 'none');
                // Generate and draw contour lines
                conMkr = d3
                    .contours()
                    .size([pxX, pxY])
                    .thresholds(10); //<9>
                g.append('g')
                    .selectAll('path')
                    .data(conMkr(data))
                    .enter()
                    .append('path')
                    .attr('d', pathMkr)
                    .attr('fill', 'none')
                    .attr('stroke', d => scZ(d.value));
                // Generate a single contour
                g.select('g')
                    .append('path') //<10>
                    .attr('d', pathMkr(conMkr.contour(data, 0.025)))
                    .attr('fill', 'none')
                    .attr('stroke', 'red')
                    .attr('stroke-width', 2);
                // Generate axis
                svg.append('g')
                    .call(d3.axisTop(scX).ticks(10)) //<11>
                    .attr('transform', 'translate(0,' + pxY + ')');
                svg.append('g').call(d3.axisRight(scY).ticks(5));
                // Generate colorbox
                svg.append('g')
                    .call(_this.colorbox, [280, 30], scC) //<12>
                    .attr('transform', 'translate( 540,290 ) rotate(-90)')
                    .selectAll('text')
                    .attr('transform', 'rotate(90)');
                svg.append('g')
                    .attr('transform', 'translate( 570,10 )')
                    .call(
                        d3.axisRight(
                            d3
                                .scaleLinear()
                                .domain([-1, 1])
                                .range([280, 0])
                        )
                    );
            });
        },
        colorbox(sel, size, colors, ticks) {
            //<1>
            var [x0, x1] = d3.extent(colors.domain()); //<2>
            var bars = d3.range(x0, x1, (x1 - x0) / size[0]);

            var sc = d3
                .scaleLinear()
                .domain([x0, x1])
                .range([0, size[0]]); //<3>
            sel.selectAll('line')
                .data(bars)
                .enter()
                .append('line') //<4>
                .attr('x1', sc)
                .attr('x2', sc)
                .attr('y1', 0)
                .attr('y2', size[1])
                .attr('stroke', colors);

            sel.append('rect')
                .attr('width', size[0])
                .attr('height', size[1]) //<5>
                .attr('fill', 'none')
                .attr('stroke', 'black');

            if (ticks) {
                //<6>
                sel.append('g')
                    .call(d3.axisBottom(ticks))
                    .attr('transform', 'translate( 0,' + size[1] + ')');
            }
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#contours {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>