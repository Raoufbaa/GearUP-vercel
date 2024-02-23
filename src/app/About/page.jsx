"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faDiscord,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./about.module.css";
import Image1 from "@/assets/about/fur1.jpg";
import Image2 from "@/assets/about/fur2.jpg";
import Image3 from "@/assets/about/fur3.jpg";
import Image from "next/image";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h1 className={styles.title}>
          Discover {process.env.NEXT_PUBLIC_NAME}
        </h1>
        <p className={styles.description}>
          Welcome to the world of exquisite furniture at{" "}
          {process.env.NEXT_PUBLIC_NAME}. We take pride in curating an extensive
          collection of furniture pieces that blend aesthetics, functionality,
          and durability. Our team comprises passionate individuals dedicated to
          transforming your spaces into expressions of your personality and
          style.
        </p>
        <div className={styles.imageContainer}>
          <Image
            src={Image1}
            alt="Image 1"
            width={600}
            height={600}
            className={styles.image}
          />
          <Image
            src={Image2}
            alt="Image 2"
            width={600}
            height={600}
            className={styles.image}
          />
          <Image
            src={Image3}
            alt="Image 3"
            width={600}
            height={600}
            className={styles.image}
          />
          {/* Additional images showcasing our furniture collections */}
        </div>
        <h2 className={styles.subtitle}>Craftsmanship & Quality Assurance</h2>
        <p className={styles.description}>
          Every piece in our collection undergoes stringent quality checks to
          ensure it meets our high standards. From selecting premium materials
          to partnering with skilled artisans, we prioritize craftsmanship and
          attention to detail to offer furniture that lasts and elevates your
          living or working spaces.
        </p>
        {/* More content paragraphs */}

        {/* Contact information */}
        <p className={styles.description}>
          Email: info@{process.env.NEXT_PUBLIC_NAME}.com
          <br />
          Phone: +2130785848575
        </p>
        <p className={styles.description}>789 Experiment Boulevard,</p>
        <div className={styles.socialMediaIcons}>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
          </a>
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faDiscord} className={styles.socialIcon} />
          </a>
          <a
            href="https://twitter.com/?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
          </a>
          {/* Add more social media icons and links as needed */}
        </div>
        <p className={styles.description}>Click below to find us on the map:</p>
        <a
          href="https://www.google.com/maps/place/Universit%C3%A9+Ziane+Achour+-+Djelfa/@34.6526382,3.2881847,15.25z/data=!4m6!3m5!1s0x1289c53a1db4f9ed:0x421c93c0fea4f2f8!8m2!3d34.6539822!4d3.2845556!16s%2Fg%2F1hb_fv4w9?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkButton}
        >
          View Map
        </a>
      </motion.section>
    </div>
  );
};

export default About;
