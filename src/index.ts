/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} global types definitions
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import "symbol-observable";

/**
 * Set all properties of the given type to optional
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} unsubscribe function
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export interface MoBrixEngineUnsubscribe {
  (): void;
}

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} middleware store adapter
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export interface MoBrixEngineMiddlewareAPI<
  S = any,
  D extends MoBrixEngineDispatch = MoBrixEngineDispatch
> {
  dispatch: D;
  getState(): S;
}

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} standard redux middleware
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export interface Middleware<
  S = any,
  D extends MoBrixEngineDispatch = MoBrixEngineDispatch
> {
  (api: MoBrixEngineMiddlewareAPI<S, D>): (
    next: MoBrixEngineDispatch<MoBrixEngineGenericAction>
  ) => (action: MoBrixEngineGenericAction) => MoBrixEngineGenericAction;
}

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} observable
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineObservable<T> = {
  subscribe: (observer: { next?(value: T): void }) => {
    unsubscribe: MoBrixEngineUnsubscribe;
  };
  [Symbol.observable](): MoBrixEngineObservable<T>;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} standard action
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineAction<T = any> = MoBrixEngineCustomState<{
  type: string;
  payload?: T;
  error?: boolean;
}>;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} generic action
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export interface MoBrixEngineGenericAction extends MoBrixEngineAction {
  [extraProps: string]: any;
}

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} standard action creator
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineActionCreator<T = any> = ((
  ...args
) => MoBrixEngineAction<T>) & {
  type: string;
  match: (action: MoBrixEngineActionCreator) => boolean;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} standard dispatch function
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export interface MoBrixEngineDispatch<
  A extends MoBrixEngineAction = MoBrixEngineGenericAction
> {
  <T extends A>(action: T): T;
}

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} standard store
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export interface MoBrixEngineStore<
  S = any,
  A extends MoBrixEngineAction = MoBrixEngineAction
> {
  dispatch: MoBrixEngineDispatch<A>;

  getState(): MoBrixEngineCustomState<S>;

  subscribe(listener: () => void): MoBrixEngineUnsubscribe;

  replaceReducer(nextReducer: MoBrixEngineReducer<S>): void;

  [Symbol.observable](): MoBrixEngineObservable<S>;
}

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom state
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineCustomState<T extends Record<string, any> = {}> = T &
  Record<string, any>;

/**
 * MoBrix-engine internal global state
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineGlobalState<
  T extends Record<string, any> = {},
  K extends Record<string, any> = {}
> = MoBrixEngineCustomState<
  {
    config: MoBrixEngineConfigState<K>;
  } & T
>;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom trigger, converted into a specific reducer case
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineReducerEffect<T = any> = (
  state: T,
  action: MoBrixEngineAction
) => T;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom reducer cases
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineReducerEffects<T = any> = Record<
  string,
  MoBrixEngineReducerEffect<T>
>;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom reducer
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineReducer<T extends Record<string, any> = {}> = (
  state: T,
  action: MoBrixEngineAction
) => T;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom middleware
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineMiddleware<
  S = any,
  D extends MoBrixEngineDispatch = MoBrixEngineDispatch
> = (
  action: MoBrixEngineAction,
  store: MoBrixEngineMiddlewareAPI
) => any | void;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom reducer config
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineCustomConfig<T = any> = {
  effects?: MoBrixEngineReducerEffects<T>;
  state?: T;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} plugin interaction, to let every plugin interact with each other
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEnginePluginInteraction<
  T extends Record<string, any> = Record<string, any>,
  K extends Record<string, any> = Record<string, any>
> = {
  plugin: string;
  effect: (field: K, config: T) => K;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} configuration parameters
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineConfig<T extends Record<string, any> = {}> =
  MoBrixEngineCustomState<
    {
      appName?: string;

      /** Enable/disable debug mode */
      debug?: boolean;

      /** Redux parameters */
      core?: {
        /** Additional states and reducers to customize internal redux system */
        customize?: MoBrixEngineCustomState<{
          /** Additional parameters that will be included inside config state slice */
          config?: MoBrixEngineCustomState;
        }>;

        /** Custom Mobrix-engine reducers */
        reducers?: Record<string, MoBrixEngineReducer<any>>;

        /** Preloaded initial state */
        preload?: Record<string, any>;

        /** MoBrix-engine middlewares */
        middlewares?: MoBrixEngineMiddleware[];

        /** standard redux middlewares */
        legacyMiddlewares?: Middleware[];

        /** Array of functions, called during {@link https://github.com/CianciarusoCataldo/mobrix-designer MoBrix-designer} plugins init process */
        designerInteractions?: MoBrixEnginePluginInteraction[];
      };

      /** Additional plugins to load */
      plugins?: MoBrixEnginePlugin[];
    } & T
  >;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom callback
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineCallback<
  T extends Record<string, any> = Record<string, any>,
  K extends Record<string, any> = {}
> = (config: MoBrixEngineConfig<K>) => T;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} plugin parameters
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEnginePluginParameters<
  T extends Record<string, any> = {},
  K = any
> = {
  field?: MoBrixEngineCallback<
    {
      name: string;
      content?: MoBrixEngineCustomState<T>;
    },
    T
  >;

  middlewares?: MoBrixEngineCallback<
    {
      middlewares?: MoBrixEngineMiddleware[];
      legacyMiddlewares?: Middleware[];
    },
    T
  >;

  format?: MoBrixEngineCallback<MoBrixEngineConfig<T>, T>;

  interactions?: MoBrixEnginePluginInteraction<MoBrixEngineConfig>[];

  designerInteractions?: MoBrixEnginePluginInteraction[];

  before?: MoBrixEngineParser<T, K>;

  reducer?: MoBrixEngineCallback<
    {
      effects?: MoBrixEngineReducerEffects<K>;
      reducer?: MoBrixEngineReducer;
      slice?: string;
      initialState?: MoBrixEngineCustomState<K>;
    },
    T
  >;

  after?: MoBrixEngineParser<T, K>;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} plugin
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEnginePlugin<
  T extends Record<string, any> = {},
  K = any
> = (() => MoBrixEnginePluginParameters<T, K>) & {
  feature: string;
  match: (pluginToCompare: MoBrixEnginePlugin) => boolean;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} custom config parser
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineParser<T extends Record<string, any> = {}, K = any> = ({
  store,
  config,
}: {
  config: MoBrixEngineConfig<K>;
  store?: MoBrixEngineStore;
} & T) => MoBrixEngineConfig<K>;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} `config` state slice
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type MoBrixEngineConfigState<T extends Record<string, any> = {}> =
  MoBrixEngineCustomState<{ appName: string } & T>;
