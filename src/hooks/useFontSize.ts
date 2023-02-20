interface FontSizeHookResult {
  xxl: string
  xl: string
  lg: string
  md: string
  smd: string
  sm: string
  xs: string
}

export const useFontSize = (): FontSizeHookResult => {
  const xxl = '50px';
  const xl = '40px';
  const lg = '35px';
  const md = '30px';
  const smd = '25px';
  const sm = '20px';
  const xs = '15px';
  return {
    xxl,
    xl,
    lg,
    md,
    smd,
    sm,
    xs
  };
};