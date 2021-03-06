/**
 * Component reducers.
 *
 * @license BSD-2-Clause
 * @copyright Mat. 2020-present
 */

import type { Action } from "red-g";
import {
    isStringActionType,
    isWithPayload,
    sliceReducer,
} from "red-g";
import produce from "immer";
import { inc } from "@xcmats/js-toolbox/math";

import initState from "~/app/state";
import act from "~/app/actions";




/**
 * App component reducer.
 */
export default sliceReducer(initState) ((slice) => slice
    // full state reset
    .handle(act.RESET, () => initState)

    // immer usage example
    .handle(act.READY, produce((draft) => {
        draft.ready = true;
    }))
    .handle(act.NOT_READY, produce((draft) => {
        draft.ready = false;
    }))

    // regular object composition/decomposition example
    .handle(act.VISIBLE, (state) => ({ ...state, visible: true }))
    .handle(act.HIDDEN, (state) => ({ ...state, visible: false }))
    .handle(act.CLEAR_ERROR, (state) => ({ ...state, error: null }))

    // type-predicate action matcher example (action payload)
    .match(
        (action): action is Action<{ error: string }> =>
            isWithPayload(action) && action.payload.error,
        produce((draft, { error }) => {
            draft.error = error;
        }),
    )

    // global matcher - spawns on all actions
    .match(
        () => true,
        produce((draft) => {
            draft.tick = Date.now();
        }),
    )

    // type-predicate action matcher example (action type)
    .match(
        (action) =>
            isStringActionType(action) && action.type.startsWith("App/"),
        produce((draft) => {
            draft.actionCount = inc(draft.actionCount);
        }),
    ),
);
