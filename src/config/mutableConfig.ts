import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useRef
} from 'react';

import { MouseDownEvent, OnSkinToneChange } from './config';

export type MutableConfig = {
  onEmojiClick?: MouseDownEvent;
  onReactionClick?: MouseDownEvent;
  onSkinToneChange?: OnSkinToneChange;
};

export const MutableConfigContext = createContext<
  MutableRefObject<MutableConfig>
>({} as MutableRefObject<MutableConfig>);

export function useMutableConfig(): MutableRefObject<MutableConfig> {
  return useContext(MutableConfigContext);
}

export function useDefineMutableConfig(
  config: MutableConfig
): MutableRefObject<MutableConfig> {
  const MutableConfigRef = useRef<MutableConfig>({
    onEmojiClick: config.onEmojiClick || emptyFunc,
    onReactionClick: config.onReactionClick || config.onEmojiClick,
    onSkinToneChange: config.onSkinToneChange || emptyFunc
  });

  useEffect(() => {
    MutableConfigRef.current.onEmojiClick = config.onEmojiClick || emptyFunc;
    MutableConfigRef.current.onReactionClick =
      config.onReactionClick || config.onEmojiClick;
  }, [config.onEmojiClick, config.onReactionClick]);

  useEffect(() => {
    MutableConfigRef.current.onSkinToneChange =
      config.onSkinToneChange || emptyFunc;
  }, [config.onSkinToneChange]);

  return MutableConfigRef;
}

function emptyFunc() {}
