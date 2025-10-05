import {
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type ImagesGalleryProps = {
  images: string[];
  onRemove: (index: number) => void;
  onReorder: (newOrder: string[]) => void;
};

export const ImagesGallery = ({ images, onRemove, onReorder }: ImagesGalleryProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              overflowY: 'auto',
              py: 1,
            }}
          >
            {images.map((src, index) => (
              <Draggable key={src} draggableId={src} index={index}>
                {(dragProvided) => (
                  <Paper
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    elevation={2}
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 200,
                      flex: '0 0 auto',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={`doll-${index}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => onRemove(index)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
