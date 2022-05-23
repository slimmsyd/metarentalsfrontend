import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/Navbar'
import Roadmap from '../components/Roadmap/Roadmap'
import Team from '../components/Team/Team'
import styles from '../styles/Home.module.css'
import JoinDao from '../components/Dao/JoinDao'

import {useState, useEffect, useRef} from 'react';
import { FETCHIDADDRESS,FETCHVOTESADDRESS,fetchidabi, fetchvotesabi } from '../components/constants'
import {BigNumber, ethers, providers, Contract} from 'ethers';
import Web3Modal from 'web3modal';
import web3 from 'web3';

export default function Home() {
  const zero = BigNumber.from(0);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [loading, setLoading] = useState(false);
  //Dealing with LINK amount 
  const [linkTokens, setLinkTokens] = useState(zero); 
  const [etherBalance, setEtherBalance] = useState(zero);
  //PropsalID
  const[proposalId, setProposalId] = useState("");
  const web3modalref = useRef(); 

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
  const Connect = async() => { 
    try { 
      await getProviderOrSigner();
      setIsConnected(true);
    }catch(err) { 
      console.error(err);
    }
  };

  //Request Bytes for ProposalID
  const requestBytes = async() => { 
    try { 
      const signer = await getProviderOrSigner(true); 
      const contract = new Contract(
        FETCHIDADDRESS,
        fetchidabi,
        signer
      );
      const tx = await contract.requestBytes();
      setLoading(true);
      //wait for transaction to get mined
      await tx.wait();
      setLoading(false);

    }catch(err) { 
      console.error(err);
    }

  }


 const returnId = async() => { 
    try { 
      const provider = await getProviderOrSigner(); 
      const contract = new Contract(
        FETCHIDADDRESS,
        fetchidabi,
        provider
      );
        const tx = await contract.returnProposalId()
        setProposalId(tx); 
        console.log(tx);
    }catch(err) { 
      console.error(err); 
    }
  }


  //Fetching Votes from the Latest Contract 
  //Check The Votes on That ProposalID being fetched
  const requestVotes = async() => { 
    try { 
      const signer = await getProviderOrSigner(true);
      const voteContract = new Contract( 
        FETCHVOTESADDRESS,
        fetchvotesabi,
        signer
      );
        const tx = voteContract.requestVotes(1);
        setLoading(true);
        console.log(tx);
        await tx.wait();
        setLoading(false);

    }catch(err) { 
      console.error(err);
    }
  }













  return (
    <div className={styles.container}>
      <Head>
        <title>MetaRentals</title>
        <meta name="description" content="Bridging community and Travel. Find vaction homes, apartments cabins on MetaRentals " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <Navbar
          Connect = {Connect}
          isConnected = {isConnected}
          accountAddress = {accountAddress}
          />
          <Hero/>
          <Roadmap/>
          <JoinDao
            requestBytes = {requestBytes}
            returnId =  {returnId}
            requestVotes = {requestVotes}
          />
          <Team/>

          <Footer/>
      </main>
       
       </div>
  )
}
