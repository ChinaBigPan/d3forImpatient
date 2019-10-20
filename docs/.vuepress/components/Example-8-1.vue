<template>
    <div>
        <svg id="scale" width="400" height="350"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-8-1',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeScales();
    },
    methods: {
        makeScales() {
            var scX = d3
                .scaleLinear()
                .domain([0, 10])
                .range([0, 300]);

            var sc1 = d3
                .scaleLinear()
                .domain([0, 3, 10])
                .range(['blue', 'white', 'red']);
            var sc2 = d3
                .scaleLinear()
                .domain([0, 5, 5, 10])
                .range(['white', 'blue', 'red', 'white']);
            var sc3 = d3.scaleSequential(t => '' + d3.hsl(360 * t, 1, 0.5)).domain([0, 10]);
            //  var sc4 = d3.scaleSequential( t => d3.interpolateSinebow(2*(1-t)/3) )
            var sc4 = d3.scaleSequential(t => d3.interpolateSinebow(2 / 3 - (3 * t) / 4)).domain([0, 10]);
            var sc5 = d3.scaleSequential(d3.interpolateRgbBasis(['#b2d899', '#ffffbf', '#bf9966', '#ffffff'])).domain([0, 10]);

            d3.select('#scale')
                .append('g')
                .call(this.colorbox, [300, 30], sc1)
                .attr('transform', 'translate(50,50)');
            d3.select('#scale')
                .append('g')
                .call(this.colorbox, [300, 30], sc2)
                .attr('transform', 'translate(50,100)');
            d3.select('#scale')
                .append('g')
                .call(this.colorbox, [300, 30], sc3)
                .attr('transform', 'translate(50,150)');
            d3.select('#scale')
                .append('g')
                .call(this.colorbox, [300, 30], sc4)
                .attr('transform', 'translate(50,200)');
            d3.select('#scale')
                .append('g')
                .call(this.colorbox, [300, 30], sc5, scX)
                .attr('transform', 'translate(50,250)');
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
#scale {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>