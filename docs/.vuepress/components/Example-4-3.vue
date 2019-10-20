<template>
    <div>
        <svg id="dragdrop" width="600" height="200">
            <circle cx="100" cy="100" r="20" fill="red" />
            <circle cx="300" cy="100" r="20" fill="green" />
            <circle cx="500" cy="100" r="20" fill="blue" />
        </svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: '',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeDragDrop();
    },
    methods: {
        makeDragDrop() {
            var widget = undefined,
                color = undefined;
            var drag = d3
                .drag()
                .on('start', function() {
                    color = d3.select(this).attr('fill');
                    widget = d3.select(this).attr('fill', 'lime');
                })
                .on('drag', function() {
                    var pt = d3.mouse(d3.select(this).node());
                    widget.attr('cx', pt[0]).attr('cy', pt[1]);
                })
                .on('end', function() {
                    widget.attr('fill', color);
                    widget = undefined;
                });
            drag(d3.select('#dragdrop').selectAll('circle'));
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#dragdrop {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>