import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset as floatingOffset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react';
import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';

type TooltipProps = {
  children: ReactElement;
  content: ReactNode;
  placement?: Placement;
  offset?: number | [number, number];
  maxWidth?: CSSProperties['maxWidth'];
  className?: string;
};

const setRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  ref.current = value;
};

const mergeRefs = <T,>(...refs: Array<Ref<T> | undefined>) => {
  return (value: T | null) => refs.forEach((ref) => setRef(ref, value));
};

const Tooltip = ({ children, content, placement = 'top', offset = 8, maxWidth, className }: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const middlewareOffset = Array.isArray(offset)
    ? floatingOffset({ crossAxis: offset[0], mainAxis: offset[1] })
    : floatingOffset(offset);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }

    const timeout = window.setTimeout(() => setMounted(false), 150);
    return () => window.clearTimeout(timeout);
  }, [open]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    strategy: 'fixed',
    middleware: [middlewareOffset, flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  if (!isValidElement(children)) {
    return children;
  }

  const childProps = children.props as Record<string, unknown> & { ref?: Ref<HTMLElement> };
  const childRef = childProps.ref;

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({
          ...childProps,
          ref: mergeRefs(refs.setReference, childRef),
        }),
      )}
      {mounted && (
        <FloatingPortal>
          <div
            data-state={open ? 'open' : 'closed'}
            {...getFloatingProps({
              className: ['tooltip', className].filter(Boolean).join(' '),
              ref: refs.setFloating,
              style: { ...floatingStyles, maxWidth },
            })}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
