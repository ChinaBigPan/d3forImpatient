<template>
    <section>
        <svg id="demo41" width="600" height="300" />
    </section>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-4-1',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.coordsPixels('#demo41');
    },
    methods: {
        coordsPixels(selector) {
            var txt = d3.select(selector).append('text');
            var svg = d3
                .select(selector)
                .attr('cursor', 'crosshair')
                .on('mousemove', function() {
                    var pt = d3.mouse(svg.node());
                    txt.attr('x', 18 + pt[0])
                        .attr('y', 6 + pt[1])
                        .text('' + pt[0].toFixed(0) + ' , ' + pt[1].toFixed(0));
                });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#demo41 {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>