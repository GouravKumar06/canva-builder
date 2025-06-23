import { fetchWithAuth } from "./baseService";


export async function getUserDesigns(){
    return fetchWithAuth("/v1/design/userDesigns");
}

export async function getDesignById(id){
    return fetchWithAuth(`/v1/design/userDesign/${id}`);
}

export async function saveDesign(designData,designId = null){
    return fetchWithAuth(`/v1/design/saveDesign/`,{
        method : "POST",
        body :{
            designId,
            ...designData
        }
    });
}


export async function deleteDesign(id){
    return fetchWithAuth(`/v1/design/deleteDesign/${id}`, {
      method: "DELETE",
    });
}