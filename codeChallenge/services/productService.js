import axios from "axios"



export function userLogin() {
    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/users/login",
      data: { email: "mrburnscayden@gmail.com", password: "Ilovecode420!@", tenantId:
      "U03NF742G04" },
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  
    
  };

var ProductService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities"
}


export function addEntity(payload){
    console.log(payload,"<---- payload inside of add entity, match the name to intepolation")
    const config = {
        method: "POST",
        url: `${ProductService.endpoint}/${payload.Name}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"}
      }
      return axios(config).then((response) => {return{...payload,id: response.data.item}}); 
   };

   const ProdService = {userLogin, addEntity}

   export default ProdService


