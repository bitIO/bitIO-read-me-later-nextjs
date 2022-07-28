import { Box } from '@mantine/core';

import { CanvasAttributes } from './types';

interface ComponentPreviewProps {
  children: React.ReactNode;
  canvas: CanvasAttributes['canvas'];
  withSpacing?: boolean;
}

export function ComponentPreview({ children, canvas, withSpacing = false }: ComponentPreviewProps) {
  return (
    <Box
      sx={{
        marginLeft: canvas?.center ? 'auto' : 'unset',
        marginRight: canvas?.center ? 'auto' : 'unset',
        maxWidth: canvas?.maxWidth || '100%',
        paddingTop: canvas?.maxWidth && withSpacing ? 40 : 0,
      }}
    >
      {children}
    </Box>
  );
}
