import React, {useEffect, useState} from 'react'
import "../../App.css"
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import { getAllMovies } from '../../api/movies'
import { Col, Input, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import moment from 'moment';

export const Home = () => {
  const [movies, setMovies] = useState([])
  const [searchText, setSearchText] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = async() => {
    dispatch(ShowLoading())
    const response = await getAllMovies()
    const allMovies = response.data
    setMovies(allMovies.map((item) => {
      return {...item, key: item._id}
    }))
    dispatch(HideLoading())
  }

  const handleSearch = (e) =>{
    setSearchText(e.target.value)
  }
  useEffect(()=>{
    getData()
  }, [])
  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{span: 24}} lg={{span: 12}}>
          <Input 
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br/>
          <br/>
          <br/>
        </Col>
      </Row>
      <Row 
        className='justify-content-center'
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}>
          {movies && 
          movies.filter((movie)=>(movie.movieName.toLowerCase().includes(searchText.toLowerCase())))
          .map((movie) => (
            <Col className='mb-5' key={movie._id}>
              <div className='text-center' onClick={()=>{
                  navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)
                }}>
                <img 
                  src={movie.poster}
                  alt={movie.movieName}
                  width={200}
                  className='cursor-pointer'
                  style={{borderRadius: "8px"}}
                />
                <h3>{movie.movieName}</h3>
              </div>
            </Col> 
          ))}
      </Row>
    </>
  )
}
