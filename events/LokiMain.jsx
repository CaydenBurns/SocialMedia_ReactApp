import React from "react";
import Loki from "react-loki";

import LokiStep1 from "./LokiStep1";
import LokiStep2 from "./LokiStep2";
import LokiStep3 from "./LokiStep3";
import toastr from "toastr";

function LokiMain(props) {
  const mySteps = [
    {
      label: "Step 1",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="mySvg"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      ),
      component: <LokiStep1 props={props} />,
    },
    {
      label: "Step 2",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="mySvg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
      ),
      component: <LokiStep2 props={props} />,
    },
    {
      label: "Step 3",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="mySvg"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      component: <LokiStep3 props={props} />,
    },
  ];

  const onFinish = () => {
    toastr.success("Form Validation Complete, You can now submit your Form");
  };

  return (
    <div className="eventWizard">
      <Loki steps={mySteps} onFinish={onFinish}></Loki>
    </div>
  );
}

export default LokiMain;
