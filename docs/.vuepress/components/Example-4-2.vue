<template>
    <section>
        <svg id="brush1" width="300" height="300" style="background:lightgrey">
        </svg>

        <svg id="brush2" width="300" height="300" style="background:lightgrey">
        </svg>
    </section>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-4-2',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeBrush();
    },
    methods: {
        makeBrush() {
            let _this = this;
            d3.csv('/d3forImpatient/dataBase/dense.csv').then(function(data) {
                var svg1 = d3.select('#brush1'),
                    svg2 = d3.select('#brush2');
                var sc1 = d3
                    .scaleLinear()
                    .domain([0, 10, 50])
                    .range(['lime', 'yellow', 'red']);
                var sc2 = d3
                    .scaleLinear()
                    .domain([0, 10, 50])
                    .range(['lime', 'yellow', 'blue']);
                var cs1 = _this.drawCircles(svg1, data, d => d['A'], d => d['B'], sc1);
                var cs2 = _this.drawCircles(svg2, data, d => d['A'], d => d['B'], sc2);
                svg1.call(_this.installHandlers, data, cs1, cs2, sc1, sc2);
            });
        },
        drawCircles(svg, data, accX, accY, sc) {
            var color = sc(Infinity);
            return svg
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', 5)
                .attr('cx', accX)
                .attr('cy', accY)
                .attr('fill', color)
                .attr('fill-opacity', 0.4);
        },
        installHandlers(svg, data, cs1, cs2, sc1, sc2) {
            var cursor = svg
                .append('circle')
                .attr('r', 50) //<1>
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 10)
                .attr('stroke-opacity', 0.1)
                .attr('visibility', 'hidden'); //<2>

            var hotzone = svg
                .append('rect')
                .attr('cursor', 'none') //<3>
                .attr('x', 50)
                .attr('y', 50)
                .attr('width', 200)
                .attr('height', 200)
                .attr('visibility', 'hidden')
                .attr('pointer-events', 'all')
                .on('mouseenter', function() {
                    cursor.attr('visbility', 'visible');
                })
                .on('mousemove', function() {
                    var pt = d3.mouse(svg.node());
                    cursor.attr('cx', pt[0]).attr('cy', pt[1]);
                    cs1.attr('fill', function(d, i) {
                        var r = Math.hypot(pt[0] - d3.select(this).attr('cx'), pt[1] - d3.select(this).attr('cy'));
                        data[i]['r'] = r;
                        return sc1(r);
                    });
                    cs2.attr('fill', (d, i) => sc2(data[i]['r'])).on('mouseleave', function() {
                        cursor.attr('visibility', 'hidden');
                        cs1.attr('fill', sc1(Infinity));
                        cs2.attr('fill', sc2(Infinity));
                    });
                });
        }
    }
};
</script>
    
<style lang="less" scoped>
</style>