import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {Button, Card, Col, message, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import { getShowById } from '../../api/shows';
import moment from 'moment';
import StripeCheckout from "react-stripe-checkout";
import { bookShow, makePayment } from '../../api/booking';

export const BookShow = () => {
  const {user} = useSelector(state => state.users)
  const [show, setShow] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  const dispatch = useDispatch()
  const params = useParams();
  const navigate = useNavigate()

  const getData = async() => {
    try {
        dispatch(ShowLoading())
        const response = await getShowById(params.id)
        if(response){
            setShow(response.data)
        } else {
            message.error(response.message)
        }
        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
    }
  }

  const getSeats = () => {
    let colums = 12
    let totalSeats = show.seats
    let rows = Math.ceil(totalSeats/colums)

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='w-100 max-width-600 mx-auto mb-25px'>
                <p className='text-center mb-10px'>
                    Screen this side,  you will be watching in this  direction
                </p>
                <div className='screen-div'></div>
            </div>
            <ul className='seat-ul justify-content-center'
                style={{marginLeft: "20%"}}>
                {Array.from(Array(rows).keys()).map((row) => 
                    Array.from(Array(colums).keys()).map((column)=>{
                        let seatNumber = row * colums + column + 1
                        let seatClass = "seat-btn"
                        if(selectedSeats.includes(seatNumber)){
                            seatClass += " selected"
                        }
                        if(show.bookedSeats.includes(seatNumber)){
                            seatClass += " booked"
                        }
                        if(seatNumber <= totalSeats){
                            return (
                                <li key={seatNumber}>
                                    <button className={seatClass}
                                        onClick={()=>{
                                            if (selectedSeats.includes(seatNumber)) {
                                                setSelectedSeats(
                                                  selectedSeats.filter(
                                                    (curSeatNumber) => curSeatNumber !== seatNumber
                                                  )
                                                );
                                              } else {
                                                setSelectedSeats([...selectedSeats, seatNumber]);
                                              }
                                        }}>
                                        {seatNumber}
                                    </button>
                                </li>
                            )
                        }
                    })
                )}    
            </ul>
            <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
                <div className="flex-1">
                    Selected Seats: <span>{selectedSeats.join(", ")}</span>
                </div>
                <div className="flex-shrink-0 ms-3">
                    Total Price:{" "}
                    <span>Rs. {selectedSeats.length * show.price}</span>
                </div>
            </div>
        </div>
    )
  }

  const onToken = async(token) => {
    try {
        dispatch(ShowLoading())
        const response = await makePayment(
            token,
            selectedSeats.length * show.price
        )
        console.log(response)
        if(response.success){
            message.success(response.message)
            book(response.data)
        } else {
            message.error(response.message)
        }
        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
    }
  }

  const book = async(transactionId) => {
    try {
        dispatch(ShowLoading())
        const response = await bookShow({
            show: params.id,
            user: user._id,
            seats: selectedSeats,
            transactionId
        })
        if(response.success){
            message.success(response.message)
            navigate('/profile')
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
        {show && (
            <Row gutter={24}>
                <Col span={24}>
                    <Card
                        title={
                            <div className='movie-title-details'>
                                <h1>{show.movie.movieName}</h1>
                                <p>
                                    Theatre: {show.theatre.name}, {show.theatre.address}
                                </p>
                            </div>
                        }
                        extra={
                            <div className='show-name py-3'>
                                <h3>
                                    <span>Show Name: </span>{show.name}
                                </h3>
                                <h3>
                                    <span>Date & Time: </span>
                                    {moment(show.date).format('MMM Do YYYY')} at {" "}
                                    {moment(show.time, 'HH:mm').format('hh:mm A')}
                                </h3>
                                <h3>
                                    <span>Ticket Price:</span> Rs. {show.price}/-
                                </h3>
                                <h3>
                                    <span>Total Seats:</span> {show.seats}
                                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                                    {show.seats - show.bookedSeats.length}
                                </h3>
                            </div>
                        }
                        style={{width: "100%"}}
                    >
                        {getSeats()}
                        {selectedSeats.length > 0 && (
                            <StripeCheckout
                                token={onToken}
                                amount={selectedSeats.length * show.ticketPrice * 100}
                                stripeKey="pk_test_51QQYDBRrOxJ3Go9aBZyvwsktVGSQkNLqXdWRpXXhDPhrJMxoSp6MGRTpvWqs4cIIMMLKyc3iOeqsMRuy7scuAYwU00LXM8RVcl"
                                >
                                <div className="max-width-600 mx-auto">
                                    <Button type="primary" shape="round" size="large" block>
                                    Pay Now
                                    </Button>
                                </div>
                            </StripeCheckout>
                        )}
                    </Card>
                </Col>
            </Row>
        )}
    </>
  )
}
