import { Link } from "react-router-dom";

const SeriesCard = ({ series }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/series/${series.series_id}`} className="link link-hover">
                        {series.Name}
                    </Link>
                </h2>
                <p>
                    {series.start_year} - {series.end_year}
                </p>
                <p>{series.description}</p>
            </div>
        </div>
    );
};

export default SeriesCard;
