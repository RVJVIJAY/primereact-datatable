import React, { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Selection from "./Selection";
const ApiBase = () => {
  const api = `https://jsonplaceholder.typicode.com/users`;
  const [users, setusers] = useState([]);
  const [select, setselect] = useState([]);
  const [fileterdata, setfilterdata] = useState([]);
  const [search, setserch] = useState("");
  const [row, setrow] = useState(3);
  const rowoption = [3, 5, 10, 25];
  const Getdata = async () => {
    try {
      const data = await fetch(api);
      const res = await data.json();
      setusers(res);
      setfilterdata(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Getdata();
  }, []);

  const setsearchchange = (e) => {
    const value = e.target.value.toLowerCase();
    setserch(value);
    console.log(value);
    const searchresult = users.filter((val) => {
      return (
        val.name.toLowerCase().includes(value) ||
        val.address.city.toLowerCase().includes(value)
      );
    });
    setfilterdata(searchresult);
  };

  return (
    <div className="container">
      <div className="input-container">
        <label>Seach By name or city :</label>
        <InputText
          value={search}
          onChange={setsearchchange}
          placeholder="Search by name or city"
          className="inputbox"
        />
      </div>
      <div className="pageheader">
        <label>select row per page</label>
        <Dropdown
          value={row}
          onChange={(e) => setrow(e.value)}
          placeholder="select row per page"
          options={rowoption}
          className="dropdown"
        />
      </div>

      <DataTable
        value={fileterdata}
        rows={row}
        selection={select}
        onSelectionChange={(e) => setselect(e.value)}
        selectionMode="multiple"
        paginator
        className="table"
      >
        <Column className="col" sortable field="id" header="ID"></Column>
        <Column
          className="col"
          sortable
          field="name"
          header="NAME"
          filter
          filterPlaceholder="search by name"
        ></Column>
        <Column className="col" sortable field="email" header="EMAIL"></Column>
        <Column
          className="col"
          sortable
          field="address.city"
          header="CITY"
        ></Column>
      </DataTable>

      {
        <Selection select={select}/>
      }
    </div>
  );
};

export default ApiBase;
