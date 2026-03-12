import { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function MediaSection({ media = [], mediaDesc }) {
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen width for responsive logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Re-init pagination after both refs exist
  useEffect(() => {
    if (swiperRef.current && paginationRef.current) {
      const swiper = swiperRef.current;
      swiper.params.pagination.el = paginationRef.current;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    }
  }, [paginationRef.current, swiperRef.current]);

  if (!media.length) return null;

  const renderMediaItem = (item, index) => (
    <a
      key={index}
      href={item?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="d-block thumb-img-box-outer"
    >
      <div className="thumb-image-box thumb_image_box">
        <img
          src={item?.image || require("../assets/images/item-i.png")}
          alt={`News & Media image ${index + 1}`}
          className="img-fluid"
        />
      </div>
      <div className="cta-bottom-media">
        <div className="arrow-div-link">
          <span>Read more</span>
          <img
            src={require("../assets/images/up-right-arrow.png")}
            alt="Arrow Icon"
          />
        </div>
      </div>
    </a>
  );

  const renderGrid = () => (
    <Row>
      {media.slice(0, 4).map((item, index) => (
        <Col key={index} lg={3} md={6} className="mb-4">
          {renderMediaItem(item, index)}
        </Col>
      ))}
    </Row>
  );

  const renderSwiper = () => (
    <div className="media-swiper-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        className="media-swiper"
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>{renderMediaItem(item, index)}</SwiperSlide>
        ))}
      </Swiper>

      {/* 👉 Custom pagination div below swiper */}
      <div className="custom-pagination">
        <div
          ref={paginationRef}
        ></div>
      </div>
    </div>
  );

  return (
    <section className="onward-workspaces-offerings bottom padding-left-right">
      <div className="workspaces-slider media-vj">
        <div className="heading-title text-center">
          <h4 className="heading workspaces">News & Media</h4>
          <p className="paragraph" style={{ whiteSpace: "pre-line" }}>
            {mediaDesc}
          </p>
        </div>

        <div className="explore-section">
          {isMobile ? renderSwiper() : media.length <= 4 ? renderGrid() : renderSwiper()}
        </div>
      </div>
    </section>
  );
}
