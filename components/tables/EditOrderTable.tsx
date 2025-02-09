import {
  DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModes, GridRowModesModel, GridRowSelectionModel,
  GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useOrderStore } from '@/src/store';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import OrderFacade from '@/src/services/order-facade';
import { toast } from 'react-toastify';
import { getNextStatus, getOrderStatusName } from '@/src/services/client-service';
import EmailDialog from '../dialog/EmailDialog';
import UpdateStatusDialog from '../dialog/UpdateStatusDialog';


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
        <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}


export default function EditOrderTable() {
  const orderFacade = new OrderFacade();
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>('');


  // Para obtener las ordenes al cargar la página
  const fetchOrders = async () => {
    try {
      const response = await orderFacade.getOrders();
      if (typeof response !== 'string') {
        useOrderStore.setState({ allOrders: response.data });
      } else {
        toast.error(`Error al obtener las ordenes: ${response}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al obtener las ordenes: ${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orders = useOrderStore(state => state.allOrders);
  const rows = orders.map(order => ({
    ...order,
    id: order.id,
    orderId: order.id,
    status: getOrderStatusName(order.status),
    currency: order.currency,
    totalAmount: `$ ${order.totalAmount}`,
    createdAt: new Date(order.createdAt).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    executedAt: order.executedAt
      ? new Date(order.executedAt).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      : '',
    client: order.client
      ? `${order.client.lastName}, ${order.client.firstName}`
      : '',
  }));


  // FUNCIONES para el DataGrid
  const handleSelectionChange = (newSelectionModel: GridRowSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  // Para mostrar el editar la fila, de momento no esta implementado la llamada a la API
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  // Para enviar el correo y mostrar el dialogo de confirmación
  const handleOpenEmailDialog = (id: GridRowId) => {
    setSelectedOrderId(id.toString());
    setOpenEmailDialog(true);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setSelectedOrderId(null);
  };

  const handleSendEmail = (email: string) => {
    if (selectedOrderId) {
      // Lógica para enviar el correo
      console.log(`Enviando correo a ${email} con la información de la orden ${selectedOrderId}`);
    }
  };

  // Para mostrar el dialogo de confirmación de actualización de estado
  const handleOpenUpdateStatusDialog = async (id: GridRowId) => {
    setSelectedOrderId(id.toString());

    const result = await orderFacade.getOrderStatusById(id.toString());
    if (result.success) {
      const currentStatus = result.response;
      const newStatus = getNextStatus(currentStatus);

      setCurrentStatus(currentStatus);
      setNewStatus(newStatus);
      setOpenUpdateStatusDialog(true);
    } else {
      toast.error(result.response);
    }
  };

  const handleCloseUpdateStatusDialog = () => {
    setOpenUpdateStatusDialog(false);
    setSelectedOrderId(null);
  };

  const handleConfirmUpdateStatus = async () => {
    try {
      if (!selectedOrderId) {
        throw new Error('No se ha seleccionado ninguna orden');
      } else {
        const result = await orderFacade.updateOrderStatus(selectedOrderId);
        if (result.success) {
          toast.success(result.response);
          await fetchOrders();
        } else {
          toast.error(result.response);
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al actualizar el estado de la orden: ${errorMessage}`);
    } finally {
      handleCloseUpdateStatusDialog();
    }
  };


  const columns: GridColDef[] = [
    {
      field: 'orderId',
      headerName: 'ID',
      width: 90,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 90,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'currency',
      headerName: 'Moneda',
      width: 90,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalAmount',
      headerName: 'Monto Total',
      width: 140,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Fecha Creación',
      flex: 140,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'executedAt',
      headerName: 'Fecha Ejecución',
      flex: 140,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'client',
      headerName: 'Paciente',
      flex: 170,
      editable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Opciones',
      width: 170,
      cellClassName: 'actions',
      getActions: (params) => {
        const { id, row } = params;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                          color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
          ];
        }

        return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        disabled
                        sx={{
                          color: '#363636',
                        }}
                    />,
                    <GridActionsCellItem
                        icon={<UploadFileIcon />}
                        label="Upload Health Order"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        disabled
                        sx={{ color: '#363636' }}
                    />,
                    <GridActionsCellItem
                        icon={<PublishedWithChangesRoundedIcon />}
                        label="Update Status"
                        className="textPrimary"
                        onClick={() => handleOpenUpdateStatusDialog(id)}
                        sx={{ color: '#363636' }}
                        disabled={params.row.status === 'Resultados Realizados'}
                    />,
                    <GridActionsCellItem
                        icon={<EmailRoundedIcon />}
                        label="Send Email"
                        className="textPrimary"
                        onClick={() => handleOpenEmailDialog(id)}
                        sx={{ color: '#363636' }}
                    />,
        ];
      },
    },
  ];

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
                    fontWeight: 700,
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    marginBottom: '8px',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomWidth: 2,
                    borderBottomColor: '#BFBFBF',
                  },
                }}
                rows={rows}
                autosizeOnMount= {true}
                columns={columns}
                paginationModel={{ pageSize: 10, page: 0 }} // Valor por defecto
                pagination={true}
                pageSizeOptions={[4, 7, 10]}
                onRowSelectionModelChange={handleSelectionChange}
                checkboxSelection
                rowSelectionModel={selectionModel}
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
                    ? `${count.toLocaleString()} ordenes seleccionadas`
                    : `${count.toLocaleString()} orden seleccionada`),
                }}
            />

            <EmailDialog open={openEmailDialog} onClose={handleCloseEmailDialog} onSend={handleSendEmail} />

            <UpdateStatusDialog
                open={openUpdateStatusDialog}
                onClose={handleCloseUpdateStatusDialog}
                onConfirm={handleConfirmUpdateStatus}
                orderId={selectedOrderId}
                currentStatus={currentStatus}
                newStatus={newStatus}
            />
        </div>
  );
}

function getOrderStatusById(id: GridRowId) {
  throw new Error('Function not implemented.');
}
