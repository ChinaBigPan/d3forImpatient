<template>
    <section class='first_example'>
        <h1>{{ txt }}</h1>
        <div>{{ number }}</div>
        <hr>
        <button @click="addOne">点我</button>
        <hr>
        <div class="chart" ref="chart"></div>
    </section>
</template>
    
<script>
import * as d3 from 'd3';

export default {
    name: 'firstExample',
    data() {
        return {
            number: 0,
            txt: '测试D3图表',
            data: [30, 86, 168, 281, 303, 365]
        };
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.initBarChart();
    },
    methods: {
        addOne() {
            this.number++;
        },
        initBarChart() {
            let selectDom = this.$refs.chart;
            let data = this.data;
            d3.select(selectDom)
                .selectAll('div')
                .data(data)
                .enter()
                .append('div')
                .style('width', function(d) {
                    return `${d}px`;
                })
                .style('background', 'orangered')
                .style('margin-bottom', '10px')
                .style('color', 'white')
                .text(function(d) {
                    return d;
                });
        }
    }
};
</script>
    
<style lang="less" scoped>
</style>