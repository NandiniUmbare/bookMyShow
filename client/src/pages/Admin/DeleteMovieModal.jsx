import React from 'react'
import {message, Modal} from 'antd'
import {useDispatch} from 'react-redux'
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { deleteMovie } from '../../api/movies';

export const DeleteMovieModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch()
    const handleOk = async () => {
      try {
        dispatch(ShowLoading())
        const movieId = selectedMovie._id;
        const response = await deleteMovie({movieId})
        if(response.success){
          message.success(response.message)
          getData()
        } else {
          message.error(response.message)
        }
        setIsDeleteModalOpen(false)
        setSelectedMovie(null)
        dispatch(HideLoading())
      } catch (error) {
        message.error(error.message)
        dispatch(HideLoading())
      }
    }
    const handleCancel = () => {
        setIsDeleteModalOpen(false)
        setSelectedMovie(null)
    }
  return (
    <Modal
      title="Delete Movie?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">Are you sure you want to delete this movie?</p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this movie data.
      </p>
    </Modal>
  )
}
