import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import RunningPlans from "./components/pages/RunningPlans";
import RunningTracking from './components/pages/RunningTracking';


function App() {
  const [appNum, setAppNum] = useState(0);

  const s1 = [
    {
      id: 1,
      times: 0,
      star: 112,
      checked: false,
      name: "Jovana (27)",
      added: false,
      date: "4. septembar 2023. 19:00h",
      text: "Ja sam Jovana, strastvena trkačica koja obožava jutarnje trčanje kroz park. Planiram trku od 10 km sa tempom od 6 minuta i 30 sekundi po kilometru. Pridruži mi se 5. septembra 2023. u 7:00 ujutru na ovoj energičnoj trci.",
      src: "https://lh3.googleusercontent.com/7ho6VaN-QkThBYOX2bA6ka9nh3gvp94_o4bCYByNRXeMzqQOdDYRPObmxP5L0p3Tb9h7C-dGXXEdBBU4iA0GZELodn5FoUY3w6FHc0ASdETsC_EI=s1200",
    },
    {
      id: 2,
      times: 0,
      star: 184,
      checked: false,
      name: "Marina (25)",
      added: false,
      date: "5. septembar 2023. 19:00h",
      text: "Ja sam Marina, zaljubljenica u prirodu koja organizuje trku kroz staze blizu reke. Moj plan trčanja zakazan je za 15. septembar 2023. sa tempom od 6 minuta po kilometru na udaljenosti od 12 km. Pridruži mi se na ovoj trci punoj svežeg zraka i prijateljske atmosfere.",
      src: "http://www.marathondynamics.com/uploads/Roz%20at%20Goodlife%20Marathon.jpg",
    },
    {
      id: 3,
      times: 0,
      star: 178,
      checked: false,
      name: "Stefan (58)",
      added: false,
      date: "6. septembar 2023. 19:00h",
      text: "Ja sam Stefan, iskusan trkač koji planira gradsku trku 20. septembra 2023. Sa tempom od 5 minuta i 15 sekundi po kilometru, pozivam sve trkače da se pridruže ovoj uzbudljivoj avanturi.",
      src: "https://1.bp.blogspot.com/-NUIr4r-OQ5w/XikecLk6qlI/AAAAAAAAXVo/G5Jdb0T7T8Yt9RzSwSED2X4Z2F70BtjQQCLcBGAsYHQ/s1600/Paul%2BNY%2BMar%2B09%2BFetscher.jpg",
    },
  ];

  const s2 = [
    {
      id: 4,
      times: 0,
      star: 165,
      checked: false,
      name: "Marko (30)",
      added: false,
      date: "7. septembar 2023. 19:00h",
      text: "Ja sam Marko, entuzijastičan trkač koji želi motivisati zajednicu kroz trčanje. Organizujem trku 12. septembra 2023. sa ciljem od 8 km i tempom od 5 minuta i 45 sekundi po kilometru. Pozivam da mi se pridružiš i da zajedno postignemo svoje trkačke ciljeve. Biće to dinamično iskustvo koje ne želiš propustiti!",
      src: "https://sportsmatik.com/uploads/world-events/players/kenenisa-bekele_1564492297.jpg",
    },
    {
      id: 5,
      times: 0,
      star: 189,
      checked: false,
      added: false,
      date: "8. septembar 2023. 19:00h",
      name: "Ognjen (29)",
      text: "Ja sam Nenad, strastveni trkač koji obožava brze ritmove. Pozivam vas na svoj plan trčanja 30. septembra 2023. Sa tempom od 5 minuta i 30 sekundi po kilometru, planiram trku od 15 km. Ako volite izazove i dugotrajne staze, pridružite mi se na ovoj trci i zajedno doživimo snagu trčanja.",
      src: "https://www.runnersgoal.com/wp-content/uploads/2022/06/Depositphotos_22312531_S.jpg",
    },
    {
      id: 6,
      times: 0,
      star: 178,
      checked: false,
      name: "Anja (21)",
      added: false,
      date: "9. septembar 2023. 19:00h",
      text: "Ja sam Anja, zaljubljena u trčanje i obožavateljka jutarnjih trka. Planiram organizovati opuštenu trku kroz gradsku šetališnu zonu 15. oktobra 2023. s tempom od 6 minuta po kilometru na stazi od 8 km. Ova trka je savršena za sve devojke koje žele uživati u trčanju i druženju.",
      src: "https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const [appts, setAppts] = useState([]);

  const [services1, setSer1] = useState(s1);

  const [services2, setSer2] = useState(s2);

  const star1 = (serviceId) => {
    let arr1 = [];
    services1.forEach((element) => {
      if (element.id === serviceId) {
        if (!element.checked) {
          console.log(element);
          element.star = element.star + 1;
          element.checked = true;
          console.log(element);
          arr1.push(element);
        }
      } else {
        arr1.push(element);
      }
    });
    setSer1(arr1);
    console.log(services1);

    let arr2 = [];
    services2.forEach((element) => {
      if (element.id === serviceId) {
        if (!element.checked) {
          element.star = element.star + 1;
          element.checked = true;
          arr2.push(element);
        }
      } else {
        arr2.push(element);
      }
    });
    setSer2(arr2);
    console.log(services2);
  };

  const star2 = (serviceId) => {
    let arr1 = [];
    services1.forEach((element) => {
      if (element.id === serviceId) {
        if (element.checked) {
          element.star = element.star - 1;
          element.checked = false;
          console.log(element);
          arr1.push(element);
        }
      } else {
        arr1.push(element);
      }
    });
    setSer1(arr1);

    let arr2 = [];
    services2.forEach((element) => {
      if (element.id === serviceId) {
        if (element.checked) {
          element.star = element.star - 1;
          element.checked = false;
          arr2.push(element);
        }
      } else {
        arr2.push(element);
      }
    });
    setSer2(arr2);
  };

  const makeApnt = (serviceId) => {
    services1.forEach((element) => {
      if (element.id === serviceId) {
        if (element.added === false) {
          setAppNum(appNum + 1);
          element.added = true;
        }
      }
    });
    services2.forEach((element) => {
      if (element.id === serviceId) {
        if (element.added === false) {
          setAppNum(appNum + 1);
          element.added = true;
        }
      }
    });
    let addedServices1 = services1.filter((item) => item.added === true);
    let addedServices2 = services2.filter((item) => item.added === true);
    let addedServices = [...addedServices1, ...addedServices2];
    setAppts(addedServices);
  };

 

  return (
    <BrowserRouter className="App">
      <Navbar num={appNum}></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pronadji-prijatelja"
          element={
            <RunningPlans
              services1={services1}
              services2={services2}
              makeAnAppointment={makeApnt}
              star1={star1}
              star2={star2}
            />
          }
        />
        <Route path="/moji-planovi" element={<RunningTracking />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
export default App;



