import * as React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button,
} from '@mui/material';

interface EmailDialogProps {
    open: boolean;
    onClose: () => void;
    onSend: (email: string) => void;
}

const EmailDialog: React.FC<EmailDialogProps> = ({ open, onClose, onSend }) => {
  const [email, setEmail] = React.useState('');

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSend(email);
    onClose();
  };

  return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
              component: 'form',
              onSubmit: handleSend,
            }}
        >
            <DialogTitle fontWeight={700}>Enviar Correo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Desea enviar la información de la orden al correo?
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Confirmar</Button>
            </DialogActions>
        </Dialog>
  );
};

export default EmailDialog;
