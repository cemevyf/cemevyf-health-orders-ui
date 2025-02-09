import * as React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography,
} from '@mui/material';
import { getOrderStatusName } from '@/src/services/client-service';

interface UpdateStatusDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderId: string | null;
    currentStatus: string;
    newStatus: string;
}

const UpdateStatusDialog: React.FC<UpdateStatusDialogProps> = ({
  open, onClose, onConfirm, orderId, currentStatus, newStatus,
}) => (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle fontWeight={700}>Actualizar Estado</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Desea actualizar el estado de la orden #{orderId} de{' '}
                    <Typography component="span" color="primary" fontWeight={700}>
                        {getOrderStatusName(currentStatus)}
                    </Typography>
                    {' '}a{' '}
                    <Typography component="span" color="primary" fontWeight={700}>
                        {getOrderStatusName(newStatus)}
                    </Typography>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} color="primary">Confirmar</Button>
            </DialogActions>
        </Dialog>
);

export default UpdateStatusDialog;
