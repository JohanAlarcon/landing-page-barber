import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { handleDemoClick } from '../helpers';

const navItems = [
    { label: 'Inicio', id: '#hero' },
    { label: 'Características', id: '#features' },
    { label: 'Beneficios', id: '#benefits' },
    { label: 'Precios', id: '#pricing' },
    { label: 'FAQ', id: '#faq' },
];

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleScrollTo = (id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileOpen(false);
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', bgcolor: 'background.default', pt: 4 }}>
            <Typography variant="h5" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
                StyleCloudBarber
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} button onClick={() => handleScrollTo(item.id)}>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                sx: {
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    textAlign: 'center'
                                }
                            }}
                        />
                    </ListItem>
                ))}
                <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleDemoClick}
                    >
                        Ver Demo
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar
            component={motion.nav}
            position="fixed"
            elevation={scrolled ? 4 : 0}
            sx={{
                backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.3s ease',
                borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
                py: scrolled ? 0.5 : 2
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo Desktop */}
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                            color: 'text.primary',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleScrollTo('#hero')}
                    >
                        StyleCloud<Box component="span" sx={{ color: 'primary.main' }}>Barber</Box>
                    </Typography>

                    {/* Desktop Menu */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                onClick={() => handleScrollTo(item.id)}
                                sx={{
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDemoClick}
                            sx={{ ml: 2 }}
                        >
                            Ver Demo
                        </Button>
                    </Box>

                    {/* Mobile Menu Button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>

            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
}
