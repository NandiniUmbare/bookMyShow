import React, { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import { getAllMovies } from '../../api/movies'
import { MovieForm } from './MovieForm'
import { DeleteMovieModal } from './DeleteMovieModal'

export const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [formType, setFormType] = useState("add")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const dispatch = useDispatch()

  const getData = async() => {
    dispatch(ShowLoading())
    const response = await getAllMovies()
    const allMovies = response.data
    setMovies(allMovies.map((item) => {
      return {...item, key: item._id}
    }))
    dispatch(HideLoading())
  }
  const tableHeadings = [
    {title:"Poster", dataIndex:"poster",render: (text, data) => {
      return (<img src={text} width="75" height="115" style={{objectFit:"cover"}}/>)
    }},
    {title:"Movie Name", dataIndex:"movieName"},
    {title:"Description", dataIndex:"description"},
    {title:"Duration", dataIndex:"duration", render: (text) => `${text} Min`},
    {title:"Genre", dataIndex:"genre"},
    {title:"Language", dataIndex:"language"},
    {title:"Release Date", dataIndex:"releaseDate", render: (text) => {
      return moment(text).format('MM-DD-YYYY')
    }},
    {title:"Actions ", dataIndex:"", render: (text, data) => {
      return <div>
        <Button onClick={()=>{
          setIsModalOpen(true)
          setSelectedMovie(data)
          setFormType("edit")
        }}>
          <EditOutlined/>
        </Button>
        <Button onClick={() => {
          setIsDeleteModalOpen(true)
          setSelectedMovie(data)
        }}>
          <DeleteOutlined/>
        </Button>
      </div>
    }},
  ]

  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
      <Button onClick={()=>{
        setIsModalOpen(true)
        setFormType("add")
      }}>Add Movie</Button>
      <Table dataSource={movies} columns={tableHeadings}/>
      {isModalOpen && (
        <MovieForm 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}/>
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal 
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          getData={getData}
          setSelectedMovie={setSelectedMovie}/>
      )}
    </div>
  )
}
