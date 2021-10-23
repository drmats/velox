/**
 * Application root redux types.
 *
 * @license BSD-2-Clause
 * @copyright Mat. 2020-present
 */

/* eslint-disable @typescript-eslint/ban-types */

import type { Action } from "red-g";
import type {
    Dispatch,
    Middleware as BareMiddleware,
} from "redux";
import type { ThunkAction } from "redux-thunk";

import type { rootReducer } from "./root";




/**
 * Redux root state shape.
 */
export type RootState = ReturnType<typeof rootReducer>;




/**
 * ThunkAction type alias.
 */
export type ThunkType<R = void> = ThunkAction<
    R,
    RootState,
    Ctx,
    Action
>;




/**
 * Application middleware type.
 */
export type Middleware<
    DispatchExt = {},
    S = RootState,
    D extends Dispatch = Dispatch,
> = BareMiddleware<DispatchExt, S, D>;
