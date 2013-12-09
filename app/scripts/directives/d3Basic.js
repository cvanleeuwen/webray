(function () {
  'use strict';

  angular.module('app.directives')
    .directive('d3Bars', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(
			function(){ return angular.element(window)[0].innerWidth;},
			function(){ return scope.render(scope.data); }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) { return scope.render(newVals); }, true);

          scope.render = function(data){
            svg.selectAll("*").remove();

			var barHeight = 30;
			var barMargin = 7;
			var barVerticalSpace = barHeight + barMargin;
			var labelMargin = 5;
			
			var barColor = "#1B3277";
			
            var width = d3.select(iElement[0])[0][0].offsetWidth;
            var chartHeight = scope.data.length * barVerticalSpace;
			var max = Math.max.apply(Math, _.map(scope.data, function(value){ return value.score; }));

            svg.attr('height', chartHeight);

            // bars
            svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("height", barHeight)
                .attr("width", 0) // initial width of 0 for transition
                .attr("x", 0)
                .attr("y", function(d, i){ return i * barVerticalSpace; })
				.attr("fill", barColor)
				.on("mouseover", function(d){ d3.select(this).style({opacity:'0.7'}); })
				.on("mouseout", function(d){ d3.select(this).style({opacity:'1.0'}); })
                .transition()
                  .duration(200)
                  .attr("width", function(d){ return d.score/(max/width); }); // bar width based on score

			// labels
            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("fill", "#fff")
                .attr("y", function(d, i){return (i * barVerticalSpace) + (barVerticalSpace/2) + 2;}) // align label vertical centered.
                .attr("x", labelMargin)
                .text(function(d){return d[scope.label];});
          };
        }
      };
    }]);

}());
