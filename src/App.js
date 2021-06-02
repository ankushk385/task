import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modal from "react-modal";

function App() {
  const [data, setData] = useState([])
  const [restaurantLength, SetRestaurantLength] = useState("")
  const [openModal, setOpenModal] = useState(false);
  const [outletName, setOutletName] = useState("")


  const url = 'https://eatoo.uberdoo.com/foodapp/public/api/guest/listRestaurant';

  const getData = ()=>{
    
    let data = { latitude:13.0358481, longitude:80.244455 } 

    axios.post(url, data).then((res) => {
      setData(res?.data?.listRestaurants)
      SetRestaurantLength(res?.data?.listRestaurants.length)
    }).catch((error)=>console.log(error)); 
  }

  const showOutlet = (name)=>{
    setOutletName(name)
   setOpenModal(true)
  }
  const showNothing = ()=>{
    console.log("only one outlet exsist")
  }
  const closeModal = ()=>{
    setOpenModal(false)
   }
  useEffect(() => {

    getData();

  }, [])

  

  
  
  return (
    <>
    <div className="container">
      <div className="list-container">
        <div className="div-titles">
          <h3>{restaurantLength} <span>RESTAURENTS</span></h3>
          <h3><span>RELEVANCE</span></h3>
          <h3> <span>FILTER</span></h3>
        </div>
        <ul className="item-list">
       { data.map((item)=>(
         <li key={item.restaurantId}>
          <div className="display-block">
           <div>   
             {
               //Check if restaurant has more then one outlet
             item?.outlet?.length > 1 ? 
             (<img src={item.restaurantImage} key={item?.outlet?.outletId}
              //  onClick={showOutlet(item?.outlet?.outletName)} alt="resturant"
                />) : 
             (<img src={item.restaurantImage} onClick={showNothing}  alt="resturant" />)
             }
               
              </div>
           <div className="div-items"> 
           <div><h3>{item.restaurantName}</h3></div>
              
         <div className="div-subitems">
            <div >
              <h5>Time</h5>
            <span>{item.displayTime}</span>
             </div>
            <div>
            <h5>Price</h5>
              <span>{item.displayCostForTwo}</span> 
            </div>
            <div>
            <h5>Rating</h5>
              <span>{item.averageReview}</span>    
            </div>
            </div>        
         </div>
          </div>
           </li>
        ))}
        </ul>
      </div>

     

      <Modal
            isOpen={openModal}
            ariaHideApp={false}
            className="mymodal"
            overlayClassName="myoverlay"
          >
            <label htmlFor="">resturant name</label>
            <h5>{outletName}</h5>
            
            <button onClick={closeModal}>close</button>
          </Modal>
    </div>
    </>
  );

      }
export default App;
