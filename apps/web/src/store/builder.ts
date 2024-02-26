import { PanelOnCollapse, PanelOnResize } from 'react-resizable-panels';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Panel {
  size: number;
  setSize: PanelOnResize;
  onCollapse: PanelOnCollapse;
  collapsible: boolean;
  handler: Hanlder;
}

interface Hanlder {
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
}

interface BuilderStore {
  panel: {
    left: Panel;
    right: Panel;
  };
}

export const useBuilderStore = create<BuilderStore>()(
  immer((set) => ({
    panel: {
      left: {
        size: 0,
        setSize(size) {
          set((state) => {
            state.panel.left.size = size;
          });
        },
        collapsible: false,
        onCollapse() {
          set((state) => {
            state.panel.left.collapsible = true;
          });
        },
        handler: {
          isDragging: false,
          setDragging(dragging) {
            set((state) => {
              state.panel.left.handler.isDragging = dragging;
            });
          },
        },
      },
      right: {
        size: 0,
        setSize(size) {
          set((state) => {
            state.panel.right.size = size;
          });
        },
        collapsible: false,
        onCollapse() {
          set((state) => {
            state.panel.right.collapsible = true;
          });
        },
        handler: {
          isDragging: false,
          setDragging(dragging) {
            set((state) => {
              state.panel.right.handler.isDragging = dragging;
            });
          },
        },
      },
    },
  })),
);
