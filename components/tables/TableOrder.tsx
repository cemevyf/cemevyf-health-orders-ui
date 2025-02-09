import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Preview, EditNote, Mail } from '@mui/icons-material';

function createData(
  id: string,
  date: string,
  state: string,
  patientName: string,
  patientDoc: string,
) {
  return {
    id, date, state, patientName, patientDoc,
  };
}

const rows = [
  createData('OE0000001', 'Oct 20, 2024, 8:12am', 'Generado', 'Bart Jey Simpson', 'DNI - 45.395.025'),
  createData('OE0000002', 'Oct 20, 2024, 8:19am', 'Generado', 'Homero Jey Simpson', 'DNI - 30.365.001'),
  createData('OE0000003', 'Oct 31, 2024, 10:41am', 'Generado', 'Ned Flanders', 'DNI - 38.378.221'),
];

export default function TableOrder() {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#D9D9D9', borderBottom: 2, borderBottomColor: '#BFBFBF' }}>
          <TableRow>
            <TableCell><b>ID Orden</b></TableCell>
            <TableCell align="center"><b>Fecha y Hora</b></TableCell>
            <TableCell align="center"><b>Estado de Orden</b></TableCell>
            <TableCell align="center"><b>Nombre de Paciente</b></TableCell>
            <TableCell align="center"><b>Documento del Paciente</b></TableCell>
            <TableCell align="center"><b>Opciones</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{ borderBottom: 2, borderBottomColor: '#BFBFBF', '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.state}</TableCell>
              <TableCell align="center">{row.patientName}</TableCell>
              <TableCell align="center">{row.patientDoc}</TableCell>
              <TableCell align="center">
                <div className='flex justify-end gap-6 text-negro-medio px-2'>
                    <Preview/>
                    <EditNote/>
                    <Mail/>
                </div>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
