import React, { useRef, useState } from 'react';
import { FaStar } from "react-icons/fa";
import auth from '../../firebase.init';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-animated-slider/build/horizontal.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../../Components/Components.Masud/SwiperStyle.css";

// import "./styles.css";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import Loading from '../../Components/Components.Nahid/Loading';



const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"

};

const TrustedCFeedback = () => {

  const [user] = useAuthState(auth);
  const feedbackRef = useRef('');
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  
  const feedback = () => axios.get('https://online-bank-of-bd-server-production.up.railway.app/feedbacks');

  const {isLoading, data , refetch} = useQuery(["feedbacks"], feedback);

  const ourFeedback = data?.data;

  if(isLoading){
      return <Loading/>;
  }


  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }



  let newImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlLhGXqNvuYnsiYsH4yExdezxz3ePUS0t7dg&usqp=CAU'


  const sendFeedback = () => {
    const feedback = feedbackRef.current.value;
    const userName = user?.displayName;
    const email = user?.email;
    let userImg = user?.photoURL;
    // console.log(currentValue, feedback, userName, email, userImg);
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    if (!userImg) {
      userImg = newImg;
    }

    // console.log(ourFeedback);


    const feedbackDetails = {
      name: userName,
      img: userImg,
      email: email,
      feedbackStarts: currentValue,
      feedbackComment: feedback,
      date: date
    }
    // console.log(feedbackDetails)

    fetch('https://online-bank-of-bd-server-production.up.railway.app/feedback', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(feedbackDetails)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          toast.success('feedback submited')
          refetch();
        }
        else {
          toast.error('Something Wrong')
        }
      })
  }



  return (
    <div className=" bg-slate-100 mx-auto py-20">
      <section className=' w-full mx-auto text-gray-700'>
        <>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            // loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper max-w-7xl h-full"
          >
            {
              ourFeedback.map((feedback, index) => {

                return (
                  <div key={index} className="">
                    <SwiperSlide className='text-center bg-white py-10 rounded-2xl px-5 space-y-2'>
                      <h3 className="text-sm md:text-xl font-bold">{feedback?.name}</h3>
                      <img className="w-10 h-10 md:h-20 md:w-20 mx-auto rounded-full" src={feedback?.img} alt="" />
                      {

                        feedback?.feedbackStarts === 1 &&
                        <div className="rating">
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" checked/>
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                        </div>

                      }
                      {

                        feedback?.feedbackStarts === 2 &&
                        <div className="rating">
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" checked/>
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                        </div>

                      }
                      {

                        feedback?.feedbackStarts === 3 &&
                        <div className="rating">
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" checked/>
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                        </div>

                      }
                      {

                        feedback?.feedbackStarts === 4 &&
                        <div className="rating">
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" checked/>
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-gray-300" />
                        </div>

                      }
                      {

                        feedback?.feedbackStarts === 5 &&
                        <div className="rating">
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" />
                          <input name="rating-1" className="mask mask-star w-4 md:w-6  bg-green-500" checked/>
                        </div>

                      }

                      <p className="text-xs break-words md:text-sm">{feedback?.feedbackComment.length>100?`${feedback?.feedbackComment.slice(0,100)}...`:feedback?.feedbackComment}</p>
                    </SwiperSlide>
                  </div>
                )
              })
            }

          </Swiper>
        </>
      </section>

      <section>
        <div className='text-center'><label for="my-modal-6" className="btn btn-primary text-white animate-bounce w-26 h-6 modal-button">Give Feedback</label></div>
        <div>
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <label for="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

              <div style={styles.container}>
                <h2> Feedback Ratings </h2>
                <div style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10,
                          cursor: "pointer"
                        }}
                      />
                    )
                  })}
                </div>
                <textarea placeholder="What's your experience?" ref={feedbackRef} style={styles.textarea} />
                <div className="modal-action">
                  <label for="my-modal-6" className="btn" onClick={sendFeedback}>Submit</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};


      const styles = {
        container: {
        display: "flex",
      flexDirection: "column",
      alignItems: "center"
},
      stars: {
        display: "flex",
      flexDirection: "row",
},
      textarea: {
        border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300
},
      button: {
        border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
}

};



export default TrustedCFeedback;