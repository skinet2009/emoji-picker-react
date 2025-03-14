import {
  createContext,
  createRef,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef
} from 'react';

import { focusElement } from '../../DomUtils/focusElement';
import { NullableElement } from '../../DomUtils/selectors';

export function ElementRefContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const PickerMainRef = useRef<HTMLElement>(null);
  const AnchoredEmojiRef = useRef<HTMLElement>(null);
  const BodyRef = useRef<HTMLDivElement>(null);
  const SearchInputRef = useRef<HTMLInputElement>(null);
  const SkinTonePickerRef = useRef<HTMLDivElement>(null);
  const CategoryNavigationRef = useRef<HTMLDivElement>(null);
  const VariationPickerRef = useRef<HTMLDivElement>(null);
  const ReactionsRef = useRef<HTMLUListElement>(null);

  return (
    <ElementRefContext.Provider
      value={{
        AnchoredEmojiRef,
        BodyRef,
        CategoryNavigationRef,
        PickerMainRef,
        SearchInputRef,
        SkinTonePickerRef,
        VariationPickerRef,
        ReactionsRef
      }}
    >
      {children}
    </ElementRefContext.Provider>
  );
}

export type ElementRef<
  E extends HTMLElement = HTMLElement
> = MutableRefObject<E | null>;

type ElementRefs = {
  PickerMainRef: ElementRef;
  AnchoredEmojiRef: ElementRef;
  SkinTonePickerRef: ElementRef<HTMLDivElement>;
  SearchInputRef: ElementRef<HTMLInputElement>;
  BodyRef: ElementRef<HTMLDivElement>;
  CategoryNavigationRef: ElementRef<HTMLDivElement>;
  VariationPickerRef: ElementRef<HTMLDivElement>;
  ReactionsRef: ElementRef<HTMLUListElement>;
};

const ElementRefContext = createContext<ElementRefs>({
  AnchoredEmojiRef: createRef(),
  BodyRef: createRef(),
  CategoryNavigationRef: createRef(),
  PickerMainRef: createRef(),
  SearchInputRef: createRef(),
  SkinTonePickerRef: createRef(),
  VariationPickerRef: createRef(),
  ReactionsRef: createRef()
});

function useElementRef() {
  return useContext(ElementRefContext);
}

export function usePickerMainRef() {
  return useElementRef()['PickerMainRef'];
}

export function useAnchoredEmojiRef() {
  return useElementRef()['AnchoredEmojiRef'];
}

export function useSetAnchoredEmojiRef(): (target: NullableElement) => void {
  const AnchoredEmojiRef = useAnchoredEmojiRef();
  return (target: NullableElement) => {
    if (target === null && AnchoredEmojiRef.current !== null) {
      focusElement(AnchoredEmojiRef.current);
    }

    AnchoredEmojiRef.current = target;
  };
}

export function useBodyRef() {
  return useElementRef()['BodyRef'];
}

export function useReactionsRef() {
  return useElementRef()['ReactionsRef'];
}

export function useSearchInputRef() {
  return useElementRef()['SearchInputRef'];
}

export function useSkinTonePickerRef() {
  return useElementRef()['SkinTonePickerRef'];
}

export function useCategoryNavigationRef() {
  return useElementRef()['CategoryNavigationRef'];
}

export function useVariationPickerRef() {
  return useElementRef()['VariationPickerRef'];
}
