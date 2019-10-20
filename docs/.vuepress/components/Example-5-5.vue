<template>
    <div>
        <svg id="pie" width="600" height="400"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-5-5',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makePie();
    },
    methods: {
        makePie() {
            var data = [{name: 'Jim', votes: 17}, {name: 'Jon', votes: 5}, {name: 'Bob', votes: 21}, {name: 'Sam', votes: 12}, {name: 'Dan', votes: 3}];
            var pie = d3
                .pie()
                .value(d => d.votes)
                .padAngle(0.025)(data); // <1>

            var arcMkr = d3
                .arc()
                .innerRadius(50)
                .outerRadius(150) // <2>
                .cornerRadius(10);

            var scC = d3
                .scaleOrdinal(d3.schemePastel2) // <3>
                .domain(pie.map(d => d.index)); // <4>

            var g = d3
                .select('#pie') // <5>
                .append('g')
                .attr('transform', 'translate( 300, 200 )');
            g.selectAll('path')
                .data(pie)
                .enter()
                .append('path') // <6>
                .attr('d', arcMkr) // <7>
                .attr('fill', d => scC(d.index))
                .attr('stroke', 'grey');
            g.selectAll('text')
                .data(pie)
                .enter()
                .append('text') // <8>
                .text(d => d.data.name) // <9>
                .attr('x', d => arcMkr.innerRadius(85).centroid(d)[0]) // <10>
                .attr('y', d => arcMkr.innerRadius(85).centroid(d)[1])
                .attr('font-family', 'sans-serif')
                .attr('font-size', 14)
                .attr('text-anchor', 'middle');
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#pie {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>