import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Button, Col, Form, Input, message, Modal, Row, Select, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import {getAllMovies} from '../../api/movies'
import { addShow, deleteShow, getShowsByTheatre, updateShow } from '../../api/shows'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import moment from 'moment'

export const ShowModel = ({
    isShowModalOpen,
    setIsShowModalOpen,
    selectedTheatre
}) => {
  const [view, setView] = useState("table")
  const [movies, setMovies] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [shows, setShows] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)

  const dispatch = useDispatch()

  const handleDelete = async(showId) => {
    try {
        dispatch(ShowLoading())
        const response = await deleteShow(showId)
        if(response.success){
            message.success(response.message)
            getData()
        } else {
            message.error(response.message)
        }
        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
    }
  }
  const tableHeading = [
    {title: "Show name", dataIndex: 'name', key: 'name'},
    {title: "Date", dataIndex: "date", render:(text, data) => (moment(text).format('MMM Do YYYY'))},
    {title: "Time", dataIndex: "time", render:(text)=>(moment(text, 'HH:mm').format('hh:mm A'))},
    {title: "Movies", dataIndex:"movie", render:(text, data)=>{return data?.movie.movieName}},
    {title: "Price", dataIndex: "price", key: "ticketPrice"},
    {title: "Seats", dataIndex: "seats", key: "seats"},
    {title: "Available seats", dataIndex: "seats", render:(text, data)=>{
        return data.seats - data?.bookedSeats?.length
    }},
    {title: "Actions", dataIndex: "", render: (text, data) => {
        return <div>
            <Button onClick={()=>{
                setView("edit")
                setSelectedMovie(data?.movie)
                setSelectedShow({
                    ...data,
                    date: moment(data.date).format('YYYY-MM-DD')
                })
            }}>
                <EditOutlined/>
            </Button>
            <Button onClick={() => handleDelete(data._id)}>
                <DeleteOutlined/>
            </Button>
        </div>
    }}
  ]
  console.log('selected moview', selectedMovie && selectedMovie.movieName)
  const getData = async() => {
    try {
        dispatch(ShowLoading())
        const movieResponse = await getAllMovies()
        const allMovies = movieResponse.data
        if(movieResponse.success){
            setMovies(allMovies)
        } else {
            message.error(movieResponse.message)
        }

        const showResponse = await getShowsByTheatre(selectedTheatre._id)
        console.log(showResponse)
        if(showResponse.success){
            setShows(showResponse.data)
        } else {
            message.error(movieResponse.message)
        }

        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
    }
  }
  const handleCancel = () => {
    setIsShowModalOpen(false)
  }
  const onFinish = async(values) => {
    try {
        dispatch(ShowLoading())
        let response = null
        if(view === "add"){
            response = await addShow({...values, theatre: selectedTheatre._id})
        } else {
            response = await updateShow({
                ...values, 
                showId: selectedShow._id,
                theatre: selectedTheatre._id})
        }
        if(response.success){
            getData()
            message.success(response.message)
            setView("table")
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
    <Modal
        centered
        width={1200}
        footer={null}
        open={isShowModalOpen}
        onCancel={handleCancel}
    >
        <div className='d-flex justify-content-between'>
            <h3>
            {view === "table"
            ? "List of Shows"
            : view === "add"
            ? "Add Show"
            : "Edit Show"}
            </h3>
            {view === "table" && (
                <Button onClick={()=>setView("add")}>Add Show</Button>
            )}
        </div>
        {view === "table" && (<Table dataSource={shows} columns={tableHeading}/>)}
        {(view === "add" || view === "edit") && (
            <Form
                layout='vertical'
                style={{width: '100%'}}
                initialValues={view === "edit"? selectedShow: null}
                onFinish={onFinish}
            >
                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                    <Col span={24}>
                        <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                            <Col span={8}>
                                <Form.Item
                                    label='Show name'
                                    htmlFor='name'
                                    name='name'
                                    className='d-block'
                                    rules={[{required: true, message: 'Show name is required!'}]}
                                >
                                    <Input id='name' type='text' placeholder='Enter the show name'/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label='Show Date'
                                    htmlFor='date'
                                    name='date'
                                    className='d-block'
                                    rules={[{required: true, message: 'Show date is required!'}]}
                                >
                                    <Input id='date' type='date' placeholder='Enter the date name'/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Show Timing"
                                    htmlFor="time"
                                    name="time"
                                    className="d-block"
                                    rules={[
                                    { required: true, message: "Show time is required!" },
                                    ]}
                                >
                                    <Input
                                    id="time"
                                    type="time"
                                    placeholder="Enter the show date"
                                    ></Input>
                                </Form.Item>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                            <Col span={8}>
                                <Form.Item
                                    label="Select the Movie"
                                    htmlFor="movie"
                                    name="movie"
                                    className="d-block"
                                    rules={[{ required: true, message: "Movie  is required!" }]}
                                >
                                    <Select
                                    id="movie"
                                    placeholder="Select Movie"
                                    value={view === "edit" ? selectedMovie && selectedMovie.movieName : ""}
                                    style={{ width: "100%", height: "45px" }}
                                    options={movies.map((movie) => ({
                                        key: movie._id,
                                        value: movie._id,
                                        label: movie.movieName,
                                    }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Ticket Price"
                                    htmlFor="price"
                                    name="price"
                                    className="d-block"
                                    rules={[
                                    { required: true, message: "Ticket price is required!" },
                                    ]}
                                >
                                    <Input
                                    id="ticketPrice"
                                    type="number"
                                    placeholder="Enter the ticket price"
                                    ></Input>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Total Seats"
                                    htmlFor="seats"
                                    name="seats"
                                    className="d-block"
                                    rules={[
                                    { required: true, message: "Total seats are required!" },
                                    ]}
                                >
                                    <Input
                                    id="totalSeats"
                                    type="number"
                                    placeholder="Enter the number of total seats"
                                    ></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className='d-flex gap-10'>
                    <Button
                        block
                        htmlType='button'
                        onClick={()=>{
                            setView("table")
                        }}
                    >
                        <ArrowLeftOutlined/> Go Back
                    </Button>
                    <Button
                        block
                        type='primary'
                        htmlType='submit'
                        style={{fontSize: "1rem", fontWeight: "600"}}
                    >
                        {view === "add" ? "Add the show" : "Edit the show"}
                    </Button>
                </div>
            </Form>
        )}
    </Modal>
  )
}
