import React, { useEffect, useState } from 'react'
import {Button, message, Table} from 'antd'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { getAllTheatres, updateTheatre } from '../../api/theatres';

export const TheatreTable = () => {
  const dispatch = useDispatch()
  const [theatres, setTheatres] = useState([])
  const tableHeadings = [
		{ title: "Theatre Name", dataIndex: "name" },
		{ title: "Address", dataIndex: "address" },
    {title: "Owner", dataIndex: "owner", render: (text, data) => {
      return data.owner && data.owner.name
    }},
		{ title: "Phone", dataIndex: "phone" },
		{ title: "Email Id", dataIndex: "email" },
		{ title: "Status", dataIndex: "isActive", render: (text, data) =>
            (data.isActive ? "Approved" : "Pending / Blocked") },
		{
			title: "Actions ",
			dataIndex: "",
      render: (text, data)=>{
        return <div>
          {data.isActive ? (
            <Button onClick={()=> handleStatusChange(data)}>Block</Button>
          ):(
            <Button onClick={()=> handleStatusChange(data)}>Approve</Button>
          )}
        </div>
      }
		},
	];

  const getData = async() => {
    try {
      dispatch(ShowLoading())
      const response = await getAllTheatres()
      if(response.success){
        const allTheatres = response.data
        setTheatres(allTheatres.map((item) => (
          {...item, key: `theatre${item._id}`}
        )))
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

  const handleStatusChange = async(theatre) => {
    try {
      dispatch(ShowLoading())
      const values = {
        ...theatre,
        theatreId: theatre._id,
        isActive: !theatre.isActive
      }
      const response = await updateTheatre(values)
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
  return (
    <div>
      {theatres && theatres.length > 0 && (
        <Table dataSource={theatres} columns={tableHeadings}/>
      )}
    </div>
  )
}