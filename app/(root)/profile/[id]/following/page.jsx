"use client"

import Loader from "@components/Loader";
import ProfileCard from "@components/cards/ProfileCard";
import UserCard from "@components/cards/UserCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Following = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Following" />

      <div className="flex flex-col gap-9">
        {userData?.following?.map((person) => (
          <UserCard key={person._id} userData={person} update={getUser}/>
        ))}
      </div>
    </div>
  );
};

export default Following;
