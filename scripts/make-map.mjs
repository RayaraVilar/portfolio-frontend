import { readFileSync, writeFileSync } from "node:fs";
import { geoEquirectangular, geoGraticule10, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const world = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url)));
const countries = feature(world, world.objects.countries);
const projection = geoEquirectangular().scale(101).translate([320, 209]).precision(0.3);
const path = geoPath(projection);
const map = {
  land: path({ ...countries, features: countries.features.filter(country => country.id !== "010") }),
  brazil: path(countries.features.find(country => country.id === "076")),
  portugal: path(countries.features.find(country => country.id === "620")),
  grid: path(geoGraticule10()),
  patos: projection([-37.27, -7.02]),
  braganca: projection([-6.76, 41.81]),
};
writeFileSync(new URL("../app/map.json", import.meta.url), JSON.stringify(map));
