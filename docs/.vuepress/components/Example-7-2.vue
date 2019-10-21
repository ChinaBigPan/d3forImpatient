<template>
    <div>
        <svg id="graph" width="600" height="600"></svg>
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
        this.makeGraph();
    },
    methods: {
        makeGraph() {
            d3.text('/d3forImpatient/dataBase/phonecost.tsv').then(res => {
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
                    sel.append('path')
                        .classed('curve', true)
                        .attr('d', d3.line()(ds))
                        .attr('fill', 'none');
                    sel.append('g')
                        .call(d3.axisBottom(scX).ticks(10, 'd')) //<5>
                        .attr('transform', 'translate( 0,' + height + ')');

                    sel.append('g').call(d3.axisLeft(scY)); //<6>
                }

                d3.select('#graph')
                    .append('g') //<7>
                    .attr('transform', 'translate( 50, 50 )')
                    .call(draw, d3.scaleLinear(), d3.scaleLinear(), 500, 500)
                    .select('.curve')
                    .attr('stroke', 'red');

                d3.select('#graph')
                    .append('g') //<8>
                    .attr('transform', 'translate( 200, 50 )')
                    .call(draw, d3.scaleLinear(), d3.scaleLog(), 350, 250)
                    .select('.curve')
                    .attr('stroke', 'blue');
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#graph {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>