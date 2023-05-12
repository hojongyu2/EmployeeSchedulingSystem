import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Box } from '@mui/material';
import { styled } from '@mui/system';

const events = [
    {
        id: 1,
        title: 'Clinic',
        date: '2023-05-11',
        volunteers: 10,
        activities: [
            {
                id: 1,
                title: 'BloodDrive',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 1, name: 'Volunteer 1',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 2, name: 'Volunteer 2',  year:'M3',  availableTimes: {'Monday': [0, 6]}},
                    { id: 3, name: 'Volunteer 3',  year:'M3',  availableTimes: {'Tuesday': [0, 17],'Friday': [8, 18]} },
                ],
            },
            {
                id: 2,
                title: 'Police Call',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 4, name: 'Volunteer 4',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 5, name: 'Volunteer 5',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                ],
            },
        ],
    },
    {
        id: 2,
        title: 'Outdoor Clinic',
        date: '2023-05-12',
        volunteers: 15,
        activities: [
            {
                id: 1,
                title: 'Good Friday',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 6, name: 'Volunteer 6',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 7, name: 'Volunteer 7',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                ],
            },
            {
                id: 2,
                title: 'Activity 2',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 8, name: 'Volunteer 8',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 9, name: 'Volunteer 9',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 10, name: 'Volunteer 10', year:'M3',   availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                ],
            },
            {
                id: 3,
                title: 'Activity 3',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 11, name: 'Volunteer 11', year:'M3',   availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 12, name: 'Volunteer 12', year:'M3',   availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Outdoor Clinic 2',
        date: '2023-05-13',
        volunteers: 35,
        activities: [
            {
                id: 1,
                title: 'Activity 1',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 6, name: 'Volunteer 6',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 7, name: 'Volunteer 7',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                ],
            },
            {
                id: 2,
                title: 'Activity 2',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 8, name: 'Volunteer 8',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 9, name: 'Volunteer 9',  year:'M3',  availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                    { id: 10, name: 'Volunteer 10', year:'M3',   availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]} },
                ],
            },
            {
                id: 3,
                title: 'Activity 3',
                startTime: '09:00',
                endTime: '16:00',
                volunteers: [
                    { id: 11, name: 'Volunteer 11', year:'M3',   availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]}},
                    { id: 12, name: 'Volunteer 12', year:'M3',   availableTimes: {'Monday': [9, 17],'Tuesday': [9, 17],'Friday': [10, 18]}},
                ],
            },
        ],
    },
];

const StyledTableContainer = styled(TableContainer)({
    backgroundColor: 'white',
    '& .MuiTableCell-root': {
        borderColor: 'black',
    },
    borderRadius:'20px'
});

const StyledTableCell = styled(TableCell)({
    cursor: 'pointer',
  });

function AllEvents() {
const [openEventId, setOpenEventId] = useState(null);
const [openActivityId, setOpenActivityId] = useState(null);

const formatAvailableTimes = (availableTimes) => {
    return Object.entries(availableTimes).map(([day, times]) => (
        <div key={day}>
            {day}: {times[0]}-{times[1]}
        </div>
    ));
};

return (
    <StyledTableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total Number of Volunteers</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {events.map((event, key) => (
                    <React.Fragment key={key}>
                        <TableRow key={event.id} onClick={() => setOpenEventId(openEventId !== event.id ? event.id : null)}>
                            <StyledTableCell>{event.title}</StyledTableCell>
                            <StyledTableCell>{event.date}</StyledTableCell>
                            <StyledTableCell>{event.volunteers}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={openEventId === event.id} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Activity</StyledTableCell>
                                                    <StyledTableCell>Start Time</StyledTableCell>
                                                    <StyledTableCell>End Time</StyledTableCell>
                                                    <StyledTableCell>Volunteers</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {event.activities.map((activity, key) => (
                                                    <React.Fragment key={key}>
                                                        <TableRow key={activity.id} onClick={() => setOpenActivityId(openActivityId !== activity.id ? activity.id : null)}>
                                                            <StyledTableCell>{activity.title}</StyledTableCell>
                                                            <StyledTableCell>{activity.startTime}</StyledTableCell>
                                                            <StyledTableCell>{activity.endTime}</StyledTableCell>
                                                            <StyledTableCell>{activity.volunteers.length}</StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                <Collapse in={openActivityId === activity.id} timeout="auto" unmountOnExit>
                                                                    <Box margin={1}>
                                                                        <Table size="small">
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <StyledTableCell>Name</StyledTableCell>
                                                                                    <StyledTableCell>Year</StyledTableCell>
                                                                                    <StyledTableCell>Available Times</StyledTableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {activity.volunteers.map((volunteer) => (
                                                                                    <TableRow key={volunteer.id}>
                                                                                        <StyledTableCell>{volunteer.name}</StyledTableCell>
                                                                                        <StyledTableCell>{volunteer.year}</StyledTableCell>
                                                                                        <StyledTableCell>{formatAvailableTimes(volunteer.availableTimes)}</StyledTableCell>
                                                                                    </TableRow>
                                                                                ))}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </Box>
                                                                </Collapse>
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </StyledTableCell>
                        </TableRow>
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    </StyledTableContainer>
);
}

export default AllEvents;

