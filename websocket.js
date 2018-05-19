/* jshint esversion:6 */
(function() {
    'use strict';
    
    class WebSocketApp {
        constructor() {

            // Create the websocket
            const url = "wss://echo.websocket.org/";
            this.websocket = new WebSocket(url);

            // bind the callbacks with this.
            this.websocket.addEventListener('open', this.open.bind(this));
            this.websocket.addEventListener('close', this.close.bind(this));
            this.websocket.addEventListener('message', this.message.bind(this));
            this.websocket.addEventListener('error', this.error.bind(this));

            this.messageCount = 1;

            // handle close
            document.querySelector('.close').addEventListener('click', () => this.websocket.close());
        }
        // Open
        open(event) {
            const p = WebSocketApp.createText('Connection OPENED', 'connection');
            this.websocket.send('Hello Server ' + this.messageCount++);            
        }
        // Message
        message(event) {
            const p = WebSocketApp.createText(event.data, 'message');
            setTimeout(() => {
                if (this.websocket.readyState === WebSocket.OPEN) {
                    this.websocket.send('Hello Server ' + this.messageCount++);
                }
            }, 1000);
        }
        // Error
        error(event) {
            const p = WebSocketApp.createText(event.data, 'connection');
        }
        // Close 
        close(event) {
            const p = WebSocketApp.createText('Connection CLOSED', 'connection');
        }
        // Helpers
        static createText(data, styleclass) {
            const conatiner = document.querySelector('.container');
            const p = document.createElement('p');
            p.innerHTML = data; 
            p.classList.add(styleclass);
            conatiner.appendChild(p);
            return p;
        }

    }

    // Invoke the app
    const app = new WebSocketApp();

})();