import {
  DataGrid, GridColDef, GridRowSelectionModel,
  GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Box, useMediaQuery } from '@mui/material';
import { useOrderStore } from '@/src/store';
import { useEffect, useState } from 'react';
import LabCalculator, { LabItem } from '../../src/services/lab-calculator';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
        <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Cambiar densidad' } }}
        />
        <GridToolbarExport
        slotProps={{ tooltip: { title: 'Exportar datos' } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarQuickFilter /> {/* Agrega la barra de búsqueda */}
    </GridToolbarContainer>
  );
}

const columns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Código',
    editable: false,
    disableColumnMenu: true,
    maxWidth: 110,
    minWidth: 80,
  },
  {
    field: 'name',
    headerName: 'Estudio de Laboratorio',
    editable: false,
    disableColumnMenu: true,
    flex: 380,
  },
  {
    field: 'price',
    headerName: 'Precio',
    type: 'number',
    editable: false,
    disableColumnMenu: true,
    maxWidth: 110,
    minWidth: 80,
  },
];

type LabTableInputParams = {
    rowSelectionModel: GridRowSelectionModel,
}

export default function LabTableDesktop({ rowSelectionModel }: LabTableInputParams) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5, // Valor por defecto
    page: 0,
  });

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isLargeScreen = useMediaQuery('(min-width:1536px)');

  useEffect(() => {
    let newPageSize = 5; // Valor por defecto
    if (isSmallScreen) {
      newPageSize = 4;
    } else if (isLargeScreen) {
      newPageSize = 7;
    }

    setPaginationModel({ ...paginationModel, pageSize: newPageSize });
  }, [isSmallScreen, isLargeScreen]);

  return (
        <div className='w-full h-fit'>
            <DataGrid
                sx={{
                  border: 'none',
                  width: '100%',
                  '& .container--top': {
                    background: 'none',
                  },
                  '& .MuiDataGrid-container--top [role=row]': {
                    backgroundColor: '#e7e5e4',
                    borderBottomWidth: 2,
                    borderBottomColor: '#BFBFBF',
                    borderTopRightRadius: 6,
                    borderTopLeftRadius: 6,
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    // backgroundColor: '#7BF3A4',
                    fontWeight: 700,
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    marginBottom: '8px',
                  },
                  '& .MuiDataGrid-overlayWrapper': {
                    backgroundColor: 'red',
                    height: 100,
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomWidth: 2,
                    borderBottomColor: '#BFBFBF',
                  },
                }}

                rows={LabCalculator.getCurrentLabItems()}


                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData: LabItem[] = LabCalculator.getCurrentLabItems().filter(labItem => selectedIDs.has(labItem.id));
                  useOrderStore.getState().saveSelectedLabItems(selectedRowData);
                  useOrderStore.setState({ preselectedLabItems: selectedRowData, selectedRows: ids });
                }}
                columns={columns}
                rowSelectionModel={rowSelectionModel}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[4, 5, 7]}
                checkboxSelection
                slots={{
                  toolbar: CustomToolbar,
                }}
                localeText={{
                  toolbarDensity: 'Densidad',
                  toolbarExport: 'Exportar',
                  toolbarQuickFilterPlaceholder: 'Buscar',

                  toolbarDensityCompact: 'Compacto',
                  toolbarDensityStandard: 'Estándar',
                  toolbarDensityComfortable: 'Cómodo',
                  toolbarExportCSV: 'Exportar como CSV',
                  toolbarExportPrint: 'Imprimir',
                  noResultsOverlayLabel: 'No se encotraron resultados.',
                  MuiTablePagination: {
                    labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} de ${count === -1 ? `más que ${to}` : count}`,
                    labelRowsPerPage: 'Filas por Página',
                  },
                  footerRowSelected: count => (count !== 1
                    ? `${count.toLocaleString()} estudios seleccionados`
                    : `${count.toLocaleString()} estudio seleccionado`),
                }}
            />
        </div>
  );
}
