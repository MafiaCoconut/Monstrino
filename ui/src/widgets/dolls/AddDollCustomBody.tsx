import { AddDollImageField, AddDollTextField } from "@/shared/ui/dolls"
import { Box, Stack } from "@mui/material"
import { DollFormData } from "./AddDollModal";
import { ChangeEvent } from 'react';

type AddDollCustomBodyProps = {
    handleSubmit: () => void;
    formData: DollFormData;
    setFormData: (name: string, value: string | number | string[]) => void;
}
export const AddDollCustomBody = ({ handleSubmit, formData, setFormData }: AddDollCustomBodyProps) => {

        const handleDollNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData('name', e.target.value);

    }
    
    const handleDollCharacterChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData('character', e.target.value);
    }

    const handleDollSeriesChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData('series', e.target.value);
    }
    
    const handleDollYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData('year', Number(e.target.value));
    }

    const handleAddDollImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const readers = files.map(file => {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });
        });

        Promise.all(readers).then((newImages) => {
            setFormData('images', [...formData.images, ...newImages]);
        });
    };

    const handleRemoveImage = (index: number) => {
        setFormData('images', [...formData.images, ...newImages]);

        setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleReorderImages = (newOrder: string[]) => {
      setFormData(prev => ({
        ...prev,
        images: newOrder,
      }))
    }


    const handleDollDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            description: e.target.value
        }));
    };

    return (
        <Box onSubmit={handleSubmit} sx={{ mt: 2 }}>

            <AddDollTextField name={'name'} label={'Doll Name'} value={formData.name} onChange={handleDollNameChange} placeholder={'e.g., Draculaura, Clawdeen Wolf'} />
            <AddDollTextField name={'character'} label={'Character Type'} value={formData.character} onChange={handleDollCharacterChange} placeholder={'e.g., Vampire, Werewolf, Zombie'} />
            
            <Stack direction="row" spacing={1} width="100%">
                <AddDollTextField sx={{width: "50%"}} name={'series'} label={'Series'} value={formData.series} onChange={handleDollSeriesChange} placeholder={'e.g., Original, G3'} />
                <AddDollTextField sx={{width: "50%"}} name={'year'} label={'Year'} value={formData.year} onChange={handleDollYearChange} placeholder={'e.g., 2020'} />
            </Stack>

            <AddDollImageField images={formData.images} handleAddImages={handleAddDollImageChange} handleRemoveImage={handleRemoveImage} handleReorderImages={handleReorderImages}/>
            <AddDollTextField name={'description'} label={'Description'} value={formData.description} onChange={handleDollDescriptionChange} placeholder={'Special details about this doll...'} multiline rows={3} />

        </Box>
    )
}