<template>
    <div>
        <svg id="curves" width="600" height="350">
        </svg>

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
        this.makeCustomCurves();
    },
    methods: {
        makeCustomCurves() {
            var ds = [[1, 1], [2, 2], [3, 4], [4, 4], [5, 1], [6, 2], [7, 3], [8, 1], [9, 2]];
            var xSc = d3
                .scaleLinear()
                .domain([1, 9])
                .range([50, 550]);
            var ySc = d3
                .scaleLinear()
                .domain([0, 5])
                .range([300, 50]);
            ds = ds.map(d => [xSc(d[0]), ySc(d[1])]);

            var svg = d3.select('#curves');
            // Symbols for individual data points
            svg.append('g')
                .selectAll('circle')
                .data(ds)
                .enter()
                .append('circle')
                .attr('r', 3)
                .attr('cx', d => d[0])
                .attr('cy', d => d[1]);
            var medMkr = d3.line().curve(this.curveVerticalMedian);
            svg.append('g')
                .append('path')
                .attr('d', medMkr(ds))
                .attr('fill', 'none')
                .attr('stroke', 'green');
            var hwMkr = d3.line().curve(this.curveHoltWinters(0.75));
            svg.append('g')
                .append('path')
                .attr('d', hwMkr(ds))
                .attr('fill', 'none')
                .attr('stroke', 'red');
            hwMkr = d3.line().curve(this.curveHoltWinters(0.25));
            svg.append('g')
                .append('path')
                .attr('d', hwMkr(ds))
                .attr('fill', 'none')
                .attr('stroke', 'blue');
        },
        curveVerticalMedian(context) {
            return {
                lineStart: function() {
                    this.data = []; // <1>
                },

                point: function(x, y) {
                    this.data.push([x, y]); // <2>
                },

                lineEnd: function() {
                    var xrange = d3.extent(this.data, d => d[0]); // <3>
                    var median = d3.median(this.data, d => d[1]);
                    context.moveTo(xrange[0], median); // <4>
                    context.lineTo(xrange[1], median); // <5>
                }
            };
        },
        curveHoltWinters(alpha) {
            var s; // <1>

            return function(context) {
                // <2>
                return {
                    lineStart: function() {
                        s = undefined; // <3>
                    },

                    point: function(x, y) {
                        if (s === undefined) {
                            // <4>
                            s = y;
                            context.moveTo(x, y);
                        } else {
                            // <5>
                            s = alpha * y + (1 - alpha) * s;
                            context.lineTo(x, s);
                        }
                    },

                    lineEnd: function() {}
                };
            };
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#curves {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>