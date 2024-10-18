import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const App = () => {
  //without api
  const [select, setselect] = useState([]);
  const users = [
    { id: 1, name: "Vijay", age: 21, city: "Madurai" },
    { id: 2, name: "Arjun", age: 22, city: "Chennai" },
    { id: 3, name: "Ananya", age: 23, city: "Coimbatore" },
    { id: 4, name: "Priya", age: 20, city: "Tiruchirappalli" },
    { id: 5, name: "Kumar", age: 24, city: "Erode" },
    { id: 6, name: "Sneha", age: 19, city: "Salem" },
    { id: 7, name: "Ravi", age: 26, city: "Madurai" },
    { id: 8, name: "Lakshmi", age: 27, city: "Kanyakumari" },
    { id: 9, name: "Rahul", age: 25, city: "Tirunelveli" },
    { id: 10, name: "Deepa", age: 22, city: "Vellore" },
  ];
  return (
    <div>
      <DataTable
        value={users}
        selection={select}
        onSelectionChange={(e) => setselect(e.value)}
        rows={5}
        paginator
        selectionMode="multiple"
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="name" header="NAME" sortable></Column>
        <Column field="age" header="AGE" sortable></Column>
        <Column
          field="city"
          header="CITY"
          sortable
          filter
          filterPlaceholder="search by city name"
        ></Column>
      </DataTable>
      {select &&
        select.map((item) => {
          return (
            <div>
              <h3>Selected users:</h3>
              <p>ID: {item.id}</p>
              <p>Name: {item.name}</p>
              <p>Age: {item.age}</p>
              <p>City: {item.city}</p>
            </div>
          );
        })}
    </div>
  );
};

export default App;
