import {Wampy} from 'wampy';
import msgpack5 = require('msgpack5');
import {MsgpackSerializer} from 'wampy/dist/serializers/MsgpackSerializer';
import {JsonSerializer} from 'wampy/dist/serializers/JsonSerializer';

const msgpack = msgpack5();

const serializer = {
    protocol: 'msgpack',
    binaryType: 'arraybuffer',
    encode: data => msgpack.encode(data),
    decode: data => msgpack.decode(new Uint8Array(data))
};

const server = new Wampy('ws://localhost:8888/test', {
    realm: 'realm1',
    serializer: new MsgpackSerializer(),
    onConnect: () =>
    {
        server.register('sayhello', () => [{}, 'hello']);
        const client = new Wampy('ws://localhost:8888/test', {
            realm: 'realm1',
            serializer: new JsonSerializer(),
            onConnect: () =>
            {
                client.call('sayhello', [], (args: any[], kwargs: any) =>
                {
                    console.log(args);
                });
            }
        });
    }
});