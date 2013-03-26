define(['backbone', 'd3'], function (Backbone, d3) {
    return Backbone.View.extend({
        tagName: 'div',

        initialize: function () {
            this.data = [11, 17, 23, 32, 38]
        },

        render: function () {
            var data = this.data,
                height = 100,
                width = 300,
                barWidth = width / data.length,
                barGutter = barWidth * 0.1,
                y = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([height, 0]),
                x = d3.scale.ordinal()
                    .domain(data)
                    .rangeBands([0, width]),
                chart = d3.select(this.el)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

            chart
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', barWidth - barGutter * 2)
            .attr('height', function (d, i) {
                return height - y(d)
            })
            .attr('x', function (d, i) {
                return x(d) + barGutter
            })
            .attr('y', y)

            chart.selectAll('text')
            .data(data)
            .enter().append('text')
            .style('fill', 'white')
            .attr('y', y)
            .attr('x', function(d) {
                return x(d) + x.rangeBand() / 2
            })
            .attr('dx', '.5em') // padding-right
            .attr('dy', '1em') // vertical-align: middle
            .attr('text-anchor', 'end') // text-align: right
            .text(String)

            return this
        }
    })
})