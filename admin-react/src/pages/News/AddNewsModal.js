import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import createUploadAdapter from "./CustomUploadAdapter";
import { addNews } from "../../redux/slices/newsSlice";
import './News.css'


const AddNewsModal = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const { isLoading } = useSelector((state) => state.news);


    const handleAddSubmit = async (e) => {
        e.preventDefault();
   
        try {
            if (!thumbnail) {
                toast.error("Vui lòng thêm ảnh")
                return
            }

            await dispatch(addNews({ title: title, summary: summary, images: thumbnail, description: description })).unwrap();

            setThumbnail(null)
            handleClose();

        } catch (error) {
            toast.error(error);
        }
    };

    const handleImageChange = (event) => {
        setThumbnail(event.target.files[0]);

    };


    return (
        <Modal size="xl" show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Thêm Tin Tức</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddSubmit}>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Tiêu Đề</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tiêu đề" onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDiaDiem">
                        <Form.Label>Tóm Tắt</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3} // Thiết lập số dòng hiển thị ban đầu, bạn có thể thay đổi giá trị này.
                            type="text" placeholder="Nhập tóm tắt" onChange={(e) => setSummary(e.target.value)} required />
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
                            data={description}
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
                        <Button variant="primary" className="ms-2" type="submit" disabled={isLoading}>
                            {isLoading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewsModal;
