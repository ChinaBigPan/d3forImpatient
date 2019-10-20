<template>
    <div>
        <svg id="ticks" width="600" height="200"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-7-1',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeTicks();
    },
    methods: {
        makeTicks() {
            var sc = d3
                .scaleLinear()
                .domain([0, 10])
                .range([0, 200]); // <1>
            // top left: default settings
            d3.select('#ticks')
                .append('g') // <2>
                .attr('transform', 'translate( 50,50)')
                .call(d3.axisBottom(sc));
            // bottom left: additional decimal in labels
            d3.select('#ticks')
                .append('g') // <3>
                .attr('transform', 'translate( 50,125)')
                .call(d3.axisBottom(sc).tickFormat(d3.format('.1f')))
                .selectAll('text')
                .filter((d, i) => i % 2 != 0)
                .attr('visibility', 'hidden');
            // top right: minor and major tick marks, additional label for axis
            d3.select('#ticks')
                .append('g') // <4>
                .attr('transform', 'translate(350,50)')
                .call(
                    d3
                        .axisBottom(sc)
                        .tickSize(3)
                        .tickFormat('')
                );
            d3.select('#ticks')
                .append('g')
                .attr('transform', 'translate(350,50)')
                .call(d3.axisBottom(sc).ticks(2))
                .append('text')
                .text('Metric')
                .attr('x', sc(5))
                .attr('y', 35)
                .attr('font-size', 12)
                .attr('fill', 'black');

            // bottom right: custom appearance
            var g = d3
                .select('#ticks')
                .append('g') // <5>
                .attr('transform', 'translate(350,125)')
                .call(d3.axisBottom(sc).tickPadding(5));
            g.select('.domain').attr('visibility', 'hidden');
            g.selectAll('.tick')
                .select('line')
                .attr('stroke', 'red')
                .attr('stroke-width', 2);
            g.selectAll('text').attr('font-size', 14);
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#ticks {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>