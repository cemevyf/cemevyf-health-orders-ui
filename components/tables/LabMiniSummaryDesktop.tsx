import {
  Paper, TableCell, TableHead, TableRow, TableContainer, Table, TableBody,
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import React from 'react';
import { LabItem } from '../../src/services/lab-calculator';
import DeleteLabIconButton from '../buttons/DeleteLabIconButton';

const TableComponents = {
  // @ts-ignore
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props: any) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
  TableHead,
  TableRow,
  // @ts-ignore
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

type LabMiniSummaryInputParams = {
    selectedLabItems: LabItem[],
    deleteSelectedLabItem: Function,
    deleteSelectedRowSelectionModel: Function,
}

export default function LabMiniSummaryDesktop(
  { selectedLabItems, deleteSelectedLabItem, deleteSelectedRowSelectionModel }: LabMiniSummaryInputParams,
) {
  return (
        <div className=' h-80 sm:h-[25rem] 2xl:h-[28rem]'>
            <TableVirtuoso
                style={{
                  height: '100%', width: '100%', backgroundColor: '#f5f5f4', boxShadow: 'none',
                }}
                data={selectedLabItems || []}
                // @ts-ignore
                components={TableComponents}
                fixedHeaderContent={() => (
                    <TableRow style={{ backgroundColor: '#f5f5f4', borderBottom: 2, borderColor: '' }}>
                        <TableCell style={{ width: 90, fontWeight: 'bold' }}>
                            Abreviatura
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>
                            Estudio de Laboratorio
                        </TableCell>
                        <TableCell style={{ width: 90, fontWeight: 'bold' }}>
                            Eliminar
                        </TableCell>
                    </TableRow>
                )}

                itemContent={(index, selectedLabItem) => (
                  <>
                        <TableCell style={{ textAlign: 'center', minHeight: 56 }}>
                            {selectedLabItem.code}
                        </TableCell>
                        <TableCell>
                            {selectedLabItem.name}
                        </TableCell>
                        <TableCell style={{ paddingTop: 8, paddingBottom: 8, textAlign: 'center' }}>
                            <DeleteLabIconButton
                                labItem={selectedLabItem}
                                deleteSelectedLabItem={deleteSelectedLabItem}
                                deleteSelectedRowSelectionModel={deleteSelectedRowSelectionModel}/>
                        </TableCell>
                  </>
                )}
            />

        </div>
  );
}
