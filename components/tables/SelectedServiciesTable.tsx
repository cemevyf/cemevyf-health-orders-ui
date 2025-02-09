import {
  Paper, TableCell, TableHead, TableRow, TableContainer, Table, TableBody,
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import React from 'react';
import LabCalculator, { LabItem } from '../../src/services/lab-calculator';

const TableComponents = {
  // @ts-ignore
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props: any) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
  TableHead,
  TableRow,
  // @ts-ignore
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

type SelectedServiciesTableParams = {
    selectedLabItems: LabItem[],
}

export default function SelectedServiciesTable(
  { selectedLabItems }: SelectedServiciesTableParams,
) {
  return (
        <div className=' h-80 sm:h-[25rem] 2xl:h-[28rem]'>
            <TableVirtuoso
                style={{
                  height: '100%', width: '100%', backgroundColor: '#f5f5f5', boxShadow: 'none',
                }}
                data={selectedLabItems || []}
                // @ts-ignore
                components={TableComponents}
                fixedHeaderContent={() => (
                    <TableRow style={{
                      backgroundColor: '#f5f5f5', fontWeight: 'bold', fontSize: 15, color: '#374151',
                    }}>
                        <TableCell style={{
                          width: 90, textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#374151',
                        }}>
                            Abreviatura
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: 15, color: '#374151' }}>
                            Estudio de Laboratorio
                        </TableCell>
                        <TableCell style={{
                          width: 100, textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#374151',
                        }}>
                            Precio
                        </TableCell>
                    </TableRow>
                )}

                itemContent={(index, selectedLabItem) => (
                  <>
                        <TableCell style={{ textAlign: 'center', height: 57 }}>
                            {selectedLabItem.code}
                        </TableCell>
                        <TableCell>
                            {selectedLabItem.name}
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                            $ {LabCalculator.formatPrice(selectedLabItem.price)}
                        </TableCell>
                  </>
                )}
            />

        </div>
  );
}
