import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchAllUsers } from "../../redux/slices/userSlice";
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { updateTour } from "../../redux/slices/tourSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import createUploadAdapter from "./CustomUploadAdapter";
import { updateNews } from "../../redux/slices/newsSlice";

const EditNewsModal = ({ show, handleClose, edit }) => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            setTitle(edit.title)
            setSummary(edit.summary)
            setDescription(edit.description)

        }
    }, [edit]);

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(description)
            await dispatch(updateNews({ 
                id: edit._id, 
                title: title, 
                summary: summary, 
                images: thumbnail.length > 0 ? thumbnail : null, 
                description: description })
            ).unwrap();
            handleClose();
        } catch (error) {
            toast.error(error);

        }
    };
    const handleKeyDown = (e) => {
        if (!/^[0-9]$/i.test(e.key)) {
            e.preventDefault();
        }
    };
    const handleImageChange = (event) => {
        setThumbnail(event.target.files[0]);

    };


    return (
        <Modal size="xl" show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Sửa Tin Tức: {edit?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Tiêu Đề</Form.Label>
                        <Form.Control type="text" defaultValue={edit?.title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Tóm Tắt</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3} // Thiết lập số dòng hiển thị ban đầu, bạn có thể thay đổi giá trị này.
                            defaultValue={edit?.summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage" className="mt-2">
                        <Form.Label>Thumbnail</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageChange}
                        // handle image upload
                        />
                    </Form.Group>

                    <Form.Group controlId="formContent" className="mt-3">
                        <Form.Label>Mô Tả</Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                extraPlugins: [createUploadAdapter],
                                // Các cấu hình khác nếu cần
                            }}
                            data={edit?.description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                            }}
                        />
                    </Form.Group>
                    

                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" className="ms-2" type="submit">
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>


    );
};

export default EditNewsModal;
