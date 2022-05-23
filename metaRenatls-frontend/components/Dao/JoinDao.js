import React from 'react';
import styles from './Dao.module.scss'


const JoinDao = ({requestBytes, returnId, requestVotes}) => { 

    return ( 
        <section className = {styles.sectionDao}>
            <div className = {styles.Circle}></div>
            <div className = {styles.Circle2}></div>

            <h3>Join DAO</h3>
            <div className = {styles.card}>
                <div className= {styles.innerCard}>
                <h3>General Community DAO</h3>
                <p>Your General Membership NFT is your key to joining the MetalRentals DAO. With that comes</p>
                </div>
                <ul>
                    <li>
                        Partipciate in lottery events
                    </li>
                    <li>
                        Vote on distribution of rewards
                    </li>
                    <li>
                        Able to participate in future events
                    </li>
                </ul>
                <button>Join Dao</button>
            </div>
        </section>
    )

};

export default JoinDao; 