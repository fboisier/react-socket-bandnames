const BandList = require("./band-list");

class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();

        this.bandList = new BandList();

    }

    socketEvents() {

        this.io.on('connection', (socket) => {

            console.log("Cliente Conectado.");

            socket.emit("current-bands", this.bandList.getBands())

            socket.on('votar-banda', (id) => {

                this.bandList.increaseVotes(id);

                this.io.emit("current-bands", this.bandList.getBands())


            });

            socket.on('eliminar-banda', (id) => {

                this.bandList.removeBand(id);

                this.io.emit("current-bands", this.bandList.getBands())

            });

            socket.on('modificar-banda', (data) => {

                this.bandList.changeName(data.id, data.nombre);
                this.io.emit("current-bands", this.bandList.getBands())

            });

            socket.on('agregar-banda', (nombre) => {

                this.bandList.addBand(nombre);
                this.io.emit("current-bands", this.bandList.getBands())

            });
        });

    }
}

module.exports = Sockets;