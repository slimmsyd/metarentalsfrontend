import React from "react";
import styles from "./styles.module.scss";

const ProductCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src="/hero_3.svg" alt="" />
      </div>
      <div className={styles.description}>
        <h3>2 Bedroom Apartment</h3>
        <div className={styles.cardDetails}>
          <div className={styles.creator}>
            <div className={styles.creatorImg}>
              <img src="/bio.svg" alt="creator-bio" />
            </div>
            <div>
              <h4>@Producer1</h4>
              <span>creator</span>
            </div>
          </div>
          <div className={styles.price}>
            <h4>3.25 MATIC</h4>
            <span>Price</span>
          </div>
        </div>
       
      </div>
      <div className={styles.btn}>
            <button>
                Buy Now
            </button>
        </div>
    </div>
  );
};

export default ProductCard;
