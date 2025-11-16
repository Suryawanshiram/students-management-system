import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (initialPage = 1, limit = 5) => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/students?page=${page}&limit=${limit}`
      );

      setStudents(Array.isArray(res.data.data) ? res.data.data : []);
      setMeta(res.data.meta || { page, limit, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/students-all`);

      // FIX: Make sure it's always an array
      setAllStudents(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error fetching all students", err);
      setAllStudents([]); // fallback
    }
  };

  useEffect(() => {
    fetchStudents(initialPage);
    fetchAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { students, allStudents, meta, loading, fetchStudents };
};

export default useFetch;
