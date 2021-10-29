/**
 * Velox.
 *
 * @license BSD-2-Clause
 * @copyright Mat. 2021-present
 */

/* eslint-disable no-console */

import { run } from "@xcmats/js-toolbox/utils";
import {
    useMemory as useBareMemory,
    share,
} from "mem-box";
import { getProcess } from "@xcmats/js-toolbox/utils";
import "maplibre-gl/dist/maplibre-gl.css";

import packageInfo from "~/../package.json";




/**
 * Type-safe instance of useMemory.
 */
export const useMemory: (() => Ctx) = useBareMemory;




/**
 * ...
 */
const setupMap = async (mapElement: HTMLElement): Promise<maplibregl.Map> => {
    const { default: maplibre } = (await import("maplibre-gl"));
    const map = new maplibre.Map({
        accessToken: "",
        container: mapElement,
        style: "https://demotiles.maplibre.org/style.json",
    });

    map.setMinZoom(2);
    map.setMaxZoom(9);
    map.setCenter({ lng: 19.85, lat: 52.06 });
    map.setZoom(5);

    share({ map });

    return map;
};




/**
 * Run-time available environment variables.
 */
export const version = packageInfo.version;
export const env = {
    ...getProcess().env,
    GIT_AUTHOR_DATE: process.env.GIT_AUTHOR_DATE,
    GIT_VERSION: process.env.GIT_VERSION,
};




/**
 * Entry point.
 */
run(async () => {
    const title = document.getElementsByTagName("title").item(0);
    if (title) title.innerText = packageInfo.name;

    const mapElement = document.getElementById("map");
    if (mapElement) {
        await setupMap(mapElement);
    }

    console.info(packageInfo.name);
});




/**
 *  Global declaration merge.
 */
declare global {

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window { }

    interface Ctx {
        map: maplibregl.Map;
    }

}
