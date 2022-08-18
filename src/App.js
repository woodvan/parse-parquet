import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { tableFromIPC } from "apache-arrow";
import { readParquet } from "parquet-wasm";

function App() {

  useEffect(()=>{
    parseParquet();
  }, []);

  const parseParquet = async () => {
    console.log('parseParquet==============>')
    const resp = await fetch("https://s3.us-east-2.amazonaws.com/latest.field.points.all/1_2022-06-14_all.parquet");
    console.log(resp)
    const parquetUint8Array = new Uint8Array(await resp.arrayBuffer());
    console.log("parquetUint8Array=>", parquetUint8Array);
    const arrowUint8Array = readParquet(parquetUint8Array);
    const arrowTable = tableFromIPC(arrowUint8Array);
    console.log("arrowTable=>", arrowTable)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
