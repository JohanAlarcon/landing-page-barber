import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import site from '../config/site';
import { seam } from '../styles/surfaces';
import SectionHeading from './common/SectionHeading';

export default function FAQ() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { faq } = site;
  const [expanded, setExpanded] = useState(0);

  if (faq.items.length === 0) return null;

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 8, md: 13 },
        background: seam(site.colors.background, site.colors.backgroundDeep),
      }}
    >
      <Container maxWidth="md">
        {/* La segunda sección alineada a la izquierda, para que el centrado
            del cierre (CTA) vuelva a significar algo */}
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} align="left" />

        {faq.items.map((item, index) => {
          const isOpen = expanded === index;
          return (
            <Box
              key={item.question}
              component={motion.div}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
            >
              <Accordion
                disableGutters
                elevation={0}
                expanded={isOpen}
                onChange={() => setExpanded(isOpen ? -1 : index)}
                sx={{
                  mb: 1.5,
                  borderRadius: '16px !important',
                  overflow: 'hidden',
                  bgcolor: isOpen ? alpha(green, 0.06) : alpha('#FFFFFF', 0.03),
                  border: `1px solid ${isOpen ? alpha(green, 0.35) : alpha('#FFFFFF', 0.07)}`,
                  transition: 'background-color .3s ease, border-color .3s ease',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <AddRoundedIcon
                      sx={{
                        color: isOpen ? green : 'text.secondary',
                        transition: 'transform .3s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                      }}
                    />
                  }
                  sx={{
                    px: { xs: 2.2, md: 3 },
                    py: { xs: 0.8, md: 1.2 },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'none' },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.08rem' },
                      fontFamily: theme.typography.h1.fontFamily,
                      pr: 2,
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: { xs: 2.2, md: 3 }, pb: 2.5, pt: 0 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.98rem' }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
