<template>
    <div>
        <svg id="tree" width="300" height="300" style="background:lightgrey">
            <text x="150" y="285" text-anchor="middle">d3.tree</text>
        </svg>
        <svg id="tree2" width="300" height="300" style="background:lightgrey">
            <text x="150" y="285" text-anchor="middle">d3.cluster</text>
        </svg>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-8-3',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeTree();
        this.makeTree2();
    },
    methods: {
        makeTree() {
            d3.json('/d3forImpatient/dataBase/filesys.json').then(function(json) {
                var nodes = d3.hierarchy(json, d => d.kids); //<1>
                d3.tree().size([250, 225])(nodes); //<2>

                var g = d3
                    .select('#tree')
                    .append('g') //<3>
                    .attr('transform', 'translate(25, 25)');

                var lnkMkr = d3
                    .linkVertical()
                    .x(d => d.x)
                    .y(d => d.y); //<4>
                g.selectAll('path')
                    .data(nodes.links())
                    .enter() //<5>
                    .append('path')
                    .attr('d', d => lnkMkr(d))
                    .attr('stroke', 'red')
                    .attr('fill', 'none');

                g.selectAll('circle')
                    .data(nodes.descendants())
                    .enter() //<6>
                    .append('circle')
                    .attr('r', 5)
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
            });
        },
        makeTree2() {
            d3.json('/dataBase/filesys.json').then(function(json) {
                var nodes = d3.hierarchy(json, d => d.kids).sort((a, b) => b.height - a.height);
                d3.cluster().size([250, 225])(nodes);
                var g = d3
                    .select('#tree2')
                    .append('g')
                    .attr('transform', 'translate(25, 25)');
                var lnkMkr = d3
                    .linkVertical()
                    .x(d => d.x)
                    .y(d => d.y);
                g.selectAll('path')
                    .data(nodes.links())
                    .enter()
                    .append('path')
                    .attr('d', d => lnkMkr(d))
                    .attr('stroke', 'red')
                    .attr('fill', 'none');
                g.selectAll('circle')
                    .data(nodes.descendants())
                    .enter()
                    .append('circle')
                    .attr('r', 5)
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
                // g.selectAll( "text" ).data( nodes.descendants() ).enter()
                //     .append( "text" )
                // .attr( "transform", d=>"rotate(90,"+d.x+","+d.y+")")
                // .attr( "font-size", 9 )
                //     .attr( "x", d=>d.x+8 ).attr( "y", d=>d.y )
                // .text( d=>d.data.name )
            });
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#tree, #tree2 {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>