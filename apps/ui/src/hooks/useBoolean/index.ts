import { useState } from 'react';

type UseBooleanOutput = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  },
];

export const useBoolean = (): UseBooleanOutput => {
  const [value, setValue] = useState<boolean>(false);

  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((v) => !v);

  return [value, { on, off, toggle }];
};
