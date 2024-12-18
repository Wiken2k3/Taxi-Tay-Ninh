import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Contact.css";
import { toast } from "react-toastify";
import contactService from "../../services/contactService";

const Contact =()=> {
  const [name, setName]= useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataComment= {
        name, phone, email, topic,content
      }
       await contactService.addContact(dataComment)
      toast.success("Gửi tư vấn thành công");
      setName('');
      setPhone('');
      setEmail('');
      setTopic('');
      setContent('');
    } catch (error) {
      toast.error(error);
    }
  };
  return (
      <section id="contact" className="block contact-block">
        <Container>
    
        <Row className="contact-container">
            <Col  className="contect-left p-0">
              <h3 className="text-green">
                <strong>Liên hệ với chúng tôi</strong>
              </h3>
              <h3 className="text-black">Dù bạn ở bất kỳ nơi đâu, bất cứ lúc nào</h3>
            </Col>
            <Col lg={5} md={8} sm={10} className="p-0">

                <Form className="contact-form p-4 rounded" onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Họ tên"
                      className="larger-input"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Row className="row-emailphone">
                    <Col className="mb-3" xs={12} md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          className="larger-input"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="mb-3" xs={12} md={6}>
                      <Form.Group controlId="formPhone">
                        <Form.Control
                          type="text"
                          placeholder="Số điện thoại"
                          className="larger-input"
                          value={phone}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="formSubject" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Chủ đề"
                      className="larger-input"
                      value={topic}
                      required
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formMessage" className="mb-4">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Nội dung"
                      className="wide-textarea"
                      value={content}
                      required
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="success" type="submit" className=" contact-button">
                    <strong>Nhận tư vấn</strong>
                  </Button>
              </Form>
            </Col>
          </Row>

        </Container>
      </section>
    );
  }

  export default Contact;
