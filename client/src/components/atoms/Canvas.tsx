import { IClient } from "@/interfaces/IClient";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface CanvasProps {
  route: IClient[];
}

const Canvas: React.FC<CanvasProps> = ({ route }) => {
  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const svg = d3.select(canvasRef.current);
      const width = 800;
      const height = 500;
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };

      // Clear previous contents
      svg.selectAll("*").remove();

      // Adjust the size of the SVG to accommodate axes
      svg.attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
      );

      // Create a group element for zoomable content
      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Scales
      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(route, (d) => d.coordinate_x) as [number, number])
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(route, (d) => d.coordinate_y) as [number, number])
        .range([height, 0]);

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
      g.append("g").call(d3.axisLeft(yScale));

      // Line generator
      const line = d3
        .line<IClient>()
        .x((d) => xScale(d.coordinate_x))
        .y((d) => yScale(d.coordinate_y));

      // Path
      g.append("path")
        .datum([route[route.length - 1], ...route]) // Ensure path starts and ends at Company
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add dots to the route
      g.selectAll(".point")
        .data(route)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", (d) => xScale(d.coordinate_x))
        .attr("cy", (d) => yScale(d.coordinate_y))
        .attr("r", 4)
        .attr("fill", "orange");

      // Add labels to the route points
      g.selectAll(".label")
        .data(route)
        .enter()
        .append("text")
        .attr("x", (d) => xScale(d.coordinate_x))
        .attr("y", (d) => yScale(d.coordinate_y))
        .attr("dx", 5)
        .attr("dy", -5)
        .text((d) => d.name)
        .attr("font-size", "0.75em");

      // Zoom behavior
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .on("zoom", (event) => g.attr("transform", event.transform));

      svg
        .call(zoom)
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(width / 2, height / 2).scale(0.5)
        );

      // Add a dot for the "Company"
      const company = route.find((d) => d.id === 1); // Assuming Company has id=1
      if (company) {
        g.append("circle")
          .attr("cx", xScale(company.coordinate_x))
          .attr("cy", yScale(company.coordinate_y))
          .attr("r", 6)
          .attr("fill", "red");

        g.append("text")
          .attr("x", xScale(company.coordinate_x))
          .attr("y", yScale(company.coordinate_y))
          .attr("dx", 7)
          .attr("dy", -7)
          .text("Company")
          .attr("font-weight", "bold");
      }
    }
  }, [route]);

  return (
    <svg
      ref={canvasRef}
      style={{
        width: "100%",
        height: "auto",
      }}
    ></svg>
  );
};

export default Canvas;
