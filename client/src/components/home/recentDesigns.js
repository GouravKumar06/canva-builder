"use client";

import { useEffect, useState } from "react";
// import { useEditorStore } from "@/store";
// import DesignList from "./design-list";
import { getUserDesigns } from "@/services/designService";

function RecentDesigns() {
  // const { userDesigns, userDesignsLoading } = useEditorStore();

  const [userDesigns,setUserDesigns] = useState([]);

  async function fetchUserDesigns(){
    const result = await getUserDesigns()

    if(result.success){
      setUserDesigns(result.data);
    }
  }

  useEffect(()=>{
    fetchUserDesigns();
  },[])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      {!userDesigns.length && <h1>No Design Found!</h1>}
      {/* <DesignList
        listOfDesigns={
          userDesigns && userDesigns.length > 0 ? userDesigns.slice(0, 4) : []
        }
        isLoading={userDesignsLoading}
        isModalView={false}
      /> */}
    </div>
  );
}

export default RecentDesigns;
