define(['underscore', 'backbone', 'd3'], function (_, Backbone, d3) {
    return Backbone.View.extend({
        tagName: 'div',

        initialize: function () {
            this.listenTo(this.collection, 'sync', _.bind(this.render, this))
            this._chartWidth = Math.max(this.$el.width(), 300)
            this._chartHeight = Math.max(this.$el.height(), 100)
            this.chart = d3.select(this.el)
            .append('svg')
            .attr('width', this._chartWidth)
            .attr('height', this._chartHeight)
        },

        render: function () {
            var data = this.collection.map(function (score) {
                    return score.get('value')
                }),
                height = this._chartHeight,
                width = this._chartWidth,
                barWidth = width / data.length,
                barGutter = barWidth * 0.1,
                y = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([height, 0]),
                chart = this.chart,
                bars, text

            bars = chart.selectAll('rect').data(data)
            this._renderBars(bars, data, height, barWidth, barGutter, y)
            this._renderBars(bars.enter().append('rect'), data, height, barWidth, barGutter, y)

            text = chart.selectAll('text').data(data)
            this._renderText(text, barWidth, barGutter, y)
            this._renderText(text.enter().append('text'), barWidth, barGutter, y)

            return this
        },

        _renderBars: function (bars, data, height, barWidth, barGutter, y) {
            bars
            .attr('width', barWidth - barGutter * 2)
            .attr('x', function (d, i) {
                return i * barWidth + barGutter
            })
            .attr('height', 0)
            .attr('y', height)
            .transition().duration(500)
            .attr('height', function (d) {
                return height - y(d)
            })
            .attr('y', y)
        },

        _renderText: function (text, barWidth, barGutter, y) {
            text
            .style('fill', 'white')
            .attr('y', y)
            .attr('x', function(d, i) {
                return i * barWidth + barWidth / 2
            })
            .attr('dx', '.5em') // padding-right
            .attr('dy', '1em') // vertical-align: middle
            .attr('text-anchor', 'end') // text-align: right
            .text(String)
        }
    })
})