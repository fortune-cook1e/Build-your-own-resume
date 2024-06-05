import { useBoardStore } from '@/store/board';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import webFontLoader from 'webfontloader';

const Board = () => {
  const metadata = useBoardStore((state) => state.resume.metadata);
  const font = metadata.page.font;

  const fontFamily = useMemo(() => {
    return `${font.family}:${font.variants.join(',')}:${font.subset}`;
  }, [font.variants, font.subset, font.family]);

  useEffect(() => {
    webFontLoader.load({
      google: {
        families: [fontFamily],
      },
    });
  }, [fontFamily]);

  useEffect(() => {
    // page
    document.documentElement.style.setProperty(
      'line-height',
      `${metadata.page.font.lineHeight}`,
    );
    document.documentElement.style.setProperty(
      '--spacing',
      `${metadata.page.spacing}px`,
    );
    document.documentElement.style.setProperty(
      '--line-height',
      `${metadata.page.font.lineHeight}`,
    );

    document.documentElement.style.setProperty(
      'font-size',
      `${metadata.page.font.size}px`,
    );

    // theme
    document.documentElement.style.setProperty(
      '--color-primary',
      `${metadata.theme.primaryColor}`,
    );

    document.documentElement.style.setProperty(
      '--color-text',
      `${metadata.theme.textColor}`,
    );

    document.documentElement.style.setProperty(
      '--color-background',
      `${metadata.theme.backgroundColor}`,
    );
  }, [metadata]);

  // useEffect(() => {
  //   document.querySelectorAll(`[data-page]`).forEach((el) => {
  //     el.classList.toggle('underline-links', true);
  //   });
  // }, [metadata]);

  return <Outlet />;
};

export default Board;
