import type { SxProps, Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

type MergeableSx = SxProps<Theme> | null | undefined | false;
type SxArrayItem = boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);

export const mergeSx = (...items: MergeableSx[]): SxProps<Theme> => {
  const merged: SxArrayItem[] = [];

  items.forEach((item) => {
    if (item == null || item === false) {
      return;
    }

    if (Array.isArray(item)) {
      merged.push(...(item as ReadonlyArray<SxArrayItem>));
      return;
    }

    merged.push(item as SxArrayItem);
  });

  return merged;
};
