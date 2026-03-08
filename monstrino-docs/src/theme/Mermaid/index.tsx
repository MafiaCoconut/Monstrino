import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import MermaidOriginal from '@theme-original/Mermaid';
import type {Props} from '@theme/Mermaid';

// Wrap the Mermaid component in BrowserOnly to prevent SSG failures.
// useColorMode (used internally by MermaidRenderer) requires <ColorModeProvider>
// which is not available during server-side static generation.
export default function Mermaid(props: Props): JSX.Element {
  return (
    <BrowserOnly fallback={<div />}>
      {() => <MermaidOriginal {...props} />}
    </BrowserOnly>
  );
}
