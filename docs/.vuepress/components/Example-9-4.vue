<template>
    <div>
        <svg id="net" width="600" height="600"></svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-9-4',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeNetwork();
    },
    methods: {
        makeNetwork() {
            d3.json('/dataBase/network.json').then(res => {
                var svg = d3.select('#net');
                var scC = d3.scaleOrdinal(d3.schemePastel1);

                d3.shuffle(res.ps);
                d3.shuffle(res.ln);

                d3.forceSimulation(res.ps)
                    .force('ct', d3.forceCenter(300, 300))
                    .force(
                        'ln',
                        d3
                            .forceLink(res.ln)
                            .distance(40)
                            .id(d => d.id)
                    )
                    .force('hc', d3.forceCollide(10))
                    .force('many', d3.forceManyBody())
                    .on('end', function() {
                        svg.selectAll('line')
                            .data(res.ln)
                            .enter()
                            .append('line')
                            .attr('stroke', 'black')
                            .attr('x1', d => d.source.x)
                            .attr('y1', d => d.source.y)
                            .attr('x2', d => d.target.x)
                            .attr('y2', d => d.target.y);

                        svg.selectAll('circle')
                            .data(res.ps)
                            .enter()
                            .append('circle')
                            .attr('r', 10)
                            .attr('fill', (d, i) => scC(i))
                            .attr('cx', d => d.x)
                            .attr('cy', d => d.y);
                        svg.selectAll('text')
                            .data(res.ps)
                            .enter()
                            .append('text')
                            .attr('x', d => d.x)
                            .attr('y', d => d.y + 4)
                            .attr('text-anchor', 'middle')
                            .attr('font-size', 10)
                            .text(d => d.id);
                    });
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#net {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>