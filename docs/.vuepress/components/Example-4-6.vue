<template>
    <div>
        <svg id="lissajous" width="300" height="300"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-4-6',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeLissajous();
    },
    methods: {
        makeLissajous() {
            var svg = d3.select('#lissajous');
            var a = 1.9,
                b = 3.2; // Lissajous frequencies
            var phi,
                omega = (2 * Math.PI) / 10000; // 10 seconds per period
            var crrX = 150 + 100,
                crrY = 150 + 0;
            var prvX = crrX,
                prvY = crrY;
            var timer = d3.timer(function(t) {
                phi = omega * t;
                crrX = 150 + 100 * Math.cos(a * phi);
                crrY = 150 + 100 * Math.sin(b * phi);
                svg.selectAll('line')
                    .each(function() {
                        this.bogus_opacity *= 0.99;
                    })
                    .attr('stroke-opacity', function() {
                        return this.bogus_opacity;
                    })
                    .filter(function() {
                        return this.bogus_opacity < 0.05;
                    })
                    .remove();

                svg.append('line')
                    .each(function() {
                        this.bogus_opacity = 1.0;
                    })
                    .attr('x1', prvX)
                    .attr('y1', prvY)
                    .attr('x2', crrX)
                    .attr('y2', crrY)
                    .attr('stroke', 'green')
                    .attr('stroke-width', 2);
                prvX = crrX;
                prvY = crrY;
                if (t > 120e3) {
                    timer.stop();
                } // 120 seconds
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#lissajous {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>