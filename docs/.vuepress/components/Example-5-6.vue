<template>
    <div>
        <svg id="button" width="600" height="200"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-5-5',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeButton();
    },
    methods: {
        button(sel, label) {
            //<1>
            sel.append('rect')
                .attr('rx', 5)
                .attr('ry', 5) //<2>
                .attr('width', 70)
                .attr('height', 30)
                .attr('x', -35)
                .attr('y', -15)
                .attr('fill', 'none')
                .attr('stroke', 'blue')
                .classed('frame', true); //<3>

            sel.append('text')
                .attr('x', 0)
                .attr('y', 5) //<4>
                .attr('text-anchor', 'middle')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 14)
                .classed('label', true)
                .text(label ? label : d => d); //<5>
        },
        makeButton() {
            var labels = ['Hello', 'World', 'How', 'Are', 'You?'];
            var scX = d3
                .scaleLinear()
                .domain([0, labels.length])
                .range([100, 550]);
            var scY = d3
                .scaleLinear()
                .domain([0, labels.length])
                .range([50, 150]);

            d3.select('#button') //<6>
                .selectAll('g')
                .data(labels)
                .enter()
                .append('g')
                .attr('transform', (d, i) => 'translate(' + scX(i) + ',' + scY(i) + ')')
                .call(this.button);
            d3.select('#button')
                .append('g') //<7>
                .attr('transform', 'translate(75,150)')
                .call(this.button, "I'm fine!")
                .selectAll('.label')
                .attr('fill', 'red'); //<8>
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#button {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>