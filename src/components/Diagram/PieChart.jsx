import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "../Diagram/PieChart.css";
function Piechart({ title }) {
  const [stdudentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    const sSubject = [];
    const sMarks = [];
    const getStudentdata = async () => {
      const reqData = [
        {
          subject: "Hindi",
          marks: "65",
        },
        {
          subject: "Math",
          marks: "76",
        },
        {
          subject: "English",
          marks: "85",
        },
        {
          subject: "Science",
          marks: "65",
        },
        {
          subject: "SocialScience",
          marks: "64",
        },
      ];
      const resData = reqData;
      for (let i = 0; i < resData.length; i++) {
        sSubject.push(resData[i].subject);
        sMarks.push(parseInt(resData[i].marks));
      }
      setStudentsubject(sSubject);
      setStudentMarks(sMarks);
      //console.log(resData);
    };

    getStudentdata();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <Chart
          type="pie"
          width={400}
          height={550}
          series={studentMarks}
          options={{
            title: { text: title },
            noData: { text: "Empty Data" },
            labels: stdudentSubject,
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
