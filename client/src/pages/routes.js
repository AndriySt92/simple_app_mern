import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './LinksPage'
import { AuthPage } from './AuthPage'
import { CreatePage } from './CreatePage'
import { DetailPage } from './DetailPage'

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/links" component={LinksPage} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/detail/:id" component={DetailPage} />
        <Redirect to="/create" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <Redirect to="/" />
    </Switch>
  )
}
