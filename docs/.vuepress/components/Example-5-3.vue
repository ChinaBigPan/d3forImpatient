<template>
    <div>
        <svg id="lines" width="300" height="200">
        </svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-5-3',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeLines();
    },
    methods: {
        makeLines() {
            // Prepare a data set and scale it properly for plotting
            var ds = [[1, 1], [2, 2], [3, 4], [4, 4], [5, 2], [6, 2], [7, 3], [8, 1], [9, 2]];
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
            d3.select('#lines')
                .append('g')
                .selectAll('circle') // <2>
                .data(ds)
                .enter()
                .append('circle')
                .attr('r', 3)
                .attr('cx', d => d[0])
                .attr('cy', d => d[1]);

            // Generate a line
            var lnMkr = d3.line(); // <3>
            d3.select('#lines')
                .append('g')
                .append('path') // <4>
                .attr('d', lnMkr(ds)) // <5>
                .attr('fill', 'none')
                .attr('stroke', 'red'); // <6>
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#lines {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>