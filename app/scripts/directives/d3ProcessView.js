(function () {
  'use strict';

  angular.module('app.directives')
    .directive('d3ProcessView', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
			var width = 1200;
			var height = 900;
			var nodeWidth = 50;
			var nodeHeight = 20;
			
			var color = d3.scale.category20();
			
			var force = d3.layout.force()
				.charge(-50)
				.linkDistance(200)
				.size([width, height]);
			
			var svg = d3.select(iElement[0]).append("svg")
				.attr("width", width)
				.attr("height", height);
			
			d3.json("miserables.json", function(error, graph) {
				if(error) { 
					alert(error);
					return;
				}
				
				var maxLinkValue = Math.max.apply(Math, _.map(graph.links, function(link){ return link.value; }));

				force
					.nodes(graph.nodes)
					.links(graph.links)
					.start();
				
				var link = svg.selectAll(".link")
					.data(graph.links)
					.enter().append("line")
					.attr("class", "link")
					.attr("stroke", "#999")
					.style("stroke-width", function(L) { return 0.4 + (3*L.value / maxLinkValue); });
				
				var node = svg.selectAll(".node")
					.data(graph.nodes).enter()
					.append("rect")
					.attr("class", "node")
					.attr("width", nodeWidth)
					.attr("height", nodeHeight)
					.style("fill", function(n) { return color(n.group); })
					.call(force.drag);
				
				node.append("title")
					.text(function(n) { return n.name; });
				
				force.on("tick", function() {
					link.attr("x1", function(d) { return d.source.x; })
						.attr("y1", function(d) { return d.source.y; })
						.attr("x2", function(d) { return d.target.x; })
						.attr("y2", function(d) { return d.target.y; });
				
					node.attr("x", function(d) { return d.x - (nodeWidth/2); })
						.attr("y", function(d) { return d.y - (nodeHeight/2); });
				});
			});
        }
      };
    }]);

}());
