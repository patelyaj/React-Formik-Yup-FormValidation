import React from "react";
// import {useFormik} from 'Formik'
// import * as Yup from 'yup'

import Login from "../pages/Login";
import Products from "../pages/ProtectedPages/Products";
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import ProtectedPages from "../pages/ProtectedPages/ProtectedPages";
import Form from "../pages/ProtectedPages/Form";
function App() {
  return (
    <>
      {/* <h1>formik yup</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>


          <Route path="/products"
            element={
              <ProtectedPages>
                <Products/>
              </ProtectedPages>
            }
          />

          <Route path="/updateProduct/:id"
            element={
              <ProtectedPages>
                <Form/>
              </ProtectedPages>
            }
          />

          <Route path="/addProduct/"
            element={
              <ProtectedPages>
                <Form/>
              </ProtectedPages>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;