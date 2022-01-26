/**
 * MapGL component middleware.
 *
 * @license BSD-2-Clause
 * @copyright Mat. 2021-present
 */

import type { Action } from "red-g";
import { isWithPayload } from "red-g";
import throttle from "lodash.throttle";

import { appMemory } from "~/root/memory";
import type {
    Middleware,
    ThunkType,
} from "~/store/types";
import type { MapViewport } from "~/map/types";
import {
    selectSpaHashSync,
    selectViewport,
} from "~/map/selectors";
import { mapViewportToHashString } from "~/map/functions";
import { SPA_HASH_UPDATE_TRESHOLD } from "~/map/constants";




/**
 * Throtled SPA hash state updates.
 */
const replaceSpaHash = throttle(
    (rsh: (h: string) => ThunkType, v: MapViewport) =>
        rsh(mapViewportToHashString(v)),
    SPA_HASH_UPDATE_TRESHOLD,
);




/**
 * MapGL middleware.
 */
export default function createMapGLMiddleware (): Middleware {

    // ...
    return ({ getState }) => (next) => (action: Action) => {

        const { act, tnk } = appMemory();
        const state = getState();
        const spaHashSyncEnabled = selectSpaHashSync(state);
        const result = next(action);

        // change SPA hash on each 'SET_VIEWPORT' action dispatch
        // (if that functionality is enabled with 'spaHashSync' flag)
        if (
            spaHashSyncEnabled &&
            action.type === act.map.SET_VIEWPORT.type &&
            isWithPayload(action)
        ) {

            replaceSpaHash(tnk.router.replaceSPAHash, action.payload.viewport);

        } else if (
            action.type === act.map.SET_SPA_HASH_SYNC.type &&
            isWithPayload(action)
        ) {

            if (!spaHashSyncEnabled && action.payload.spaHashSync) {
                tnk.router.replaceSPAHash(
                    mapViewportToHashString(selectViewport(state)),
                );
            } else if (spaHashSyncEnabled && !action.payload.spaHashSync) {
                tnk.router.replaceSPAHash("");
            }

        }

        return result;

    };

}
