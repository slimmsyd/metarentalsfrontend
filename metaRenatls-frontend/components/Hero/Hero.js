import React from "react";
import styles from "./Hero.module.scss";
import heroBg from "../../asset/image/hero_3.svg";
import homeBg from '../../asset/image/Home.png'
import Image from "next/image";
const Hero = () => {
  return (
    <div className={styles.Hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1>
            Welcome to <span>MetaRentals</span>
          </h1>
          <p>
            Bridging the home owner to guests in a decentralized manner It is
            secure, safe and trust. 
          </p>
          <button className="btn cta-btn">Explore</button>
        </div>
        <div className={styles.heroImg}>
          <Image src={homeBg} alt="Hero-background" layout="responsive" />
          <div className = {styles.heroImgUnder}>
            <button className = {styles.heroButton}>Go To Marketplace</button>
          </div>
        </div>
        <div className={styles.heroInfo}>
          <div className={styles.heroInfoCaption}>
            <div className={styles.heroIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 256 256"
              >
                <rect fill="none"></rect>
                <path
                  d="M216,216V115.5a8.3,8.3,0,0,0-2.6-5.9l-80-72.7a8,8,0,0,0-10.8,0l-80,72.7a8.3,8.3,0,0,0-2.6,5.9V216"
                  fill="none"
                  stroke="#f7f7f7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <line
                  x1="16"
                  y1="216"
                  x2="240"
                  y2="216"
                  fill="none"
                  stroke="#f7f7f7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <path
                  d="M152,216V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v56"
                  fill="none"
                  stroke="#f7f7f7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
              </svg>
            </div>
            <h3>Multiple Homes Around </h3>
            <p>
             Explore our property listings, much to choose from!
            </p>
          </div>
          <div className={styles.borderLine}></div>
          <div className={styles.heroInfoCaption}>
            <div className={styles.heroIcon}>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3>A Rewarding DAO</h3>
            <p>
            Partipciate in the DAO, this is a community effort!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
