import React, {type ReactNode} from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): ReactNode {
  return (
    <div
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(17, 17, 20, 0.80)',
        borderBottom: '1px solid rgba(255, 44, 168, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}
    >
      <Navbar {...props} />
    </div>
  );
}
