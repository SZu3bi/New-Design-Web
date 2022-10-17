import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Contact.scss";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  CreateMainInfo_Contact,
  GetMainInfo_Contact,
  DeleteInfo_Contact,
  Clone_Contact,
} from "../../Services/APIServices_2";
import { useHistory } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import { Spinner } from "../../Component/SpinnerComponent/Spinner";
import moment from "moment/moment";
import { showError } from "../../Helper/Tostify.Helper";

export const Contact = () => {
  const [result, setResult] = useState();
  const [count, setcount] = useState();
  const [loading, setLoading] = useState(true);

  const h = useHistory();
  const logout = () => {
    localStorage.removeItem("tokenapi");
    h.push("/Login");
  };
  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {
      setcount(result.data.length);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
    } else setResult(null);
  }, []);

  useEffect(() => {
    console.log("ss", localStorage.getItem('tokenapi'));
    if (JSON.parse(localStorage.getItem('tokenapi'))) {
    } else {
      setTimeout(() => {
        showError("Please Login");
      }, 1000);

      h.replace('/Login');
    }
  }, []);
const effectRun=useRef(false);
  useEffect(() => {

    if(effectRun.current===false){

      GetAllData();
    }
return ()=>{
  effectRun.current=true
}
   
  }, [GetAllData]);

  return (
    <div>
      <div> <Menu /></div>
      <br/>
      <br/>
      <br/>
      <br/>
         
      <div className="basket-card-uicomponents">
        <Spinner isActive={loading} isAbsolute />

        {result &&
          result.map((s, index) => (
            <div className="cards-wrappercards">
              <div className="title">
                <div className="around-tour"> ID :{s.Id}</div>
                <div className="around-tour">Name : {s.Name}</div>
              </div>
              <div className="tour-info">
                <span>
                  <div className="item-wrapper">
                    <span className="item-header">
                      <span className="mdi mdi-phone px-2" />
                      <span>mobile:</span>
                    </span>
                    <span className="item-body">{s.Phone || "N/A"}</span>
                  </div>
                  <div className="item-wrapper">
                    <span className="item-header">
                      <span className="mdi mdi-phone px-2" />
                      <span>Active:</span>
                    </span>
                    <span className="item-body">
                      {" "}
                      {s.Active__c === true ? "Active" : "Not Active"}
                    </span>
                  </div>
                  <div className="item-wrapper flex-nowrap">
                    <div className="texts-truncate d-flex">
                      <span className="item-header">
                        <a
                          style={{ textDecoration: "auto", color: "red" }}
                          href={`mailto:${s.Email}&text=Hi ${s.Name} From Psi Amman.`}
                        >
                          {" "}
                          <span className="mdi mdi-email-outline px-2" />
                          Email:
                        </a>

                        <span></span>
                      </span>
                      <span className="item-body texts-truncate d-inline-block">
                        {s.Email || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="item-wrapper">
                          <span className="item-header">
                            <a
                              style={{ textDecoration: "auto", color: "green" }}
                              href={`https://api.whatsapp.com/send/?phone=${s.Phone}&text=Hi ${s.Name} From Psi Amman.`}
                              target="_blank"
                            >
                              {" "}
                              <span className="mdi mdi-whatsapp px-2" />
                              WhatsApp
                            </a>
                          </span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-map-marker px-2" />
                            <span>nationality:</span>
                          </span>
                          <span className="item-body">Jordan</span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-calendar-blank px-2" />
                            <span>register:</span>
                          </span>
                          <span className="item-body">
                            {/* {s.CreatedDate} */}
                            {(s.CreatedDate &&
                              moment(s.CreatedDate).format("DD/MM/YYYY")) ||
                              "N/A"}
                          </span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-currency-usd px-2" />
                            <span>Amount:</span>
                          </span>
                          <span className="item-body">{s.Amount__c}</span>
                        </div>
                        <div className="item-wrapper mb-3">
                          <span className="item-header">
                            <span className="mdi mdi-file-document-edit px-2" />
                            <span>data-source:</span>
                          </span>
                          <span className="item-body">{s.LeadSource}</span>
                        </div>
                        <div className="item-wrapper mb-3">
                          <span className="item-header">
                            <span className="mdi mdi-file-document-edit px-2" />
                            <span>User:</span>
                          </span>
                          <span className="item-body">{s.User_Name__c}</span>
                        </div>
                        <div className="item-wrapper">
                          <span className="item-header">
                            <span className="mdi mdi-calendar-blank px-2" />
                            <span>Last Read / Write:</span>
                          </span>
                          <span className="item-body">
                            {s.Last_Read_Write__c}
                          </span>
                        </div>
                </span>
              </div>

              <div className="footer-button">
                <div className="add">
                  <EditIcon className="add-btn">Add to favorite</EditIcon>
                </div>
                <div className="delete">
                  <DeleteIcon className="delete-btn">Delete</DeleteIcon>
                </div>
              </div>
            </div>
          ))}
      </div>

  
    </div>
  );
};
