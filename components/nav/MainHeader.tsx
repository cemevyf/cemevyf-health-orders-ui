'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { memo, useMemo, useState } from 'react';
import logo from '@/src/public/logo-cemevyf-2024.webp';
import { Box, Modal, Typography } from '@mui/material';
import BlueButton from '../buttons/BlueButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const MainHeader = memo(() => {
  const navItems = useMemo(() => ([
    { name: 'Nueva Orden', slug: 'new-order' },
    { name: 'Buscar Orden', slug: 'search-order' },
    { name: 'Buscar Cliente', slug: 'search-client' },
  ]), []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
        <div className='bg-gray-50 max-h-24 py-2 border-b-2 border-gris-claro'>
            <div className='flex flex-row   mx-auto w-11/12 md:max-w-7xl sm:justify-between items-center'>
                <div className="flex flex-row gap-2 md:gap-5">
                    <Link href="/" className="w-16 h-16 relative">
                        <Image
                        priority
                        fill
                        src={logo}
                        alt="Logo"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                    </Link>

                    <nav className="flex gap-3 lg:gap-4 my-auto">
                        {navItems.map(item => (
                        <Link
                            key={item.slug}
                            className="text-sm lg:text-base w-20 sm:w-fit text-wrap font-semibold uppercase text-negro-opaco hover:text-azul hover:underline focus:text-azul focus:underline"
                            href={`/${item.slug}`}
                        >
                            {item.name}
                        </Link>
                        ))}
                    </nav>
                </div>

                <div>
                    <BlueButton sx={{ fontSize: 14, display: { xs: 'none', sm: 'block' } }}
                        onClick={handleOpen}
                    >Versión: {process.env.NEXT_PUBLIC_APP_VERSION} </BlueButton>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={700}>
                    Información de la aplicación CEMEVYF
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Sistema para la gestion de Ordenes de Laboratorio y clientes.
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        Versión: {process.env.NEXT_PUBLIC_APP_VERSION}
                    </Typography>
                    <Typography>
                        Ultima Actualizacion de Precios: Octubre 2024
                    </Typography>
                </Box>
            </Modal>
        </div>
  );
});

export default MainHeader;
