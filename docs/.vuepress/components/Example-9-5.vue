<template>
    <div>
        <svg id="simul" width="600" height="600">
            <circle id="c1" cx="350" cy="300" r="10" fill="red" />
            <circle id="c2" cx="250" cy="300" r="10" fill="blue" />
        </svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-9-5',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeSimul();
    },
    methods: {
        makeSimul() {
            var ps = [{x: 350, y: 300, vx: 0, vy: 1}, {x: 250, y: 300, vx: 0, vy: -1}];
            var ln = [{index: 0, source: ps[0], target: ps[1]}];

            var cs1 = d3.select('#simul').select('#c1');
            var cs2 = d3.select('#simul').select('#c2');

            var sim = d3
                .forceSimulation(ps)
                .alphaDecay(0)
                .alphaMin(-1)
                .velocityDecay(0)
                .force(
                    'ln',
                    d3
                        .forceLink(ln)
                        .distance(50)
                        .strength(0.01)
                )
                .on('tick', function() {
                    cs1.attr('cx', ps[0].x).attr('cy', ps[0].y);
                    cs2.attr('cx', ps[1].x).attr('cy', ps[1].y);
                });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#simul {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>