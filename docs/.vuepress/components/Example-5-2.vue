<template>
    <div>
        <svg id="usedefs" width="600" height="100">
            <defs>
                <!--1-->
                <g id="crosshair">
                    <!--2-->
                    <circle cx="0" cy="0" r="2" fill="none" />
                    <!--3-->
                    <line x1="-3" y1="0" x2="-1" y2="0" />
                    <line x1="1" y1="0" x2="3" y2="0" />
                    <line x1="0" y1="-1" x2="0" y2="-3" />
                    <line x1="0" y1="1" x2="0" y2="3" />
                </g>
            </defs>
        </svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-5-2',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeCrosshair();
    },
    methods: {
        makeCrosshair() {
            var data = [[180, 1], [260, 3], [340, 2], [420, 4]]; // <1>
            d3.select('#usedefs')
                .selectAll('use')
                .data(data)
                .enter()
                .append('use') // <2>
                .attr('href', '#crosshair') // <3>
                .attr(
                    'transform', // <4>
                    d => 'translate(' + d[0] + ',50) scale(' + 2 * d[1] + ')'
                )
                .attr('stroke', 'black') // <5>
                .attr('stroke-width', d => 0.5 / Math.sqrt(d[1])); // <6>
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#usedefs {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>