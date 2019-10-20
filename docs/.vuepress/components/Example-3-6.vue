<template>
    <div>
        <ul id="sort"></ul>
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
        this.makeSort();
    },
    methods: {
        makeSort() {
            var data = ['Jane', 'Anne', 'Mary'];
            var ul = d3.select('#sort');
            ul.selectAll('li')
                .data(data)
                .enter()
                .append('li')
                .text(d => d);
            // insert on mouse enter
            var once;
            ul.on('mouseenter', function() {
                if (once) {
                    return;
                }
                once = 1;
                ul.insert('li', ':nth-child(2)')
                    .datum('Lucy')
                    .text('Lucy');
                ul.insert('li', ':first-child')
                    .datum('Lisa')
                    .text('Lisa');
            });
            // sort on click
            ul.on('click', function() {
                ul.selectAll('li').sort((a, b) => (a < b ? 1 : b < a ? -1 : 0));
            });
        }
    }
};
</script>
    
<style lang="less" scoped>
</style>