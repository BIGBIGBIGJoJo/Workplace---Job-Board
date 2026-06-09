import React from 'react';
import { Link } from 'react-router-dom'

import { FaGithub } from "react-icons/fa";
import { MdDashboard, MdOutlineGroups, MdPersonSearch, MdWorkOutline } from "react-icons/md";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="bg-gray-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">About Workplace</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                A focused job board demo for seekers and employers.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-gray-300">
                Workplace is a full-stack job board project built to demonstrate account flows, searchable listings, employer posting tools, and protected user actions in one clear product.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-blue-100">Created by</p>
              <h2 className="mt-2 text-2xl font-bold">JoJo Mok</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Computer Science student at The Hong Kong Polytechnic University, exploring web development and product engineering.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <ValueCard
            icon={<MdPersonSearch />}
            title="For job seekers"
            description="Search roles, review job details, and build a profile before applying."
          />
          <ValueCard
            icon={<MdWorkOutline />}
            title="For employers"
            description="Post openings, manage listings, and review applicant activity from a dashboard."
          />
          <ValueCard
            icon={<MdDashboard />}
            title="For demos"
            description="Show full-stack product behavior with realistic jobs, forms, filters, and protected states."
          />
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Product focus</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-950">What this project demonstrates</h2>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              The goal is a practical hiring experience, not a static landing page. Every major surface is tied to a workflow: search, inspect details, sign in, post jobs, and manage listings.
            </p>
          </div>
          <div className="grid gap-4">
            <FeatureRow title="Searchable job listings" description="Keyword and job type filtering help users narrow a realistic job list." />
            <FeatureRow title="Protected profile and apply flows" description="Logged-out users get a clear account prompt before accessing protected actions." />
            <FeatureRow title="Employer dashboard" description="Employers can post roles, see overview metrics, and remove listings." />
            <FeatureRow title="MongoDB-backed API" description="Jobs and users are persisted through an Express API and MongoDB service." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Creator note</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-950">Built as a learning project with real product flows.</h2>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              This project is designed to be easy to demo, inspect, and extend. The next useful improvements would be persistent sessions, application submissions, saved jobs, and richer employer request management.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/jobs"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Browse jobs
              </Link>
              <a
                href="https://github.com/BIGBIGBIGJoJo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
              >
                <FaGithub className="text-lg" />
                GitHub
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <MdOutlineGroups className="text-4xl text-blue-700" />
            <h3 className="mt-4 text-xl font-bold text-gray-950">Who it is for</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              This demo is useful for portfolio review, classroom presentation, and early product conversations about how a job board should structure job seeker and employer workflows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, description }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <div className="text-4xl text-blue-700">{icon}</div>
    <h3 className="mt-4 text-lg font-bold text-gray-950">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
  </div>
);

const FeatureRow = ({ title, description }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
    <h3 className="text-sm font-bold text-gray-950">{title}</h3>
    <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
  </div>
);

export default AboutPage;
