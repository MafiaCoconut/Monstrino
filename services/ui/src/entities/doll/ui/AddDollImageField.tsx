import { ImagesGallery } from "@/shared/ui/components";
import { Box, Button, IconButton, ImageList, ImageListItem } from "@mui/material"
import { DeleteIcon } from "lucide-react";
import { useState } from "react";

type AddDollImageFieldProps = {
    images: string[];
    handleAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (index: number) => void;
    handleReorderImages: (newOrder: string[]) => void;
}

export const AddDollImageField = ({ images, handleAddImages, handleRemoveImage, handleReorderImages }: AddDollImageFieldProps) => {
    // const [images, setImages] = useState<string[]>([]);
    console.log(images)
    return(
        <Box>
            <Button variant="outlined" component="label">
                Выбрать фотографии
                <input type="file" accept="image/*" multiple hidden onChange={handleAddImages} />
            </Button>


            <ImagesGallery images={images} onRemove={handleRemoveImage} onReorder={handleReorderImages} />
        </Box>
    )
}