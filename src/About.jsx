import React from 'react';


const About = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>Your go-to destination for ordering food from the best restaurants in town.</p>
      </header>
      <section className="about-us-content">
        <h2>Our Story</h2>
        <p>
          Established in 2024, our mission is to bring the best culinary experiences from a variety of restaurants
          directly to your doorstep. Whether you're craving local delicacies or international cuisines, we've got you covered.
        </p>
      </section>
      <section className="about-us-mission">
        <h2>Our Mission</h2>
        <p>
          We aim to connect food lovers with their favorite restaurants effortlessly. Our platform offers a seamless
          ordering experience, timely delivery, and exceptional customer service to ensure every meal is a delight.
        </p>
      </section>
      <section className="about-us-values">
        <h2>Our Values</h2>
        <ul>
          <li><span>Quality: </span> We partner with top-rated restaurants to provide the best food quality.</li>
          <li><span>Convenience:</span> Easy ordering process and fast delivery.</li>
          <li><span>Customer Satisfaction:</span> We prioritize our customers' needs and feedback.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
