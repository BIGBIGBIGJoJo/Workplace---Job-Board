import React, { useEffect, useState } from 'react'
import JobListing from '../../components/JobListing'
import { useSearchParams } from 'react-router-dom';

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState("All");
  const [keyword, setKeyword] = useState(() => searchParams.get("keyword") || "");

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      setSearchParams({ keyword: trimmedKeyword });
      return;
    }

    setSearchParams({});
  };

  return (
    <>
      <nav>
        <form
          className="mx-auto my-6 flex w-[92%] max-w-4xl justify-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm"
          onSubmit={handleSubmit}
        >
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="min-w-32 bg-gray-50 rounded-l-md font-bold py-3 pl-2 border-r border-r-gray-300 z-10"
          >
            <option className="bg-gray-50 font-bold" value="All">All</option>
            <option className="bg-gray-50 font-bold" value="part-time">Part-time</option>
            <option className="bg-gray-50 font-bold" value="full-time">Full-time</option>
            <option className="bg-gray-50 font-bold" value="internship">Internship</option>
            <option className="bg-gray-50 font-bold " value="temporary">Temporary</option>
          </select>

          <input
            className="min-w-0 flex-1 bg-gray-50 px-3 outline-none"
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search job title, company, or location"
          />
          <button type="submit" className="cursor-pointer px-4 py-2 border-transparent text-sm font-semibold rounded-r-md text-white bg-blue-800 hover:bg-blue-900">Search</button>
        </form>
      </nav>
      <JobListing keyword={keyword} type={type} />
    </>
  )
}

export default JobsPage
