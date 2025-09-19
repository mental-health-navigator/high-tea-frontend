import { useWindowSize } from 'usehooks-ts';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useLayout() {
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < breakpoints.md;
  return { isMobile };
}
