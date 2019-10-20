<template>
    <div>
        <svg id="voters" width="300" height="300"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-4-7',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeVetors();
    },
    methods: {
        makeVetors() {
            var n = 50,
                w = 300 / n,
                dt = 3000,
                svg = d3.select('#voters');

            var data = d3.range(n * n).map(d => {
                return {x: d % n, y: (d / n) | 0, val: Math.random()};
            });

            var sc = d3.scaleQuantize().range(['white', 'red', 'black']);

            function update() {
                var nbs = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
                return d3.shuffle(d3.range(n * n)).map(i => {
                    var nb = nbs[(nbs.length * Math.random()) | 0];
                    var x = (data[i].x + nb[0] + n) % n;
                    var y = (data[i].y + nb[1] + n) % n;
                    data[i].val = data[y * n + x].val;
                });
            }

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => w * d.x)
                .attr('y', d => w * d.y)
                .attr('width', w - 1)
                .attr('height', w - 1)
                .attr('fill', d => sc(d.val));

            d3.interval(function() {
                update();
                svg.selectAll('rect')
                    .data(data)
                    .transition()
                    .duration(dt)
                    .delay((d, i) => (i * 0.25 * dt) / (n * n))
                    .attr('fill', d => sc(d.val));
            }, dt);
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#voters {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>