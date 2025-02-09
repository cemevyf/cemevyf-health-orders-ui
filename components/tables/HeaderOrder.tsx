import {
    EditRounded,
    PublishedWithChangesRounded,
    EmailRounded,
} from '@mui/icons-material';
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function HeaderOrder() {
  return (
    <div className='flex justify-between px-10'>
        <h1 className='text-negro-medio font-bold text-xl uppercase'>Datos de la orden de estudios:</h1>
        <div className='flex gap-6'>
            <div className='flex gap-2 text-negro-claro'>
                <EditRounded/>
                <p>Editar información</p>
            </div>
            <div className='flex gap-2 text-negro-claro'>
                <UploadFileIcon/>
                <p>Adjuntar Receta</p>
            </div>
            <div className='flex gap-2 text-negro-claro'>
                <PublishedWithChangesRounded/>
                <p>Actualizar Estado</p>
            </div>
            <div className='flex gap-2 text-negro-claro'>
                <EmailRounded/>
                <p>Enviar correo</p>
            </div>
        </div>
    </div>
  )
}
