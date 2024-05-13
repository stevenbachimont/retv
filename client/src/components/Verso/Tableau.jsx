import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

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

export default function DataTable() {
    const [rows, setRows] = useState([]);
    const [dataPosted, setDataPosted] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/verso-data')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRows(data);
                setDataPosted(false);
            });
    }, [dataPosted]);

    const handleEditCellChangeCommitted = React.useCallback(
        ({ id, field, props }) => {
            const data = props; // New value
            setRows((oldRows) => {
                return oldRows.map((row) => {
                    if (row.id === id) {
                        return { ...row, [field]: data.value };
                    }
                    return row;
                });
            });
        },
        []
    );
    const handlePostClick = () => {
        fetch('http://localhost:3001/api/verso-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rows),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setDataPosted(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onEditCellChangeCommitted={handleEditCellChangeCommitted}
            />
            <Button variant="contained" color="primary" onClick={handlePostClick}>
                Post
            </Button>
        </div>
    );
}