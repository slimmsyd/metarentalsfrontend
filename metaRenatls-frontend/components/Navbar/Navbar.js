import Link from "next/link";
import { ConnectButton } from "web3uikit";
import style from "./Navbar.module.scss";

import {useState, useEffect, useRef} from 'react';
import Web3Modal from 'web3modal';
import {BigNumber, ethers, providers, Contract} from 'ethers';
import { FETCHVOTESADDRESS, FETCHIDADDRESS, fetchidabi, fetchvotesabi } from "../constants";
const Navbar = () => {
  const web3modalref = useRef(); 
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  useEffect(() => { 
    web3modalref.current = new Web3Modal( { 
        network: "kovan",
        providerOptions: {},
        disableInjectedProvider: false,
    })
    Connect();
  });
  const splitString = (string) => {
    let result1 = string.substring(0,5);
    let result2 = string.substring(38,string.length);
    let finalResult = result1 + "..." + result2;
    return finalResult;
  }; 
  const Connect = async() => { 
    try { 
      await getProviderOrSigner();
      setIsConnected(true);
    }catch(err) { 
      console.error(err);
    }
  };


    const getProviderOrSigner = async(needSigner = false) => { 
    const provider = await web3modalref.current.connect(); 
    const web3provider = new providers.Web3Provider(provider);
  
    const signer = web3provider.getSigner(); 
    const address = await signer.getAddress();
    const substringAddress = splitString(address);
    setAccountAddress(substringAddress);
    console.log(substringAddress)

    //check if chainID is kovan 
    const {chainId} = await web3provider.getNetwork(); 
    if(chainId !== 42) { 
      window.alert("You are on the Wrong Network, Swich to Kovan"); 
    }

    if(needSigner) { 
      const signer = web3provider.getSigner();
      return signer;
    }
    return web3provider;
  };
  const renderConnectButton = () => { 
    if(!isConnected) { 
      return ( 
        <div className={style.connectBtn}>
             <button onClick={Connect}>Connect Button</button>
        </div>
      )
        

    }else  { 
      return ( 
        <div className={style.connectBtn}>
          <h4>{accountAddress}</h4>
        </div>
      )
  
    }
  }

  return (
    <div className={style.navbar}>
      <div className={style.navbarContainer}>
        <div className={style.navbarLogo}>
         <Link href = "/">
         <a><span>MetaRentals</span></a>
         </Link>
        </div>
        <div className={style.navbarListContainer}>
          <div className={style.navbarList}>
            <ul>
              <li>
                <Link href="/marketplace">
                  <a>Marketplace</a>
                </Link>{" "}
              </li>
              <li>
                <Link href="#roadmap">
                  <a>Roadmap</a>
                </Link>{" "}
              </li>
              <li>
                <Link href="#whitepaper">
                  <a>Whitepaper</a>
                </Link>
              </li>
              <li>
                <Link href="#team">
                  <a>Team</a>
                </Link>
              </li>

              <li>
                <Link href="/join">
                  <a>Join DAO</a>
                </Link>
              </li>
            </ul>
          </div>
              {renderConnectButton()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
