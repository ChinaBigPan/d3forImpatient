<template>
    <div>
        <canvas id="canvas" width="465" height="250"></canvas>
    </div>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'Example-8-2',
    data() {
        return {};
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.makeMandelbrot();
    },
    methods: {
        makeMandelbrot() {
            var cnv = d3.select('#canvas'); //<1>
            var ctx = cnv.node().getContext('2d');
            var pxX = 465,
                pxY = 250,
                maxIter = 2000; //<2>

            var scX = d3
                .scaleLinear()
                .domain([0, pxX])
                .range([-1.31, -0.845]); //<3>
            var scY = d3
                .scaleLinear()
                .domain([0, pxY])
                .range([0.45, 0.2]);

            var scC = d3
                .scaleLinear()
                .domain([1, 10, 23, 35, 55, 1999, 2000]) //<4>
                .range(['white', 'red', 'orange', 'yellow', 'lightyellow', 'white', 'darkgrey'])
                .clamp(true);

            function mandelbrot(x, y) {
                //<5>
                var u = 0.0,
                    v = 0.0,
                    k = 0;
                for (k = 0; k < maxIter && u * u + v * v < 4; k++) {
                    var t = u * u - v * v + x;
                    v = 2 * u * v + y;
                    u = t;
                }
                return k;
            }

            for (var j = 0; j < pxY; j++) {
                //<6>
                for (var i = 0; i < pxX; i++) {
                    var d = mandelbrot(scX(i), scY(j));
                    ctx.fillStyle = scC(d);
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }
    }
};
</script>
    
<style lang="stylus" scoped>
#canvas {
    margin: 20px auto;
    display: block;
    background: #f8f8f8;
}
</style>