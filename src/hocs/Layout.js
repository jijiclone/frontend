import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {checkAuthenticated, load_user} from "../actions/auth"
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

function Layout(props) {
    const checkAuthenticated = props.checkAuthenticated
    const load_user = props.load_user
    useEffect(() => {
        checkAuthenticated()
        load_user()
    }, [checkAuthenticated, load_user]);

    return (
        <div>
            
            <Navigation />  
                
            {props.children}

            <Footer />
        </div>
    )
}



export default connect(null, {checkAuthenticated, load_user})(Layout);