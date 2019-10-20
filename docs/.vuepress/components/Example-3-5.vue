<template>
    <div>
        <svg id="update" style="cursor: pointer;"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-3-5',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeUpdate();
    },
    methods: {
        makeUpdate() {
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
    }
};
</script>
    
<style lang="less" scoped>
</style>