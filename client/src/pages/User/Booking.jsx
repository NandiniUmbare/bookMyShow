import React, { useEffect, useState } from 'react'
import {Button, Card, Col, message, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import {getAllBookings} from '../../api/booking'
import moment from 'moment'
import Link from 'antd/es/typography/Link'

export const Booking = () => {
  const [bookings, setBookings] = useState([])    
  const dispatch = useDispatch()    
  const {user} = useSelector(state => state.users)
  const getData = async() => {
    try {
        dispatch(ShowLoading())
        const response = await getAllBookings(user._id)
        if(response.success){
            setBookings(response.data)
        } else {
            message.error(response.message)
        }
        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
    }
  }        
  
  useEffect(()=>{
    getData()
  },[])
  return (
    <>
    {bookings && (
        <Row gutter={24}>
            {bookings.map(booking => {
                return (
                    <Col key={booking._id} xs={{span: 24}} lg={{span:12}}>
                        <Card className='mb-3'>
                            <div className='d-flex flex-colum-mob'>
                                <div className='flex-shrink-0'>
                                    <img 
                                        src={booking.show.movie.poster}
                                        width={100}
                                        alt={booking.show.movie.movieName}/>
                                </div>
                                <div className='show-details flex-1'>
                                    <h3 className='mt-0 mb-0'>
                                        {booking.show.movie.movieName}
                                    </h3>
                                    <p>Theatre: <b>{booking.show.theatre.name}</b></p>
                                    <p>Seats: <b>{booking.seats.join(', ')}</b></p>
                                    <p>Date & Time:{" "}
                                        <b>
                                            {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                                            {moment(booking.show.time, 'HH:mm').format('hh:mm A')}
                                        </b>{" "}
                                    </p>
                                    <p>Amount:{" "}
                                        <b>Rs.{booking.seats.length * booking.show.price}{" "}</b>
                                    </p>
                                    <p>Booking ID: <b>{booking.transactionId}</b></p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )}
    {!bookings.length && (
        <div className="text-center pt-3">
          <h1>You've not booked any show yet!</h1>
          <Link to="/">
            <Button type="primary">Start Booking</Button>
          </Link>
        </div>
      )}
    </>
  )
}
