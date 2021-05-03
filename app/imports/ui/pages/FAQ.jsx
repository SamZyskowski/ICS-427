import React, {useState} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Data} from './faqdata';
import {FiPlus, FiMinus} from 'react-icons/fi';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';


const FAQSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 80vh;
    background: #fff;

`;

const Container = styled.div`
    position: absolute;
    top: 10%;
    box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const Wrap = styled.div`
    background: #272727;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-align: center;
    cursor: pointer;

    h1{
        padding:2rem;
        font-size: 2rem;
    }

    span{
        margin-right: 1.5rem;
    }
`;

const Dropdown = styled.div`
    background: #1c1c1c;
    color: #00ffb9;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #00ffb9;
    border-top: 1px solid #00ffb9;

    p {
        font-size: 2rem;
    }

`;



const FAQ = () => {

    const[clicked,setClicked] = useState(false)

    const toggle = index => {
        if(clicked === index){
            return setClicked(null)
        }
        setClicked(index)
    }



    return(
        <IconContext.Provider value = {{color: '#00FFB9', size: '25px'}}>
            <FAQSection>
                <Container>
                    {Data.map((item, index) => {
                        return(
                            <>
                            <Wrap onClick = {() => toggle(index)} key = {index}>
                            <h1>{item.question}</h1>
                                <span>{clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                            </Wrap>
                            {clicked === index ? (
                                <Dropdown>
                                <p>{item.answer}</p>
                                </Dropdown>
                            ) : null}
                            
                            </>
                        )
                    })}
                </Container>

            </FAQSection>
        </IconContext.Provider>
    );
};

export default FAQ;