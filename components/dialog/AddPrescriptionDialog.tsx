import * as React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField,
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'react-toastify';
import OrderFacade from '@/src/services/order-facade';

interface AddPrescriptionDialogProps {
    open: boolean;
    onClose: () => void;
    orderId: string;
}

const AddPrescriptionDialog: FC<AddPrescriptionDialogProps> = ({ open, onClose, orderId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleConfirm = async () => {
    console.log(selectedFile, additionalNotes);

    try {
      if (!selectedFile) {
        throw new Error('No se ha seleccionado ningún archivo');
      }

      const orderFacade = new OrderFacade();
      const result = await orderFacade.addPrescription(orderId, selectedFile, additionalNotes);

      if (result.success) {
        toast.success(result.response);
      } else {
        toast.error(result.response);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al adjuntar el archivo: ${errorMessage}`);
    } finally {
      onClose();
    }
  };

  return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Adjuntar Archivo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seleccione un archivo para adjuntar y agregue notas adicionales si es necesario.
                </DialogContentText>
                <input type="file" onChange={handleFileChange} />
                <TextField
                    margin="dense"
                    label="Notas adicionales"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={additionalNotes}
                    onChange={e => setAdditionalNotes(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
  );
};

export default AddPrescriptionDialog;
