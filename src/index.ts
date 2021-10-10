/**
 * Velox.
 *
 * @license BSD-2-Clause
 * @copyright Mat. 2021-present
 */

/* eslint-disable no-console */

import { run } from "@xcmats/js-toolbox/utils";
import { useMemory as useBareMemory } from "mem-box";
import packageInfo from "../package.json";
import "maplibre-gl/dist/maplibre-gl.css";




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

    return map;
};




/**
 * ...
 */
run(async () => {
    const title = document.getElementsByTagName("title").item(0);
    if (title) title.innerText = packageInfo.name;

    const mapElement = document.getElementById("map");
    if (mapElement) {
        await setupMap(mapElement);
    }

    window.velox.version = packageInfo.version;
    console.info(packageInfo.name);
});




/**
 *  Global declaration merge.
 */
declare global {

    interface Window {
        velox: Record<string, unknown>;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Ctx { }

}
