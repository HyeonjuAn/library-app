import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ActivitiesCard from "../components/ActivitiesCard";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
    const { user_id } = useParams();
    const [activities, setActivities] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/user.php?user_id=${user_id}`);
                console.log("User Data: ", data);
                setUser(data.user);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get(
                    `/api/activities.php?user_id=${user_id}`,
                );
                console.log("User Activities: ", data);
                setActivities(data.activities);
            } catch (error) {
                console.error("Failed to fetch activities:", error);
            }
        })();
    }, []);

    return (
        <div className="dark:bg-gray-800 bg-white relative overflow-hidden min-h-screen w-full">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-14">
                <header className="text-gray-800 dark:text-white font-black text-3xl">
                    {user.Minit
                        ? `${user.Fname} ${user.Minit}. ${user.Lname}`
                        : `${user.Fname} ${user.Lname}`}
                </header>
                <div className="pt-10 text-gray-800 dark:text-white font-black text-xl">
                    {`${user.email}`}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-xl">
                    {activities &&
                        activities.map((activity) => (
                            <ActivitiesCard key={activity.activity_id} activity={activity} />
                        ))}
                </div>
                <div className="flex py-3 gap-5 justify-center items-center">
                    <Link to="/" className="btn btn-primary btn-md">
                        Home
                    </Link>
                    <Link to="/dashboard" className="btn btn-primary btn-outline btn-md">
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
