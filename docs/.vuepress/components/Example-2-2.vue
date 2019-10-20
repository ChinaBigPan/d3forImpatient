<template>
    <section>
        <svg id="demo1" width="600" height="300" />
    </section>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-2-2',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeDemo1();
    },
    methods: {
        makeDemo1() {
            d3.csv('/dataBase/examples-simple.csv').then(data => {
                // console.table(data);
                d3.select('#demo1')
                    .selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('r', 5)
                    .attr('fill', 'red')
                    .attr('cx', function(d) {
                        return d['x'];
                    })
                    .attr('cy', function(d) {
                        return d['y'];
                    });
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#demo1 {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>