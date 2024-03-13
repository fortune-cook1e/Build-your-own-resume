import classNames, { Value } from 'classnames';
import { twMerge } from 'tailwind-merge';

export const mergeTailwindCss = (...inputs: Value[]) =>
  twMerge(classNames(inputs));
