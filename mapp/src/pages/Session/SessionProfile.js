import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Html5QrcodeScanner } from "html5-qrcode";
import { faQrcode, faUserGroup, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable';
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../../firebase/firestore';

function SessionProfile({ session, isDarkMode }) {

    const [scanResult, setScanResult] = useState(null);
    const [manualSerialNumber, setManualSerialNumber] = useState('');
    const sessionId = session.id;
    const courseId = session.courseId;
    console.log(sessionId);
    console.log(courseId);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 200,
                height: 200,
            }, fps: 5
        })

        scanner.render(success, error);

        function success(result) {
            setScanResult(result)
        }

        function error(err) {
            console.warn(err)
        }
    }, []);

    const data = [
        {
            id: 1,
            lastName: 'Khawaja',
            firstName: 'Duaa',
            status: 'Not Scanned',
            in: '3:00pm',
            note: 'Left early for event'
        },
        {
            id: 2,
            lastName: 'Moore',
            firstName: 'Amber',
            status: 'Not Scanned',
            in: '3:01pm',
            note: 'Arrived late'
        },
        {
            id: 3,
            lastName: 'Rahman',
            firstName: 'Khales',
            status: 'Not Scanned',
            in: '2:59pm',
            note: ''
        },

    ]

    const handleDeleteSession = async () => {
        try {
            await deleteSession(courseId, sessionId);
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    return (
        <div className='mx-12 py-4'>
            <div className='grid grid-cols-2 gap-2'>
                <div className='grid grid-cols-2 h-fit justify-stretch gap-2'>
                    <div className='flex flex-col text-green-900 bg-green-200 px-4 py-4 rounded-3xl'>
                        <FontAwesomeIcon className='h-6 w-6 pb-6' icon={faUserGroup} />
                        <div className='text-5xl font-semibold'>23</div>
                        <div className='font-light'>Present</div>
                    </div>

                    <div className='flex flex-col text-red-900 bg-red-200 px-4 py-4 rounded-3xl'>
                        <FontAwesomeIcon className='h-6 w-6 pb-6' icon={faUserXmark} />
                        <div className='text-5xl font-semibold'>5</div>
                        <div className='font-light'>Absent</div>
                    </div>
                </div>


                <div className='col-span-1 row-span-1 flex flex-col text-gray-900 bg-gray-200 px-4 py-4 rounded-3xl'>
                    <FontAwesomeIcon className='h-6 w-6 pb-6' icon={faQrcode} />
                    <div className='font-light'>Scan in Students</div>
                    {scanResult ?
                        <div> Success: <a className='text-green-500' href={scanResult}>{scanResult}</a></div> :
                        <div id="reader"></div>}
                </div>
                <div className="delete-session-area">
                    <button onClick={handleDeleteSession} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                        Delete Session
                    </button>
                </div>
            </div>
            <div className='text-2xl font-medium mt-12'> Attendance Report</div>
            <SessionsAttendanceTable data={data} isDarkMode={isDarkMode} />
        </div>
    );
}

export default SessionProfile;