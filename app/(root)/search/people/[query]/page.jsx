"use client"

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import UserCard from "@components/cards/UserCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPeople = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedPeople, setSearchedPeople] = useState([]);

  const getSearchedPeople = async () => {
    const response = await fetch(`/api/user/search/${query}`);
    const data = await response.json();
    setSearchedPeople(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedPeople();
  }, [query]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className="tab bg-dark-2" href={`/search/posts/${query}`}>
          Posts
        </Link>
        <Link className="tab bg-purple-1" href={`/search/people/${query}`}>
          People
        </Link>
      </div>

      {searchedPeople.map((person) => (
        <UserCard key={person._id} userData={person} update={getSearchedPeople}/>
      ))}
    </div>
  );
};

export default SearchPeople;
