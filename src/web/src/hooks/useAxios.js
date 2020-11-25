import defaultAxios from "axios";
import { useEffect, useState } from "react";

const useAxios = (opts, menu, axiosInstance = defaultAxios) => {
  const [state, setstate] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const refetch = () => {
    setstate({
      ...state,
      loading: true,
    });
  };
  useEffect(() => {
    if (!opts.url) {
      return;
    }
    axiosInstance(opts)
      .then((data) => {
        setstate({ ...state, loading: false, data });
      })
      .catch((error) => {
        setstate({ ...state, loading: false, error });
      });
  }, [menu]);
  return { ...state, refetch };
};

export default useAxios;
