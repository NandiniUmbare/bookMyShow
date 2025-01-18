import React from 'react'
import { message, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import { deleteTheatre } from '../../api/theatres'

export const DeleteTheatreModal = ({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    getData
}) => {
  const dispatch = useDispatch()    
  const handleOk = async () => {
    try {
        dispatch(ShowLoading())
        const response = await deleteTheatre({theatreId: selectedTheatre._id})
        if(response.success){
            getData()
            message.success(response.message)
        } else {
            message.error(response.message)
        }
        setIsDeleteModalOpen(false)
        setSelectedTheatre(null)
        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
        dispatch(HideLoading())
    }
  }
  const handleCancel = () => {
    setIsDeleteModalOpen(false)
    setSelectedTheatre(null)
  }
  return (
    <Modal
      title="Delete Movie?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">Are you sure you want to delete this theatre?</p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this theatre data.
      </p>
    </Modal>
  )
}
