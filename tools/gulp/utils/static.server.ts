import * as express from 'express';
import * as serveStatic from 'serve-static';
import * as openResource from 'open';
import { resolve } from 'path';

class StaticServer {
    start (dir, port, base) {
        let server = express();

        server.use(
            base,
            serveStatic(dir)
        );

        server.listen(port, () =>
            openResource('http://localhost:' + port + base)
        );
    }
}

let server = new StaticServer();
export default server;