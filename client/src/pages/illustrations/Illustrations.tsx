import { useEffect, useState } from "react";

import fetchContent from "../../util/fetchContent";

const Illustrations = () => {
  const [loading, isLoading] = useState(true);

  const setLoaded = () => {
    isLoading(false);
  };

  useEffect(() => {
    fetchContent("illustrations", "recent").then(() => setLoaded());
  }, []);

  return loading === true ? (
    <div className="mt-16"></div>
  ) : (
    <div>loading...</div>
  );
};

export default Illustrations;
