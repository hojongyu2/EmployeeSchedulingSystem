import React, { Fragment, useContext, useState } from 'react';
import { getAllExistActivities, getAllVolunteers } from '../../../utilities/eventAxios';
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from '@mui/material';
import { userContext } from '../../context/UserContext';
import './AllEvents.styles.css';


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

    return (
<TableContainer className="tableContainer">
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Start Time</TableCell>
        <TableCell>End Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {allEventData.map((event, key) => (
        <React.Fragment key={key}>
          <TableRow
            key={event.id}
            onClick={() => {
              setOpenEventId(openEventId !== event.id ? event.id : null);
              onClickGetAllActivities(event.id);
            }}
            className="tableRow" // Apply the class name
          >
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date_of_event}</TableCell>
            <TableCell>{event.start_time}</TableCell>
            <TableCell>{event.end_time}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="activityRow" colSpan={6}>
              <Collapse in={openEventId === event.id} timeout="auto" unmountOnExit>
                <Box className="collapseBox">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Activity</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Volunteers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allActivityData.map((data, key) => (
                        <React.Fragment key={key}>
                          <TableRow
                            key={data.event_activity_id}
                            onClick={() => {
                              setOpenActivityId(openActivityId !== data.event_activity_id ? data.event_activity_id : null);
                              onClickGetAllVolunteer(data.event_activity_id);
                            }}
                            className="tableRow" // Apply the class name
                          >
                            <TableCell>{data.activity}</TableCell>
                            <TableCell>{data.start_time}</TableCell>
                            <TableCell>{data.end_time}</TableCell>
                            <TableCell>{data.required_volunteers}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="volunteerRow" colSpan={6}>
                              <Collapse in={openActivityId === data.event_activity_id} timeout="auto" unmountOnExit>
                                <Box className="collapseBox">
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Start Times</TableCell>
                                        <TableCell>End Times</TableCell>
                                        <TableCell>Confirmation</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {allVolunteerData.map((volunteer, key) => (
                                        <TableRow key={key}>
                                          <TableCell>{volunteer.volunteer}</TableCell>
                                          <TableCell>{volunteer.start_time}</TableCell>
                                          <TableCell>{volunteer.end_time}</TableCell>
                                          <TableCell>{volunteer.confirmed.toString()}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    );
    }

