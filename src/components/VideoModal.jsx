import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function VideoModal({ open, onClose }) {

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                    outline: 'none',
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255, 0, 0, 0.5)',
                        color: 'white',
                        zIndex: 1,
                        '&:hover': {
                            bgcolor: 'rgba(252, 0, 0, 1)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '57%',
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: 1,
                    }}
                >
                    <iframe
                        src="https://share.descript.com/embed/AMSJgV1Q2wf"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                        allowFullScreen
                        title="Video de presentación StyleCloud"
                    />
                </Box>
            </Box>
        </Modal>
    );
}