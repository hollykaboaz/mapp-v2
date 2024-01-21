import React, {useContext, useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {getStudents} from "./firebase/firestore";
import {CourseContext} from "./CourseContext";
import {CoursesContext} from "./CoursesContext";


const StudentTable = (props) => {


    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Enrollment Status',
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: 'Last Attended Session',
            selector: (row) => row.lastAttendedSession,
            sortable: true,
        },
        {
            name: 'Attendance Grade',
            selector: (row) => row.attendanceGrade,
            sortable: true,
        },
    ];

    return (
        <div className='container mt-5 border rounded-2xl border-gray-200'>
            <DataTable
                columns={columns}
                data={props.data}
                selectableRows
                fixedHeader
                pagination
            />
        </div>
    );
};

export default StudentTable;