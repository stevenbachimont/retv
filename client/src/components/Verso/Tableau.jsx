
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'element',
        headerName: 'Element',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        width: 150,
        editable: true,
    },

];

const rows = [
    { id: 1, element: '', description: '', quantity: 35 },
    { id: 2, element: '', description: '', quantity: 42 },
    { id: 3, element: '', description: '', quantity: 45 },
    { id: 4, element: '', description: '', quantity: 16 },
    { id: 5, element: '', description: '', quantity: 23 },
    { id: 6, element: '', description: '', quantity: 150 },
    { id: 7, element: '', description: '', quantity: 44 },
    { id: 8, element: '', description: '', quantity: 36 },
    { id: 9, element: '', description: '', quantity: 65 },
];

export default function DataTable() {
    return (

        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>

    );
}
