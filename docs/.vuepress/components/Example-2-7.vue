<template>
    <section>
        <div id="demo4"></div>
    </section>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-2-7',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeList();
    },
    methods: {
        makeList() {
            var vs = ['From East', 'to West,', 'at Home', 'is Best'];
            d3.select('#demo4')
                .append('ul')
                .selectAll('li')
                .data(vs)
                .enter()
                .append('li')
                .style('cursor', 'pointer')
                .text(d => d)
                .on('click', function() {
                    this.toggleState = !this.toggleState;
                    d3.select(this)
                        .transition()
                        .duration(2000)
                        .style('color', this.toggleState ? 'red' : 'black');
                });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#demo4 {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>