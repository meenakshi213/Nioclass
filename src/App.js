import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [ques, setQues] = useState();
  const [id, setId] = useState([
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    console.log(active, id[active]);
    fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${id[active]}`
    )
      .then((res) => res.json())
      .then((data) => setQues(data[0].Question));
  }, [active]);
  const handleActive = (val) => {
    console.log(val, active, id[active]);
    if (val >= id.length || val < 0) {
    } else {
      setActive(val);
    }
  };

  return (
    <MathJaxContext>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <button  className="butt">End Test</button>
      </Navbar>
      <div style={{ width: "90%", marginLeft: "5%",textAlign:"center" }}>
        <MathJax inline>
          <h3>
            <strong>Question {active + 1}: </strong>
            {ques}
          </h3>
        </MathJax>
        <h4>Solution: </h4>
        <textarea placeholder="Write Answer here...." rows="10" cols="100"></textarea>
        <div style={{textAlign:"center"}}>
          <button className="butt" onClick={() => handleActive(active - 1)}>Prev</button>
          <button className="butt" onClick={() => handleActive(active + 1)}>Next</button>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
