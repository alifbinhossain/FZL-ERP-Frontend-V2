import { useContext } from 'react';
import { LayoutContext } from '.';

const useLayout = () => {
  return useContext(LayoutContext);
};

export default useLayout;
