import { mergeTailwindCss } from '@/utils/styles';

describe('Test Merge TailwindCss', () => {
  it('add different classname', () => {
    expect(mergeTailwindCss('class1', 'class2')).toBe('class1 class2');
  });

  it('add same classname', () => {
    expect(mergeTailwindCss('class1', 'class1')).toBe('class1 class1');
  });

  it('add same attribute classname', () => {
    expect(mergeTailwindCss('px-1', 'p-3')).toBe('p-3');
  });

  it('override text color', () => {
    expect(mergeTailwindCss('text-white', 'text-black')).toBe('text-black');
  });
});
