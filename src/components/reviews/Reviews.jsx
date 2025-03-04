import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./reviews.sass"

const Reviews = () => {

  return (
    <div className="reviews">
      <h2 className="reviews__title">О нас говорят:</h2>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="reviews__slide">
            <div className="reviews__slide-user">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="reviews__slide-img" />
              <p className="reviews__slide-name">Иван Иванов</p>
            </div>
            <p className="reviews__slide-text">Оформил ордер USDT - RUB, оператор быстро подтвердил получение крипты и перевел деньги. 5/5.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="reviews__slide">
            <div className="reviews__slide-user">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="reviews__slide-img" />
              <p className="reviews__slide-name">Иван Иванов</p>
            </div>
            <p className="reviews__slide-text">Оформил ордер USDT - RUB, оператор быстро подтвердил получение крипты и перевел деньги. 5/5.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="reviews__slide">
            <div className="reviews__slide-user">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="reviews__slide-img" />
              <p className="reviews__slide-name">Иван Иванов</p>
            </div>
            <p className="reviews__slide-text">Оформил ордер USDT - RUB, оператор быстро подтвердил получение крипты и перевел деньги. 5/5.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="reviews__slide">
            <div className="reviews__slide-user">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="reviews__slide-img" />
              <p className="reviews__slide-name">Иван Иванов</p>
            </div>
            <p className="reviews__slide-text">Оформил ордер USDT - RUB, оператор быстро подтвердил получение крипты и перевел деньги. 5/5.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="reviews__slide">
            <div className="reviews__slide-user">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="reviews__slide-img" />
              <p className="reviews__slide-name">Иван Иванов</p>
            </div>
            <p className="reviews__slide-text">Оформил ордер USDT - RUB, оператор быстро подтвердил получение крипты и перевел деньги. 5/5.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Reviews