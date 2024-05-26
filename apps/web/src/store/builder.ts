import { PanelOnResize } from 'react-resizable-panels';
import { create } from 'zustand';

interface Panel {
  size: number;
  setSize: PanelOnResize;
  handler: Hanlder;
}

interface Hanlder {
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
}

interface BuilderActions {
  setFullscreen: (fullScreen: boolean) => void;
}

interface BuilderStore {
  iframe: {
    ref: HTMLIFrameElement | null;
    setRef: (ref: HTMLIFrameElement | null) => void;
  };
  panel: {
    left: Panel;
    right: Panel;
  };
  fullScreen: boolean;
}

export const useBuilderStore = create<BuilderStore & BuilderActions>()(
  (set) => ({
    iframe: {
      ref: null,
      setRef: (ref) => {
        set((state) => ({ iframe: { ...state.iframe, ref } }));
      },
    },
    panel: {
      left: {
        size: 0,
        setSize: (size: number) =>
          set((state) => ({
            panel: {
              right: state.panel.right,
              left: { ...state.panel.left, size },
            },
          })),
        handler: {
          isDragging: false,
          setDragging: (dragging) =>
            set((state) => ({
              panel: {
                ...state.panel,
                left: {
                  ...state.panel.left,
                  handler: {
                    ...state.panel.left.handler,
                    isDragging: dragging,
                  },
                },
              },
            })),
        },
      },
      right: {
        size: 0,
        setSize: (size: number) => {
          set((state) => ({
            panel: {
              left: state.panel.left,
              right: { ...state.panel.right, size },
            },
          }));
        },
        handler: {
          isDragging: false,
          setDragging: (dragging) =>
            set((state) => ({
              panel: {
                ...state.panel,
                right: {
                  ...state.panel.right,
                  handler: {
                    ...state.panel.right.handler,
                    isDragging: dragging,
                  },
                },
              },
            })),
        },
      },
      fullscreen: false,
    },
    fullScreen: false,
    setFullscreen: (fullScreen) => set({ fullScreen }),
  }),
);
