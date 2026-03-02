import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import MediaCard from "../MediaCard/MediaCard.component";

const TestimonialsV3 = ({ testimonials }) => {
  return (
    <section id="testimonials" className="testimonialsV3 sp">
      <h2 className="themeHeader" style={{ marginBottom: "25px" }}>
        Testimonials
      </h2>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={25}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        className="testimonialsV3__swiper paginationMargin"
      >
        {testimonials.map((testimonial, i) => {
          return (
            <SwiperSlide key={i}>
              <MediaCard media={testimonial} type="testimonials" />
            </SwiperSlide>
          );
        })}
        {testimonials.map((testimonial, i) => {
          return (
            <SwiperSlide key={i}>
              <MediaCard media={testimonial} type="testimonials" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default TestimonialsV3;
