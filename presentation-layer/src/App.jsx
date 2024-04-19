import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import CenterList from "./components/CenterList";
import { SmileCenterService } from "./services/SmileCenter";

function App() {
  const [smileCenters, setSmileCenters] = useState([]);
  const [error, setError] = useState({ flag: false, message: "" });

  useEffect(() => {
    const getSmileCenters = async () => {
      if (smileCenters.length < 1) {
        const smileCenterService = new SmileCenterService();
        const data = await smileCenterService.getSmileCenters(undefined).catch((error) => {
          setError({ flag: true, message: error.message });
          setTimeout(() => {
            setError({ flag: false, message: "" });
          }, 4000);
        });

        if (!data) return;
        if (data.success) setSmileCenters(data.records);
      }
      return;
    };
    getSmileCenters();
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form setSmileCenters={setSmileCenters} error={error} setError={setError} />
        <CenterList smileCenters={smileCenters} setSmileCenters={setSmileCenters} />
      </div>
    </div>
  );
}

export default App;
