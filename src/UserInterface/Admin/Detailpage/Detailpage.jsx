import React from 'react';
import './Detailpage.css';
import { FcReading } from "react-icons/fc";
import { FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
const Detailpage = ({ description }) => {
  return (
    <div>
      <div className="bookdetails">
        <h2>Book And Details</h2>
      </div>

      <div className="bookdetail1">
        <h1>Author: A.K Rowling</h1>
      </div>
      <div className="views">
        <div className="views1">
          <button><FcReading /></button>
        </div>
        <div className="view2">
          <button><FaBookmark /></button>
        </div>
        <div className="view3">
          <button><FaRegHeart /></button>
        </div>
      </div>
      <hr />

      <div className="detailofbook">
        <h2>Synopsis</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Detailpage;
