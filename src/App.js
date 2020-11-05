import React from 'react';
import './App.css';
import Test_with_Hooks from './_components/test-with-hooks'
import Test_with_Classes from './_components/test-whis-classes'

function App() {
    return (
        <div className="App">
            {/*<Test_with_Classes/>*/}
            <Test_with_Hooks/>
        </div>
    );
}

export default App;
