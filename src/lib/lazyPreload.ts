import { lazy } from "react";
import type { ComponentType } from "react";

type Module<T> = { default: T };

/**
 * React.lazy with a `preload()`. Once the module is in memory, the lazy
 * factory hands React a thenable that resolves synchronously, so the first
 * render that uses it does not suspend (React.lazy reads the result as soon
 * as `then` calls back). main.tsx preloads the current route this way before
 * the first render, so the prerendered HTML is replaced by the real page
 * rather than by an empty Suspense fallback.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyPreload<T extends ComponentType<any>>(load: () => Promise<Module<T>>) {
  let mod: Module<T> | undefined;
  let pending: Promise<Module<T>> | undefined;
  const preload = () => (pending ??= load().then((m) => (mod = m)));
  const Component = lazy(() =>
    mod ? ({ then: (resolve: (m: Module<T>) => void) => resolve(mod as Module<T>) } as unknown as Promise<Module<T>>) : preload()
  );
  return Object.assign(Component, { preload });
}
