
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import RunningPlans from "./components/pages/RunningPlans";
import MyPlans from "./components/pages/MyPlans";
import ViewMode from './components/ViewMode';
import slika1 from "./assets/jovana.jpg"
import slika2 from "./assets/marina.jpg"
import slika3 from "./assets/stefan.jpg"
import slika4 from "./assets/nemanja.jpg"
import slika5 from "./assets/marko.jpg"
import slika6 from "./assets/milica.jpeg"
import { apiService } from './components/ApiService';
import Profile from './components/Profile'
import KreirajPlan from './components/KreirajPlan';




function App() {

  const { isDarkMode, toggleDarkMode } = ViewMode();

  const [plnNum, setPlnNum] = React.useState(0);

  const p1 = [
    {
      id: 1,
      times: 0,
      star: 112,
      checked: false,
      name: "Jovana (27)",
      added: false,
      text: "Ja sam Jovana, strastvena trkačica koja obožava jutarnje trčanje kroz park. Planiram trku od 10 km sa tempom od 6 minuta i 30 sekundi po kilometru. Pridruži mi se 5. februara u 7:00 ujutru na ovoj energičnoj trci.",
      src: slika1,
      gender: "female",
      date: "5. februar 2024.",
      time: "7:00h",
      location: "Belgrade",
      plannedKm: 10,
    },
    {
      id: 2,
      times: 0,
      star: 184,
      checked: false,
      name: "Marina (25)",
      added: false,
      text: "Ja sam Marina, zaljubljenica u prirodu koja organizuje trku kroz staze blizu reke. Moj plan trčanja zakazan je za 8. februar sa tempom od 6 minuta po kilometru na udaljenosti od 12 km. Pridruži mi se na ovoj trci punoj svežeg zraka i prijateljske atmosfere.",
      src: slika2,
      gender: "female",
      date: "8. februar 2024.",
      time: "20:00h",
      location: "Novi Sad",
      plannedKm: 9,
    },
    {
      id: 3,
      times: 0,
      star: 178,
      checked: false,
      name: "Stefan (33)",
      added: false,
      text: "Ja sam Stefan, iskusan trkač koji planira gradsku trku 16. februara. Sa tempom od 5 minuta i 15 sekundi po kilometru, pozivam sve trkače da se pridruže ovoj uzbudljivoj avanturi.",
      src: slika3,
      gender: "male",
      date: "16. februar 2024.",
      time: "19:30h",
      location: "Zagreb",
      plannedKm: 8,
    },
  ];

  const p2 = [
    {
      id: 4,
      times: 0,
      star: 165,
      checked: false,
      name: "Nemanja (26)",
      added: false,
      text: "Ja sam Nemanja, entuzijastičan trkač koji želi motivisati zajednicu kroz trčanje. Organizujem trku 18. februara sa ciljem od 8 km i tempom od 5 minuta i 45 sekundi po kilometru. Pozivam da mi se pridružiš i da zajedno postignemo svoje trkačke ciljeve. Biće to dinamično iskustvo koje ne želiš propustiti!",
      src: slika4,
      gender: "male",
      date: "18. februar 2024.",
      time: "20:20h",
      location: "Sarajevo",
      plannedKm: 6,
    },
    {
      id: 5,
      times: 0,
      star: 189,
      checked: false,
      added: false,
      name: "Marko (29)",
      text: "Ja sam Marko, strastveni trkač koji obožava brze ritmove. Pozivam vas na svoj plan trčanja 22. februara. Sa tempom od 5 minuta i 30 sekundi po kilometru, planiram trku od 15 km. Ako volite izazove i dugotrajne staze, pridružite mi se na ovoj trci i zajedno doživimo snagu trčanja.",
      src: slika5,
      gender: "male",
      date: "22. februar 2024.",
      time: "18:20h",
      location: "Budapest",
      plannedKm: 11,
    },
    {
      id: 6,
      times: 0,
      star: 178,
      checked: false,
      name: "Milica (21)",
      added: false,
      text: "Ja sam Milica, zaljubljena u trčanje i obožavateljka jutarnjih trka. Planiram organizovati opuštenu trku kroz gradsku šetališnu zonu 26. februara, s tempom od 6 minuta po kilometru na stazi od 8 km. Ova trka je savršena za sve devojke koje žele uživati u trčanju i druženju.",
      src: slika6,
      gender: "female",
      date: "26. februara 2024.",
      time: "17:00h",
      location: "Skoplje",
      plannedKm: 12,
    },
  ];

  const [plns, setPlns] = React.useState([]);

  const [plans1, setPlan1] = React.useState(p1);

  const [plans2, setPlan2] = React.useState(p2);


  const star1 = (planId) => {
    let arr1 = [];
    plans1.forEach((element) => {
      if (element.id === planId) {
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
    setPlan1(arr1);
    console.log(plans1);

    let arr2 = [];
    plans2.forEach((element) => {
      if (element.id === planId) {
        if (!element.checked) {
          element.star = element.star + 1;
          element.checked = true;
          arr2.push(element);
        }
      } else {
        arr2.push(element);
      }
    });
    setPlan2(arr2);
    console.log(plans2);
  };

  const star2 = (planId) => {
    let arr1 = [];
    plans1.forEach((element) => {
      if (element.id === planId) {
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
    setPlan1(arr1);

    let arr2 = [];
    plans2.forEach((element) => {
      if (element.id === planId) {
        if (element.checked) {
          element.star = element.star - 1;
          element.checked = false;
          arr2.push(element);
        }
      } else {
        arr2.push(element);
      }
    });
    setPlan2(arr2);
  };

  const makePln = (planId) => {
    plans1.forEach((element) => {
      if (element.id === planId) {
        if (element.added === false) {
          setPlnNum(plnNum + 1);
          element.added = true;
        }
      }
    });
    plans2.forEach((element) => {
      if (element.id === planId) {
        if (element.added === false) {
          setPlnNum(plnNum + 1);
          element.added = true;
        }
      }
    });
    let addedPlans1 = plans1.filter((item) => item.added === true);
    let addedPlans2 = plans2.filter((item) => item.added === true);
    let addedPlans = [...addedPlans1, ...addedPlans2];
    setPlns(addedPlans);
  };
  const deletePln = (planId) => {

    plns.forEach((element) => {
      if (element.id === planId) {
        if (element.added === true) {
          setPlnNum(plnNum - 1);
          element.added = false;
        }
      }
    });

    let newApp = plns.filter((item) => item.added === true);
    setPlns(newApp);
  };

  
  return (
    <Router className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar num={plnNum} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} apiService={apiService} />
      <Routes>
  <Route
    path="/"
    element={<Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
  />
  <Route
    path="/pronadji-prijatelja"
    element={
      <RunningPlans
        plans1={plans1}
        plans2={plans2}
        makeAPlan={makePln}
        star1={star1}
        star2={star2}
        isDarkMode={isDarkMode} 
      />
    }
  />
  <Route
    path="/moji-planovi"
    element={<MyPlans data={plns} deleteAPlan={deletePln} isDarkMode={isDarkMode} />}
  />
  <Route path="/registracija" element={<Registration />} />
  <Route path="/login" element={<Login />} />
  <Route path="/logout" element={<Navigate to="/" />}></Route>
  <Route path="/moj-nalog" element={<Profile />} />
  <Route path="/kreiraj-plan" element={<KreirajPlan />} />




</Routes>
      <Footer isDarkMode={isDarkMode} />
    </Router>
  );
        }
export default App;