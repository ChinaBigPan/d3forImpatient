<template>
    <div>
        <svg id="stagger" width="600" height="300"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-4-4',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeStagger();
    },
    methods: {
        makeStagger() {
            var ds1 = [2, 1, 3, 5, 7, 8, 9, 9, 9, 8, 7, 5, 3, 1, 2]; //<1>
            var ds2 = [8, 9, 8, 7, 5, 3, 2, 1, 2, 3, 5, 7, 8, 9, 8];
            var n = ds1.length,
                mx = d3.max(d3.merge([ds1, ds2])); //<2>

            var svg = d3.select('#stagger');
            var scX = d3
                .scaleLinear()
                .domain([0, n])
                .range([50, 540]); //<3>
            var scY = d3
                .scaleLinear()
                .domain([0, mx])
                .range([250, 50]);
            svg.selectAll('line')
                .data(ds1)
                .enter()
                .append('line') //<4>
                .attr('stroke', 'red')
                .attr('stroke-width', 20)
                .attr('x1', (d, i) => scX(i))
                .attr('y1', scY(0))
                .attr('x2', (d, i) => scX(i))
                .attr('y2', d => scY(d));
            svg.on('click', function() {
                //<5>
                [ds1, ds2] = [ds2, ds1]; //<6>

                svg.selectAll('line')
                    .data(ds1) //<7>
                    .transition()
                    .duration(1000)
                    .delay((d, i) => 200 * i) //<8>
                    .attr('y2', d => scY(d)); //<9>
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#stagger {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
    cursor: pointer;
}
</style>