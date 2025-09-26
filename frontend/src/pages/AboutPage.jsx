import React from 'react';
import { Link } from 'react-router-dom'

import { SiTicktick } from "react-icons/si";
import { IoExtensionPuzzle } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import PersonCard from "../components/PersonCard";

const AboutPage = () => {
  // could be improved

  return (
    <div className="font-sans text-gray-800">

      <header className="bg-gray-900 text-white py-6">
        <div className="mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">About Me</h1>
        </div>
      </header>

      <section className="py-16 bg-gray-100">
        <div className="mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Who Am I</h2>
            <p className="text-lg text-gray-600">
              Hey I'm JoJo! I'm a Computer Science major student in The Hong Kong Polytechnic University who is interested in Web Dev and plan to explore Game Dev. This page is a demo of about page.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-8">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <SiTicktick className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">Innovation</h3>
                <p className="text-gray-600 text-center">
                  We push boundaries to create cutting-edge solutions that drive progress.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <IoExtensionPuzzle className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">Collaboration</h3>
                <p className="text-gray-600 text-center">
                  We believe in the power of teamwork to achieve extraordinary results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <PersonCard name={"JoJo Mok"} title={"CEO & Founder"} description={"That is me."} />

            <PersonCard name={"Elvis Ng"} title={"Chief Operating Officer"} description={"Elvis sometimes give me advise.."} />

            <PersonCard name={"Derek Liu"} title={"Head of Innovation"} description={"Derek is Derek."} />

          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-6">
            We're here to help you succeed. Reach out to us for any inquiries or to learn more about our services.
          </p>
          <Link
            to="https://github.com/BIGBIGBIGJoJo" target="_blank"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;