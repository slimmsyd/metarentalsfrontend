import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Marketplace.module.scss";

import heroBg from "../asset/image/hero_3.svg";
import Image from "next/image";
import Head from "next/head";
import ProductCard from "../components/ProductCard";




const marketplace = () => {
  return (
    <div className={styles.marketplace}>
      <Head>

      <title>MetaRentals Marketplace</title>
        <meta name="description" content="Bridging community and Travel. Find vaction homes, apartments cabins on MetaRentals " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1>Lorem, ipsum dolor sit amet consectetur adipisicing.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            itaque quod neque nemo repudiandae ipsam ipsum assumenda, delectus
            tenetur!
          </p>
          <div>
              <button className={styles.exploreBtn}>
                  Explore Now
              </button>
              <button>
                  Upload Homes
              </button>
          </div>
        </div>
        <div className={styles.heroImg}>
          <Image src={heroBg} layout="responsive" />
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.title}>
          <h2>Available Homes</h2>
          <button className={styles.exploreBtn}> View All</button>
        </div>
        <div className={styles.productRow}>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default marketplace;
