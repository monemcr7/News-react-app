import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import defaultImage from "../Components/images/default-featured-image.jpg";
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);
  // Define your default image URL
  const defaultImageUrl = defaultImage;
  return (
    <div>
      <Row className="justify-content-center">  
        {currentArticles?.map((article) => (
          <Col xs={12} md={6} lg={4} xl={3} key={article.url}>
            <Card>
            {article.image ? (
                <Card.Img src={article.image} variant="top" />
              ) : (
                <Card.Img src={defaultImageUrl} variant="top" />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url}>Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col> 
        ))} 
      </Row>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default NewsList;
