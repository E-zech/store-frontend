import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { GeneralContext } from '../../App';
import "./CustomerMenagment.css";
import '../../css/grid.css';
import { RoleTypes } from "../../utils/constants";

export default function CustomerMenagment() {
  const [allClients, setAllClients] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const { setLoader, mainTitleMode } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    fetch(`http://localhost:5000/users`, {
      credentials: 'include',
      headers: {
        'Authorization': localStorage.token
      },
    }).then(res => res.json())
      .then((data) => {
        // Filter out clients with role types greater than 3 (admin, master)
        const filteredClients = data.filter(client => client.roleType <= RoleTypes.business);
        setAllClients(filteredClients);
      }).finally(() => setLoader(false))
  }, [refresh]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.4,
      justifyContent: 'center',
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`
    },

    { field: 'email', headerName: 'Email', flex: 0.5 },

    {
      field: 'Phone',
      headerName: 'Phone',
      flex: 0.5,
      renderCell: (params) => (
        <div>
          {params.row.phone}
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params) => (
        <DeleteIcon onClick={() => handleDelete(params.row._id)} style={{ cursor: 'pointer' }} />
      ),
    }
  ];

  const handleDelete = (clientID) => {
    setLoader(true);
    const confirm = window.confirm(`are you sure you want to delte user ${clientID} ?`);
    if (!confirm) {
      setLoader(false);
      return;
    }
    fetch(`http://localhost:5000/users/${clientID}`, {
      credentials: 'include',
      headers: { 'Authorization': localStorage.token },
      method: 'DELETE',
    })
      .then(() => {
        setRefresh([{}]);
      }).finally(() => setLoader(false))
  };

  return (
    <>
      <header>
        <h1 className="main-title" style={mainTitleMode}>Customer Management</h1>
      </header>

      <section className="tableContainer">
        <DataGrid
          rows={allClients}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id} />
      </section>
    </>
  );
}
