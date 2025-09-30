import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Container,
    Stack,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import MenuOpen from '@mui/icons-material/MenuOpen';
import LeftMenu from '../../../widgets/LeftMenu';
import { mockUserData } from '../../../data/mocAppData';
import CreateCollectionModal from '../../../widgets/collections/CreateCollectionModal';
import { CollectionCard, CollectionsPageTitle, CreateCollectionButton } from '@/entities/collection';
import { UserHeader } from '@/widgets/headers';

const UserCollectionsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [collections, setCollections] = useState(mockUserData.collections);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleCreateCollection = (newCollection) => {
        const collection = {
            ...newCollection,
            id: Date.now(),
            dollsCount: 0,
            createdAt: new Date().toISOString()
        };
        setCollections([collection, ...collections]);
        setIsCreateModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', justifyContent: 'center' }}>
            <Grid container spacing={2} alignItems={'center'} direction='column'>
                <Grid size={12}>
                    <UserHeader 
                        data-component="UserProfile"
                        data-section="UserHeader"
                        userData={mockUserData.currentUser} 
                    />
                </Grid>
                <Grid size={12}>
                    <Box
                        component="main"
                        sx={{
                        py: { xs: 2, md: 3 },
                        px: { xs: 1, md: 3 },
                        width: '100%'
                        }}
                    >
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                        spacing={2}
                        sx={{ mb: 3 }}
                        >
                        <CollectionsPageTitle text="My Collections" />
                        <CreateCollectionButton 
                            text="Create Collection"
                            onClick={() => setIsCreateModalOpen(true)} 
                        />
                        </Stack>
                    </Box>
                </Grid>
                <Grid container spacing={2}>
                        {collections.map((collection) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }} key={collection.id}>
                            <CollectionCard collection={collection}/>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
{/* 
                    {/* Collections Grid - Flexible and Responsive 
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        sx={{
                            width: '100%',
                            margin: 0,
                            '& .MuiGrid-item': {
                                paddingLeft: { xs: '8px', md: '12px' },
                                paddingTop: { xs: '8px', md: '12px' }
                            }
                        }}
                    >
                        {collections.map((collection) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
                                key={collection.id}
                                sx={{
                                    display: 'flex',
                                    transition: 'transform 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)'
                                    }
                                }}
                            >
                                <CollectionCard
                                    collection={collection}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Empty State 
                    {collections.length === 0 && (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: { xs: 6, md: 8 },
                                px: { xs: 2, md: 0 }
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 2,
                                    fontSize: { xs: '3rem', md: '4rem' }
                                }}
                            >
                                👻
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    mb: 1,
                                    fontSize: { xs: '1.5rem', md: '1.5rem' }
                                }}
                            >
                                No Collections Yet
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 3,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    maxWidth: '400px',
                                    mx: 'auto'
                                }}
                            >
                                Start building your monster collection today!
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => setIsCreateModalOpen(true)}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'black',
                                    px: { xs: 3, md: 4 },
                                    py: { xs: 1.5, md: 1 },
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(255, 105, 180, 0.3)'
                                    }
                                }}
                            >
                                Create Your First Collection
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box> */}

            <CreateCollectionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateCollection}
            />
        </Box>
    );
};

export default UserCollectionsPage;