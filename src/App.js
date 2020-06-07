import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import MainPage from './MainPage';
import AdminPage from './component/AdminPage';
import TransactionPage from './component/TransactionPage';
import LoginAdmin from './component/LoginAdmin';
class App extends Component {

  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/admin' component={LoginAdmin} />
          <Route exact path='/admin/result' component={AdminPage} />
          <Route exact path='/admin/list-transaction' component={TransactionPage}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
