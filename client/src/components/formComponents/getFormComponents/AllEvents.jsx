import React, { useContext, useState } from 'react';
import { getAllExistActivities, getAllVolunteers } from '../../../utilities/eventAxios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Box } from '@mui/material';
import { styled } from '@mui/system';
import { userContext } from '../../context/UserContext';


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

export default function AllEvents({allEventData, setAllEventData, allActivityData, setAllActivityData, allVolunteerData, setAllvolunteerData}) {
    const [openEventId, setOpenEventId] = useState(null);
    const [openActivityId, setOpenActivityId] = useState(null);
    const {user, setUser} = useContext(userContext)

    //get all the activitity data related to one specific event when column is clicked
    const onClickGetAllActivities = async (eventId) => {
          try {
            // Check if user information is in localStorage
            const isUserInLocalStorage = localStorage.getItem('currentUser');
            if (isUserInLocalStorage) {
               const response = await getAllExistActivities({eventID:eventId})
              if (response) {
                setAllActivityData(response)
              }
            } else {
                // If use does not exist, then clear the user state variable and localStorage, then navigate to home page
                setUser(null)
                localStorage.clear();
                navigate('/');
            }
          } catch (error) {
            // If the token is expired (status 401), clear the localStorage and navigate to the login page
            if (error.response && error.response.status === 401) {
                setUser(null)
                localStorage.clear();
                navigate('/login');
            } else {
                // Handle other errors
                console.error(error);
            }
          }
    }
    
    //get all the volunteer data related to one specific activity when column is clicked
    const onClickGetAllVolunteer = async (eventActivityID) => {
        try {
            // Check if user information is in localStorage, then 
            const isUserInLocalStorage = localStorage.getItem('currentUser');
            if (isUserInLocalStorage) {
                const response = await getAllVolunteers({eventActivityID: eventActivityID})
              if (response) {
                setAllvolunteerData(response)
              }
            } else {
                // If use does not exist, then clear the user state variable and localStorage, then navigate to home page
                setUser(null)
                localStorage.clear();
                navigate('/');
            }
          } catch (error) {
            // If the token is expired (status 401), clear the localStorage and navigate to the login page
            if (error.response && error.response.status === 401) {
                setUser(null)
                localStorage.clear();
                navigate('/login');
            } else {
                // Handle other errors
                console.error(error);
            }
          }
    }
    console.log(allVolunteerData)
    return (
        <StyledTableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>start_time</TableCell>
                        <TableCell>end_time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allEventData.map((event, key) => (
                        <React.Fragment key={key}>
                            <TableRow 
                                key={event.id} 
                                onClick={() => {
                                    setOpenEventId(openEventId !== event.id ? event.id : null)
                                    onClickGetAllActivities(event.id)
                                }}
                            >
                                <StyledTableCell>{event.name}</StyledTableCell>
                                <StyledTableCell>{event.date_of_event}</StyledTableCell>
                                <StyledTableCell>{event.start_time}</StyledTableCell>
                                <StyledTableCell>{event.end_time}</StyledTableCell>
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
                                                    {allActivityData.map((data, key) => (
                                                        <React.Fragment key={key}>
                                                            <TableRow key={data.event_activity_id} onClick={() => {
                                                                setOpenActivityId(openActivityId !== data.event_activity_id ? data.event_activity_id : null)
                                                                onClickGetAllVolunteer(data.event_activity_id)
                                                                }}>
                                                                <StyledTableCell>{data.activity}</StyledTableCell>
                                                                <StyledTableCell>{data.start_time}</StyledTableCell>
                                                                <StyledTableCell>{data.end_time}</StyledTableCell>
                                                                <StyledTableCell>{data.required_volunteers}</StyledTableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                    <Collapse in={openActivityId === data.event_activity_id} timeout="auto" unmountOnExit>
                                                                        <Box margin={1}>
                                                                            <Table size="small">
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <StyledTableCell>Name</StyledTableCell>
                                                                                        <StyledTableCell>Start Times</StyledTableCell>
                                                                                        <StyledTableCell>End Times</StyledTableCell>
                                                                                        <StyledTableCell>Confirmation</StyledTableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {allVolunteerData.map((volunteer, key) => (
                                                                                        <TableRow key={key}>
                                                                                            <StyledTableCell>{volunteer.volunteer}</StyledTableCell>
                                                                                            <StyledTableCell>{volunteer.start_time}</StyledTableCell>
                                                                                            <StyledTableCell>{volunteer.end_time}</StyledTableCell>
                                                                                            <StyledTableCell>{volunteer.confirmed.toString()}</StyledTableCell>
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

