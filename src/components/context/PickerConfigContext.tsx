import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import { compareConfig } from '../../config/compareConfig';
import {
  basePickerConfig,
  mergeConfig,
  PickerConfig,
  PickerConfigInternal
} from '../../config/config';

type Props = PickerConfig &
  Readonly<{
    children: ReactNode;
  }>;

const ConfigContext = createContext<PickerConfigInternal>(basePickerConfig());

export function PickerConfigProvider({ children, ...config }: Props) {
  const mergedConfig = useSetConfig(config);

  return (
    <ConfigContext.Provider value={mergedConfig}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useSetConfig(config: PickerConfig) {
  const [mergedConfig, setMergedConfig] = useState(() => mergeConfig(config));

  useEffect(() => {
    if (compareConfig(mergedConfig, config)) {
      return;
    }
    setMergedConfig(mergeConfig(config));
    // not gonna...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.customEmojis?.length,
    config.open,
    config.emojiVersion,
    config.reactionsDefaultOpen,
    config.searchPlaceHolder,
    config.searchPlaceholder,
    config.defaultSkinTone,
    config.skinTonesDisabled,
    config.autoFocusSearch,
    config.emojiStyle,
    config.theme,
    config.suggestedEmojisMode,
    config.lazyLoadEmojis,
    config.className,
    config.height,
    config.width,
    config.searchDisabled,
    config.skinTonePickerLocation,
    config.allowExpandReactions
  ]);

  return mergedConfig;
}

export function usePickerConfig() {
  return useContext(ConfigContext);
}
