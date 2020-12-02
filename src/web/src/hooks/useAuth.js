import defaultAxios from "axios";
import { useEffect, useState } from "react";

const useAuth = (opts, token) => {
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

  const authAxios = defaultAxios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  useEffect(() => {
    if (!opts.url) {
      return;
    }
    if (!token) {
      return;
    }
    authAxios(opts)
      .then((data) => {
        setstate({ ...state, loading: false, data });
      })
      .catch((error) => {
        setstate({ ...state, loading: false, error });
      });

    return;
  }, [token]);
  return { ...state, refetch };
};

export default useAuth;
