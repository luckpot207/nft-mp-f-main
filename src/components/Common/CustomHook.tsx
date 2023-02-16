import { useEffect } from "react";

const useDevEffect = (cb: Function, deps: Array<any>) => {
  let ran = false;
  useEffect((): any => {
    if (ran) return;
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => (ran = true);
  }, deps);
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const useOnceEffect = isDev ? useDevEffect : useEffect;