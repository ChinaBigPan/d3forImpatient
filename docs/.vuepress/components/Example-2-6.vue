<template>
    <section>
        <svg id="demo3" width="650" height="350" />
    </section>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-2-6',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeDemo3();
    },
    methods: {
        makeDemo3() {
            d3.csv('/d3forImpatient/dataBase/examples-multiple.csv').then(function(data) {
                var svg = d3.select('svg#demo3');
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
    }
};
</script>
    
<style lang="stylus" scoped>
#demo3 {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>