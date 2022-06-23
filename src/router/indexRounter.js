import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/Login/Login'
import NewsSandBox from '../views/NewsSandBox/NewsSandBox'

export default function indexRounter() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                {/* <Route path="/" component={NewsSandBox}/> */}
                <Route path="/" render={() => 
                    localStorage.getItem("token")?
                        <NewsSandBox></NewsSandBox>:
                        <Redirect to="/login" />
                } />
            </Switch>
        </HashRouter>
    )
}
