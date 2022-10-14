import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FTcontract from '../contracts/D_Ad.json'
import { useWeb3React } from "@web3-react/core";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import dotenv from "dotenv";
dotenv.config();

const ACCESS_KEY_ID = 'KASKAJLEGBNU55WU19J9KWT9';
const SECTET_ACCESS_KEY = 'u5xCeiRKPTKaZ75ZegKBxmIZ6VyZmIJQ92-0-DFb';
const chainid = '1001';
const option = {
  headers : [
    {
      name : "Authoriztion",
      value : "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECTET_ACCESS_KEY).toString("base64")
    },
    {name : "x-chain-id", value : chainid}
  ]
}

const Caver = require('caver-js');

const {REACT_APP_CONTRACT, REACT_APP_PRIVATE_KEY, REACT_APP_BAOBAB_URL, REACT_APP_DEPLOY_ADDRESS} = process.env;
const FTabi = FTcontract.abi;


const AdModal = ({ data, normaltype }) => {

  console.log(normaltype);
  const { account } = useWeb3React();
  const [videoended, setVideoended] = useState(false);
  function VideoEnd(e) {
    setVideoended(true);
  }
  
  const mintERC20Handler = async() => {
    const caver = new Caver(new Caver.providers.HttpProvider(REACT_APP_BAOBAB_URL));
    const mycontract = new caver.contract(FTabi,REACT_APP_CONTRACT, option);
    caver.klay.getBalance(REACT_APP_DEPLOY_ADDRESS).then(console.log);
    
    
    
    mycontract.methods.getBalance(account).call().then((response) => {
      const balance = response
      console.log(`Balance : ${balance}`);
    })

    try {
      const deployer = caver.wallet.keyring.createFromPrivateKey(REACT_APP_PRIVATE_KEY);
      caver.wallet.add(deployer);
  
      const recipt = await mycontract.methods.transferReward(account).send({
        from: REACT_APP_DEPLOY_ADDRESS,
        gas: '210000000'
      });
      
      caver.klay.getBalance(REACT_APP_DEPLOY_ADDRESS).then(console.log);
      alert("50 CAT이 지급되었습니다. ");
      console.log(recipt);
      caver.klay.getBalance(REACT_APP_DEPLOY_ADDRESS).then(console.log);
    } catch(e) {
      console.log(e);
    }

  }

  return (
    <>
      <Modal.Header closeButton style={{ backgroundColor: "#2B3437", color: "#ffffff" }}>
        <Modal.Title id="example-modal-sizes-title-lg" style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
          {data.metadata.keyvalues.title}
        </Modal.Title>
      </Modal.Header>
      <video style={{ width: "100%" }} autoPlay onEnded={(e) => VideoEnd(e)}>
        <source
          src={`${data.metadata.keyvalues.video}`}
          type="video/mp4"
        />
        {/* <track default kind="captions" srcLang="en" src="/media/examples/friday.vtt" /> */}
      </video>
      <Modal.Body style={{ backgroundColor: "#2B3437", color: "#ffffff" }}>
        <Modal.Title>
          Script
        </Modal.Title>
        <p style={{ color: "$ffffff" }}>{data.metadata.keyvalues.script}</p>
        
        { videoended ?
          (normaltype === "true" ?
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Let's get reward!</Tooltip>}>
              <span className="d-inline-block">
                <Button variant="primary" size="sm" disabled={false} onClick={mintERC20Handler} style={{ backgroundColor: "#E6007A", borderColor: "#E6007A" }}>
                  Verify
                </Button>
              </span>
            </OverlayTrigger>
            : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">You need to sign in...</Tooltip>}>
              <span className="d-inline-block">
                <Button variant="primary" size="sm" disabled={true} style={{ backgroundColor: "#E6007A", borderColor: "#E6007A" }}>
                  Wait...
                </Button>
              </span>
            </OverlayTrigger>
          ) :
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please wait for the Advertisement to end!</Tooltip>}>
            <span className="d-inline-block">
              <Button variant="primary" size="sm" disabled style={{ backgroundColor: "#E6007A", borderColor: "#E6007A" }}>
                Wait...
              </Button>
            </span>
          </OverlayTrigger>
        }
      </Modal.Body>
    </>
  )
}
export default AdModal;