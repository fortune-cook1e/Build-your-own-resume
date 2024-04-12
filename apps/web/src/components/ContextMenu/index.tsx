import * as React from 'react';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useEventListener,
  Portal,
  Menu,
  MenuButton,
  PortalProps,
  MenuButtonProps,
  MenuProps,
} from '@chakra-ui/react';

export interface ContextMenuProps<T extends HTMLElement> {
  renderMenu: () => JSX.Element | null;
  children: React.ReactNode;
  menuProps?: Omit<MenuProps, 'children'> & { children?: React.ReactNode };
  portalProps?: Omit<PortalProps, 'children'> & { children?: React.ReactNode };
  menuButtonProps?: MenuButtonProps;
}

export function ContextMenu<T extends HTMLElement = HTMLElement>({
  renderMenu,
  children,
  menuButtonProps,
  menuProps,
  portalProps,
}: ContextMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isDeferredOpen, setIsDeferredOpen] = useState(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsRendered(true);
        setTimeout(() => {
          setIsDeferredOpen(true);
        });
      });
    } else {
      setIsDeferredOpen(false);
      const timeout = setTimeout(() => {
        setIsRendered(isOpen);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEventListener('contextmenu', (e) => {
    if (
      targetRef.current?.contains(e.target as any) ||
      e.target === targetRef.current
    ) {
      e.preventDefault();
      setIsOpen(true);
      setPosition([e.pageX, e.pageY]);
    } else {
      setIsOpen(false);
    }
  });

  const onCloseHandler = useCallback(() => {
    menuProps?.onClose?.();
    setIsOpen(false);
  }, [menuProps, setIsOpen]);

  // 使用 React.Children.map 来遍历 children 并为其添加 ref
  const renderChildrenWithRef = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // 使用 cloneElement 将 ref 传递给子组件
      return React.cloneElement<any>(child, { ref: targetRef });
    }
    return child;
  });

  return (
    <>
      {renderChildrenWithRef}
      {isRendered && (
        <Portal {...portalProps}>
          <Menu
            isOpen={isDeferredOpen}
            gutter={0}
            {...menuProps}
            onClose={onCloseHandler}
          >
            <MenuButton
              aria-hidden={true}
              w={1}
              h={1}
              style={{
                position: 'absolute',
                left: position[0],
                top: position[1],
                cursor: 'default',
              }}
              {...menuButtonProps}
            />
            {renderMenu()}
          </Menu>
        </Portal>
      )}
    </>
  );
}
