// import React from "react";
// import "./News.css";
// import n1 from "../../assets/images/Address.png"
// import n2 from "../../assets/images/Address.png"
// import n3 from "../../assets/images/Address.png"
// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom"; // Import Link

// const News = () => {
//   const tinTuc = [
//     {
//       id: 1, // Thêm id cho từng bài viết
//       anh: n1,
//       tieuDe: 'Taxi Tây Ninh giá rẻ',
//       noiDung: 'Taxi Tây Ninh giá rẻ. Khi du lịch hay đi công tác tại Tây Ninh, việc tìm kiếm một dịch vụ taxi giá rẻ và chất lượng...',
//     },
//     {
//       id: 2,
//       anh: n2,
//       tieuDe: 'Chuyên chở quý khách cho những chuyến tour dài',
//       noiDung: 'Chuyên chở quý khách những chuyến du lịch xa...',
//     },
//     {
//       id: 3,
//       anh: n3,
//       tieuDe: 'Taxi Tây Ninh giá rẻ - Trải nghiệm dịch vụ chuyên nghiệp và tiện lợi',
//       noiDung: 'Nếu bạn đang tìm kiếm một dịch vụ taxi giá rẻ, tin cậy và chuyên nghiệp tại Tây Ninh, hãy để Taxi Tây Ninh Giá Rẻ đảm nhận việc đó....',
//     },
//   ];
//   return (
//     <section id="news" className="block news-block bg">
//       <Container>
//         <div className="news">
//           <div className="title-holder">
//             <h2>TIN TỨC</h2>
//             <div className="subtitle">TẤT CẢ CÁC BÀI TIN TỨC</div>
//           </div>
//           <div className="list-tin-tuc">
//             {tinTuc.map((item) => (
//               <div className="tin-tuc-item" key={item.id}>
//                 <img src={item.anh} alt={item.tieuDe} />
//                 <h3><strong>{item.tieuDe}</strong></h3>
//                 <p>{item.noiDung}</p>
//                 <Link to={`/news/${item.id}`}>
//                   <button>Xem thêm</button>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default News;

import React, { useEffect } from "react";
import "./News.css";
import n1 from "../../assets/images/Address.png";
import n2 from "../../assets/images/Address.png";
import n3 from "../../assets/images/Address.png";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNews } from "../../redux/slices/newsSlice";

const News = () => {
  const { listNews, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.news);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllNews({ page: 1, limit: 100 }))
  }, [])

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <section id="news" className="block news-block bg-light py-5">
      <Container >
        <div className="news-container">
          <div className="title-holder">
            <h2>TIN TỨC</h2>
            <div className="subtitle">TẤT CẢ CÁC TIN TỨC</div>
          </div>
          <Row className="news-row g-4">
            {listNews.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4}>
                <div
                  className="tin-tuc-item"
                  onClick={() => handleCardClick(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img variant="top" src={`${process.env.REACT_APP_NESTJS_APP_URL}${item.thumbnail[0]}`} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.summary}</Card.Text>
                  </Card.Body>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default News;
