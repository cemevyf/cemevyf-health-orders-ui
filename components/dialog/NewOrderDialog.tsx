import * as React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography,
} from '@mui/material';

interface NewOrderDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    clientName: string;
    numberOfStudies: number;
    totalAmount: string;
}

const NewOrderDialog: React.FC<NewOrderDialogProps> = ({
  open, onClose, onConfirm, clientName, numberOfStudies, totalAmount,
}) => (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle fontWeight={700}>Generar Cotización</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Desea generar la cotización de la orden de laboratorio para el cliente{' '}
                    <Typography component="span" color="primary" fontWeight={700}>
                        {clientName}
                    </Typography>
                    {' '}por{' '}
                    <Typography component="span" color="primary" fontWeight={700}>
                        {numberOfStudies} estudios de laboratorio
                    </Typography>
                    {' '}por un total de{' '}
                    <Typography component="span" color="primary" fontWeight={700}>
                        ${totalAmount}
                    </Typography>
                    ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
);

export default NewOrderDialog;
