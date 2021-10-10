/**
 * Velox.
 *
 * @license BSD-2-Clause
 * @copyright Mat. 2021-present
 */

/* eslint-disable no-console */

import { run } from "@xcmats/js-toolbox/utils";
import packageInfo from "../package.json";
import "maplibre-gl/dist/maplibre-gl.css";




// ...
const setupMap = async (mapElement: HTMLElement): Promise<maplibregl.Map> => {
    const { default: maplibre } = (await import("maplibre-gl"));
    const map = new maplibre.Map({
        accessToken: "",
        container: mapElement,
        style: "https://demotiles.maplibre.org/style.json",
    });

    return map;
};




// ...
run(async () => {
    const title = document.getElementsByTagName("title").item(0);
    if (title) title.innerText = packageInfo.name;

    const mapElement = document.getElementById("map");
    if (mapElement) {
        await setupMap(mapElement);
    }

    console.info(packageInfo.name);
});
