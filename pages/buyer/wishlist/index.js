import React, { useState } from "react";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";

const { response, isLoading } = useFetchAxios("/api/userdata/getUser/:id");

const index = () => {
  
  return (
    <div>
           {
             !response || isLoading ? <AppLoader/> :
             <div>
               {
                 response.wishlist.map((x)=>(
                   <div>
                      <p>{x.name}</p>
                      <p>{x.description}</p>
                      <p>{x.price}</p>
                  </div>
                 )) 
               }
              </div> 
           }
    </div>
  );
};

export default index;
