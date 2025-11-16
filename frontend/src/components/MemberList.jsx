import { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import axios from "axios";

import FormModal from "./FormModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
import SearchBar from "./SearchBar.jsx";
import MemberTable from "./MemberTable.jsx";

const MemberList = () => {
  const { students, allStudents, meta, loading, fetchStudents } = useFetch(
    1,
    5
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const filteredStudents = allStudents.filter((s) =>
    `${s.name} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const dataToShow = search.trim() ? filteredStudents : students;

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${BASE_URL}/student/${selectedId}`);
      fetchStudents(meta.page);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div
      className="container w-100 min-vh-100 p-4"
      style={{ background: "#eef2f3" }}
    >
      <div className="card p-3">
        <h3 className="mb-4">All Members</h3>

        <div className="d-flex justify-content-between mb-3">
          <SearchBar value={search} onChange={setSearch} />
          <button
            className="btn btn-success"
            onClick={() => setShowAddModal(true)}
          >
            Add New Member
          </button>
        </div>

        <FormModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          fetchStudents={fetchStudents}
        />

        {loading && <p className="text-center">Loading...</p>}

        {!loading && dataToShow.length === 0 && (
          <p className="text-center text-muted fw-semibold py-3">
            ❌ No members found
          </p>
        )}

        {!loading && dataToShow.length > 0 && (
          <MemberTable
            filtered={dataToShow}
            meta={meta}
            openDeleteModal={openDeleteModal}
          />
        )}

        <DeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleConfirm={handleDeleteConfirm}
          message="If you delete this Member, it cannot be undone."
        />

        {/* pagination */}
        <div className="d-flex justify-content-end mt-3">
          <ul className="pagination pagination-sm">
            <li className="page-item">
              <button
                className="page-link"
                disabled={meta.page === 1}
                onClick={() => fetchStudents(1)}
              >
                First
              </button>
            </li>

            <li className="page-item">
              <button
                className="page-link"
                disabled={meta.page === 1}
                onClick={() => fetchStudents(meta.page - 1)}
              >
                Previous
              </button>
            </li>

            <li className="page-item active">
              <span className="page-link">{meta.page}</span>
            </li>

            <li className="page-item">
              <button
                className="page-link"
                disabled={meta.page === meta.totalPages}
                onClick={() => fetchStudents(meta.page + 1)}
              >
                Next
              </button>
            </li>

            <li className="page-item">
              <button
                className="page-link"
                disabled={meta.page === meta.totalPages}
                onClick={() => fetchStudents(meta.totalPages)}
              >
                Last
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
