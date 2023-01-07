import { useState } from 'react';
import './App.css';
import BmiList from './components/BmiList';
import BmiScore from './components/BmiScore';
import Form from './components/Form'

function App() {
   const [show, setShow] = useState(false)
   const [changeWeight,setChangeWeight] = useState({ weight: "", type: "" })
   const [bmi, setBmi] = useState("00")
   const [bmiType, setBmiType] = useState("Not Calculated")
   const [bmiRange,setBmiRange] = useState({
    underWeight: { low: "" },
    normal: { low: "", high: "" },
    overWeight: { low: "", high: "" },
    obesityOne: { low: "", high: "" },
    obesityTwo: { low: "", high: "" },
    obesityThree: { high: "" },
   });
   const onFormSub = (w, h) => {
      let b = calcBmi(w,h);
      setBmi(b)
      setBmiType(weightType(b))
      console.log(w, h);
      const range = {
         underWeight: { low: calcWeight(18.5, h) },
         normal: { low: calcWeight(18.5, h), high: calcWeight(24.9, h) },
         overWeight: { low: calcWeight(25, h), high: calcWeight(29.9, h) },
         obesityOne: { low: calcWeight(30, h), high: calcWeight(34.9, h) },
         obesityTwo: { low: calcWeight(35, h), high: calcWeight(39.9, h) },
         obesityThree: { high: calcWeight(40, h) },
       };
       setBmiRange(range)
       setChangeWeight(weightChange(b,w,range))
       setShow(true);
   }

   const calcBmi =(w,h) => (w /(h*h)).toFixed(2);
   const calcWeight =(b,h) =>(b * h * h ).toFixed(2);

   const weightChange = (b, w, range) => {
      let changeObj;
      if (b > 24.9) {
        changeObj = {
          wight: (w - range.normal.high).toFixed(2),
          type: "positive",
        };
        return changeObj;
      } else if (b < 18.5) {
        changeObj = {
          wight: (range.normal.low - w).toFixed(2),
          type: "negative",
        };
        return changeObj;
      } else {
        changeObj = { wight: 0, type: "normal" };
        return changeObj;
      }
    };
   const weightType = (bmi)=>{
      if(bmi < 18.5) {
         return "Underweight";
      }else if (18.5 < bmi && bmi <24.9 ) {
         return "Normal";
         
      }else if (24.9 < bmi && bmi <29.9) {
         return "Over Weight";
      }else if (29.9 < bmi && bmi <34.9) {
         return "Obesity Class I ";

      }else if (34.9 <bmi && bmi <39.9) {
         return "Obesity Class II"
      }else if  (bmi > 39.9) {
         return "Obesity class III"
      }

   };

   return (
      <>
         <div className='container'>
            <div className='row justify-content-center mt-5 mx-2'>
               <Form getData={onFormSub} />
            </div>
            {show && (
               <div className='row justify-content-center mt-5 '>
               <div className='col-12 col-sm-6 mb-5'>
                  <BmiScore bmiNo={bmi} bmiName={bmiType} changeWeight={changeWeight}/>
               </div>
               <div className='col-12 col-sm-6'>
                  <BmiList  range={bmiRange} bmi={bmi}/>
               </div>
            </div>
               )}
         </div>
      </>
   
   );
}

export default App;


   







