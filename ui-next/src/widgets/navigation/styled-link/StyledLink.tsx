'use client';

import { ReactNode, CSSProperties } from 'react';
import { useNavigate } from '@/shared/router';
import { Link } from '@mui/material';

interface StyledLinkProps {
  to: string;
  children: ReactNode;
  style?: CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const StyledLink = ({
  to,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
}: StyledLinkProps) => {
  const navigate = useNavigate();

  return (
    <Link
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
};
