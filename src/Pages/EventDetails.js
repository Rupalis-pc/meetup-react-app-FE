import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";

const EventDetails = () => {
  const { eventId } = useParams();
  const [searchItem, setSearchItem] = useState("");
  const {
    data: selectedEventData,
    loading,
    error,
  } = useFetch(`https://meetup-events-data.vercel.app/events/${eventId}`);

  if (loading) return <p>Loading.....</p>;

  if (error) return <p>Error Loading data, {error}</p>;

  if (!selectedEventData) return <p>Event not found</p>;

  return (
    <main className="bg-body-tertiary py-2">
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="py-2 fw-bold">{selectedEventData.name}</h1>
            <p>
              <span className="text-secondary">Hosted By:</span> <br />
              <strong>{selectedEventData.hostedBy}</strong>
            </p>

            <img
              src={selectedEventData.imgUrl}
              className="card-img-top py-4"
              height="450px"
            />
            <div>
              <h4>Details:</h4>
              <p>{selectedEventData.details}</p>
            </div>
            <div>
              <h4>Additional Information:</h4>
              <p>
                <strong>Dress Code: </strong>
                {selectedEventData.dressCode} <br />
                <strong>Age Restrictions: </strong>
                {selectedEventData.isAgeRestriction
                  ? "18 and Above"
                  : "No Age Restriction"}
              </p>
            </div>
            <div>
              <h4>Event Tags:</h4>
              <div className="gap-2 d-md-flex">
                {selectedEventData.eventTags.map((tag) => (
                  <button className="btn btn-danger">{tag}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 py-2 ms-auto">
            <div style={{ width: "70%", float: "right" }}>
              <div className="card p-4 gap-4 border-0 rounded-2 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-clock"></i>
                  <div>
                    {selectedEventData.startDate +
                      " at " +
                      selectedEventData.startTime +
                      " to "}{" "}
                    {selectedEventData.endDate +
                      " at " +
                      selectedEventData.endTime}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ color: "grey" }}
                  ></i>
                  <div>{selectedEventData.address}</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-currency-rupee"></i>
                  <div>{selectedEventData.price}</div>
                </div>
              </div>

              <div>
                <h4>
                  Speakers: {"(" + selectedEventData.speakers.length + ")"}
                </h4>
                <div className="row">
                  {selectedEventData.speakers.map((person) => (
                    <div className="col-md-6">
                      <div
                        className="card text-center p-3 shadow-sm border-0 mb-3"
                        style={{ borderRadius: "15px", height: "180px" }}
                      >
                        <img
                          src={person.imgUrl}
                          className="card-img-top rounded-circle mx-auto d-block"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          alt={person.name}
                        />

                        <div className="card-body">
                          <h6 className="card-title fw-bold mb-0">
                            {person.name}
                          </h6>
                          <p className="card-text">{person.position}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
