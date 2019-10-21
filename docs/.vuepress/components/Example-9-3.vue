<template>
    <div>
        <svg id="treemap" width="300" height="300"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-9-3',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeTreemap();
    },
    methods: {
        makeTreemap() {
            d3.json('/d3forImpatient/dataBase/filesys.json').then(function(json) {
                var sc = d3.scaleOrdinal(d3.schemeReds[8]);

                var nodes = d3
                    .hierarchy(json, d => d.kids)
                    .sum(d => d.size) //<1>
                    .sort((a, b) => b.height - a.height || b.value - a.value); //<2>

                d3
                    .treemap()
                    .size([300, 300])
                    .padding(5)(nodes); //<3>

                var g = d3
                    .select('#treemap')
                    .append('g')
                    .attr('transform', 'translate(0,0)');
                g.selectAll('rect')
                    .data(nodes.descendants())
                    .enter()
                    .append('rect')
                    .attr('x', d => d.x0)
                    .attr('y', d => d.y0)
                    .attr('width', d => d.x1 - d.x0)
                    .attr('height', d => d.y1 - d.y0) //<4>
                    .attr('fill', d => sc(d.height))
                    .attr('stroke', 'red');
                g.selectAll('text')
                    .data(nodes.leaves())
                    .enter() //<5>
                    .append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', 10)
                    .attr('x', d => (d.x0 + d.x1) / 2)
                    .attr('y', d => (d.y0 + d.y1) / 2 + 2)
                    .text(d => d.data.name);
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#treemap {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>