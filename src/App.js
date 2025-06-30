import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./Components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { eventDetails } from "./Pages/detailsArr";
import useFetch from "./useFetch";

function App() {
  const [selectedEventType, setSelectedEventType] = useState("Both");
  const [searchItem, setSearchItem] = useState("");
  const { data, loading, error } = useFetch(
    "https://meetup-events-data.vercel.app/events",
    []
  );

  const filteredEvents = data.filter((event) => {
    const matchTypes =
      selectedEventType === "Both" || selectedEventType === event.type;

    const matchSearch = event.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());

    const matchTags = event.eventTags.find(
      (tag) => tag.toLowerCase() === searchItem.toLowerCase()
    );

    return (matchTypes && matchSearch) || matchTags;
  });

  return (
    <main className="bg-body-tertiary">
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
      <div className="container">
        <div className="row py-2">
          <div className="d-flex justify-content-between">
            <h1 className="display-5 fw-bold">Meetup Events</h1>
            <div className="col-2">
              <div className="dropdown w-100">
                <button
                  className="btn border dropdown-toggle w-100 bg-white"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedEventType}
                </button>

                <ul className="dropdown-menu w-100">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedEventType("Both")}
                    >
                      Both
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedEventType("Offline Event")}
                    >
                      Offline Event
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedEventType("Online Event")}
                    >
                      Online Event
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {loading && <p>Loading.....</p>}
        <div className="row">
          {filteredEvents.map((event) => (
            <div className="col-md-4 py-4 ps-5" key={event._id}>
              <div className="h-100">
                <Link
                  to={`/eventDetails/${event._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="position-relative">
                    <img
                      src={event.imgUrl}
                      className="card-img-top object-fit-cover rounded"
                      alt={event.name + "_Image"}
                      style={{ height: "300px" }}
                    />
                    <div className="position-absolute top-0 start-0 bg-light rounded px-3 py-1 m-2">
                      {event.type}
                    </div>
                  </div>
                  <small className="text-body-secondary">
                    {event.startDate} • {event.startTime}
                  </small>
                  <h5 className="card-title">{event.name}</h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
