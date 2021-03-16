import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () =>{
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}


function App() {

  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])


  useEffect(() => {
    socket.on('connect',()=>{
      setOnline(true);
    });    
  }, [socket])

  useEffect(() => {
    socket.on('disconnect',()=>{
      setOnline(false);
    });    
  }, [socket])


  useEffect(() => {
    socket.on('current-bands',(data)=>{
      setBands(data);
    });    
  }, [socket])

  const votar = (id) => {
    socket.emit("votar-banda", id);
  }

  const eliminar = (id) => {
    socket.emit("eliminar-banda", id);
  }

  const modificar = (id, nombre) => {
    socket.emit("modificar-banda", {id, nombre});
  }

  const agregar = (nombre) =>{
    socket.emit("agregar-banda", nombre);
  }

  return (
    <div className="container">
      
      <div className="alert">
        <p>
          Service Status: 
          {
            online 
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
          
          
        </p>
      </div>

    <h1>BandNames</h1>
    <hr/>

    <div className="row">
      <div className="col-8">
        <BandList 
          data = { bands }
          votar = { votar }
          eliminar = { eliminar }
          modificar = { modificar }
        />
      </div>
      <div className="col-4">
        <BandAdd 
          agregar = {agregar}
        />
      </div>
    </div>


    </div>
  );
}

export default App;
