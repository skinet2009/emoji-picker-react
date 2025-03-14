import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react';

import {
  useDefaultSkinToneConfig,
  useReactionsOpenConfig
} from '../../config/useConfig';
import { DataEmoji } from '../../dataUtils/DataTypes';
import { alphaNumericEmojiIndex } from '../../dataUtils/alphaNumericEmojiIndex';
import { useDebouncedState } from '../../hooks/useDebouncedState';
import { useDisallowedEmojis } from '../../hooks/useDisallowedEmojis';
import { FilterDict } from '../../hooks/useFilter';
import { useMarkInitialLoad } from '../../hooks/useInitialLoad';
import { SkinTones } from '../../types/exposedTypes';

export function PickerContextProvider({ children }: Props) {
  const disallowedEmojis = useDisallowedEmojis();
  const defaultSkinTone = useDefaultSkinToneConfig();
  const reactionsDefaultOpen = useReactionsOpenConfig();

  // Initialize the filter with the inititial dictionary
  const filterRef = useRef<FilterState>(alphaNumericEmojiIndex);
  const disallowClickRef = useRef<boolean>(false);
  const disallowMouseRef = useRef<boolean>(false);
  const disallowedEmojisRef = useRef<Record<string, boolean>>(disallowedEmojis);

  const suggestedUpdateState = useDebouncedState(Date.now(), 200);
  const searchTerm = useDebouncedState('', 100);
  const skinToneFanOpenState = useState<boolean>(false);
  const activeSkinTone = useState<SkinTones>(defaultSkinTone);
  const activeCategoryState = useState<ActiveCategoryState>(null);
  const emojisThatFailedToLoadState = useState<Set<string>>(new Set());
  const emojiVariationPickerState = useState<DataEmoji | null>(null);
  const reactionsModeState = useState(reactionsDefaultOpen);
  const [isPastInitialLoad, setIsPastInitialLoad] = useState(false);

  useMarkInitialLoad(setIsPastInitialLoad);

  return (
    <PickerContext.Provider
      value={{
        activeCategoryState,
        activeSkinTone,
        disallowClickRef,
        disallowMouseRef,
        disallowedEmojisRef,
        emojiVariationPickerState,
        emojisThatFailedToLoadState,
        filterRef,
        isPastInitialLoad,
        searchTerm,
        skinToneFanOpenState,
        suggestedUpdateState,
        reactionsModeState
      }}
    >
      {children}
    </PickerContext.Provider>
  );
}

type ReactState<T> = [T, Dispatch<SetStateAction<T>>];

const PickerContext = createContext<{
  searchTerm: [string, (term: string) => Promise<string>];
  suggestedUpdateState: [number, (term: number) => void];
  activeCategoryState: ReactState<ActiveCategoryState>;
  activeSkinTone: ReactState<SkinTones>;
  emojisThatFailedToLoadState: ReactState<Set<string>>;
  isPastInitialLoad: boolean;
  emojiVariationPickerState: ReactState<DataEmoji | null>;
  skinToneFanOpenState: ReactState<boolean>;
  filterRef: MutableRefObject<FilterState>;
  disallowClickRef: MutableRefObject<boolean>;
  disallowMouseRef: MutableRefObject<boolean>;
  disallowedEmojisRef: MutableRefObject<Record<string, boolean>>;
  reactionsModeState: ReactState<boolean>;
}>({
  activeCategoryState: [null, () => {}],
  activeSkinTone: [SkinTones.NEUTRAL, () => {}],
  disallowClickRef: { current: false },
  disallowMouseRef: { current: false },
  disallowedEmojisRef: { current: {} },
  emojiVariationPickerState: [null, () => {}],
  emojisThatFailedToLoadState: [new Set(), () => {}],
  filterRef: { current: {} },
  isPastInitialLoad: true,
  searchTerm: ['', () => new Promise<string>(() => undefined)],
  skinToneFanOpenState: [false, () => {}],
  suggestedUpdateState: [Date.now(), () => {}],
  reactionsModeState: [false, () => {}]
});

type Props = Readonly<{
  children: ReactNode;
}>;

export function useFilterRef() {
  const { filterRef } = useContext(PickerContext);
  return filterRef;
}

export function useDisallowClickRef() {
  const { disallowClickRef } = useContext(PickerContext);
  return disallowClickRef;
}

export function useDisallowMouseRef() {
  const { disallowMouseRef } = useContext(PickerContext);
  return disallowMouseRef;
}

export function useReactionsModeState() {
  const { reactionsModeState } = useContext(PickerContext);
  return reactionsModeState;
}

export function useSearchTermState() {
  const { searchTerm } = useContext(PickerContext);
  return searchTerm;
}

export function useActiveSkinToneState(): [
  SkinTones,
  (skinTone: SkinTones) => void
] {
  const { activeSkinTone } = useContext(PickerContext);
  return activeSkinTone;
}

export function useEmojisThatFailedToLoadState() {
  const { emojisThatFailedToLoadState } = useContext(PickerContext);
  return emojisThatFailedToLoadState;
}

export function useIsPastInitialLoad(): boolean {
  const { isPastInitialLoad } = useContext(PickerContext);
  return isPastInitialLoad;
}

export function useEmojiVariationPickerState() {
  const { emojiVariationPickerState } = useContext(PickerContext);
  return emojiVariationPickerState;
}

export function useSkinToneFanOpenState() {
  const { skinToneFanOpenState } = useContext(PickerContext);
  return skinToneFanOpenState;
}

export function useDisallowedEmojisRef() {
  const { disallowedEmojisRef } = useContext(PickerContext);
  return disallowedEmojisRef;
}

export function useUpdateSuggested(): [number, () => void] {
  const { suggestedUpdateState } = useContext(PickerContext);

  const [suggestedUpdated, setsuggestedUpdate] = suggestedUpdateState;
  return [
    suggestedUpdated,
    function updateSuggested() {
      setsuggestedUpdate(Date.now());
    }
  ];
}

export type FilterState = Record<string, FilterDict>;

type ActiveCategoryState = null | string;
