import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from "./customStyles";


function StudentsAttendanceTable({data}) {
    const columns = [
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: false,
            format: (row) => row.date.toDate().toDateString(), //format firestor timestamp to date string
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: 'Scanned In',
            selector: (row) => row.in,
            sortable: false,
        },
        {
            name: 'Note',
            selector: (row) => row.note,
            sortable: false,
        },
    ];

    return (
        <div className='container mt-5 border rounded border-gray-200 mb-20'>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
            />
        </div>
    );
}

export default StudentsAttendanceTable;
