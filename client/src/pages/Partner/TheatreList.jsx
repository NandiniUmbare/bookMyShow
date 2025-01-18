import React, { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteTheatreModal, ShowModel, TheatreForm } from "./index";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { getAllTheatresByOwner } from "../../api/theatres";

export const TheatreList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [theatres, setTheatres] = useState([]);
	const [selectedTheatre, setSelectedTheatre] = useState(null);
	const [formType, setFormType] = useState("add");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
	const { user } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const tableHeadings = [
		{ title: "Theatre Name", dataIndex: "name" },
		{ title: "Address", dataIndex: "address" },
		{ title: "Phone", dataIndex: "phone" },
		{ title: "Email", dataIndex: "email" },
		{ title: "Status", dataIndex: "isActive", render: (text, data) =>
            (data.isActive ? "Approved" : "Pending / Blocked") },
		{
			title: "Actions ",
			dataIndex: "",
			render: (text, data) => {
				return (
					<div>
						<Button
							onClick={() => {
								setIsModalOpen(true);
								setSelectedTheatre(data);
								setFormType("edit");
							}}
						>
							<EditOutlined />
						</Button>
						<Button
							onClick={() => {
								setIsDeleteModalOpen(true);
								setSelectedTheatre(data);
							}}
						>
							<DeleteOutlined />
						</Button>
                        {data.isActive && (
                            <Button onClick={()=>{
                                setIsShowModalOpen(true)
                                setSelectedTheatre(data)
                            }}>+Shows</Button>
                        )}
					</div>
				);
			},
		},
	];

	const getData = async () => {
		dispatch(ShowLoading());
		const response = await getAllTheatresByOwner(user._id);
        if (response.success) {
            const allTheatres = response.data;
            setTheatres(
              allTheatres.map(function (item) {
                return { ...item, key: `theatre${item._id}` };
              })
            );
          } else {
            message.error(response.message);
          }
		dispatch(HideLoading());
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div>
			<Button
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				Add Theatre
			</Button>
			<Table dataSource={theatres} columns={tableHeadings} />
			{isModalOpen && (
				<TheatreForm
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					selectedTheatre={selectedTheatre}
					setSelectedTheatre={setSelectedTheatre}
					formType={formType}
					getData={getData}
				/>
			)}
            {isDeleteModalOpen && 
                (<DeleteTheatreModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    selectedTheatre={selectedTheatre}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
                />
			)}
			{isShowModalOpen && (
				<ShowModel
					isShowModalOpen={isShowModalOpen}
					setIsShowModalOpen={setIsShowModalOpen}
					selectedTheatre={selectedTheatre}
				/>
			)}
		</div>
	);
};
