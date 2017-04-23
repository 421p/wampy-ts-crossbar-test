import {Wampy} from 'wampy';

import {MsgpackSerializer} from 'wampy/dist/serializers/MsgpackSerializer';
import {JsonSerializer} from 'wampy/dist/serializers/JsonSerializer';

describe('General test', () => {

    it('works with json serialization', done => {

        const server = new Wampy('ws://localhost:8888/test', {
            realm: 'realm1',
            serializer: new JsonSerializer(),
            onConnect: () => {
                server.register('sayhello', () => [{}, 'hello']);
            }
        });

        const client = new Wampy('ws://localhost:8888/test', {
            realm: 'realm1',
            serializer: new JsonSerializer(),
            onConnect: () => {
                client.call('sayhello', [], (args: any[]) => {
                   expect(args.shift()).toBe('hello');
                   done();
                });
            }
        });

    });

    it('works with msgpack serialization', done => {

        const server = new Wampy('ws://localhost:8888/test', {
            realm: 'realm1',
            serializer: new MsgpackSerializer(),
            onConnect: () => {
                server.register('sayhello', () => [{}, 'hello']);
            }
        });

        const client = new Wampy('ws://localhost:8888/test', {
            realm: 'realm1',
            serializer: new MsgpackSerializer(),
            onConnect: () => {
                client.call('sayhello', [], (args: any[]) => {
                    expect(args.shift()).toBe('hello');
                    done();
                });
            }
        });

    });

});