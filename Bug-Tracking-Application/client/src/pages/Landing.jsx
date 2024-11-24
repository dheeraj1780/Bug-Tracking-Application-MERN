import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Landing";
import Logo from "../assets/images/logo.png";
import Typewriter from "typewriter-effect";

const Landing = () => {
  return (
    <Wrapper>
      <nav>{Logo}</nav>
      <div className="container page">
        <h1>
          <Typewriter
            options={{
              strings: ["Bug Tracking Application"],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
          />
        </h1>
        <h2>Pick n Solve n Growww...</h2>
        <p>
          With so many different marketing and sales platforms available to
          companies, it's no wonder that marketers are turning to artificial
          intelligence (AI) to help them manage their campaigns. AI can help
          create more effective campaigns by bringing together all the different
          aspects of a campaign, from customer segmentation to media and
          creative optimization to automating follow -up emails and messages. In
          a similar way, sales teams are using AI tools to close more deals by
          using machine learning to understand what makes each lead or account
          unique, allowing sales reps to go back-and-forth with prospects in
          ways that will be most effective for them. By using AI tools like
          these, companies can streamline their processes and experience better
          results.
        </p>
        <Link to="/login" className="btn">
          Login Go
        </Link>
      </div>
    </Wrapper>
  );
};

export default Landing;
