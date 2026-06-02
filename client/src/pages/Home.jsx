import { Link } from "react-router-dom";
import Footer from "../components/Footer"

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section
        className="
          bg-slate-900
          text-white
          py-16
          text-center
        "
      >

        <h1 className="text-6xl font-bold mb-6">
          Find Your Dream Job Today
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Connecting talented people with amazing opportunities.
        </p>

        <p className="italic text-gray-500 mb-8">
          "Success is where preparation and opportunity meet."
        </p>

        <Link
          to="/jobs"
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-blue-700
          "
        >
          Browse Jobs
        </Link>

      </section>

      {/* Statistics Section */}
      <section className="grid md:grid-cols-3 gap-6 px-10 mb-20">

        <div className="shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-3xl font-bold text-blue-600">
            1000+
          </h2>

          <p>
            Jobs Posted
          </p>
        </div>

        <div className="shadow-xl rounded-lg p-6 bg-white">
          <h2 className="text-3xl font-bold text-green-600">
            500+
          </h2>

          <p>
            Companies
          </p>
        </div>

        <div className="shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-3xl font-bold text-purple-600">
            2000+
          </h2>

          <p>
            Candidates
          </p>
        </div>

        

      </section>
      <Footer />
    </div>
  );
  
}

export default Home;