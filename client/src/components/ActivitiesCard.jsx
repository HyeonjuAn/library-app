import React from "react";

const ActivitiesCard = ({ activity }) => {
    return (
        <div className="card bg-base-100 shadow-xl mt-4 mb-4">
            <div className="card-body">
                <h2 className="card-title">{activity.activity_type}</h2>
                <p>{`Activity Timestamp: ${activity.timestamp}`}</p>
                <p>{`Activity ID: ${activity.activity_id}`}</p>
            </div>
        </div>
    );
};

export default ActivitiesCard;
