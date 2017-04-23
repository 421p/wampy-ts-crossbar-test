export class WampyOptions
{
    autoReconnect?: boolean;
    reconnectInterval?: number;
    maxRetries?: number;
    realm?: string;
    helloCustomDetails?: any;
    onChallenge?: (auth_method: string, challenge_details: string) => string;
    authid?: string;
    onConnect?: () => void;
    onClose?: () => void;
    onError?: () => void;
    onReconnect?: () => void;
    onReconnectSuccess?: () => void;
    ws?: any;
    serializer?: any;
}

export class WampyOpStatus
{
    code: number;
    description: string;
    reqId?: number;
}

export class SuccessErrorCallbacksHash
{
    onSuccess?: (args: any[], kwargs: any) => void;
    onError?: (err: string, details: any) => void;
}

export class SubscribeCallbacksHash extends SuccessErrorCallbacksHash
{
    onEvent: (args: any[], kwargs: any) => void;
}

export class RegisterCallbacksHash extends SuccessErrorCallbacksHash
{
    rpc: (args: any[], kwargs: any, options: any) => any[];
}

export class CallSuccessErrorCallbacksHash
{
    onSuccess: (args: any[], kwargs: any) => any;
    onError?: (err: string, details: any, args: any[], kwargs: any) => void;
}

export class AdvancedOptions
{
    exclude?: number | number[];
    eligible?: number | number[];
    exclude_me?: boolean;
    disclose_me?: boolean;
}

export class PublishAdvancedOptions extends AdvancedOptions
{
    exclude_authid?: string | string[];
    exclude_authrole?: string | string[];
    eligible_authid?: string | string[];
    eligible_authrole?: string | string[];
}

export class CallAdvancedOptions
{
    disclose_me?: boolean;
    receive_progress?: boolean;
    timeout?: number;
}

export class CancelAdvancedOptions
{
    mode?: "skip" | "kill" | "killnowait";
}

export class Wampy
{
    constructor (url?: string, options?: WampyOptions);
    options(opts?: WampyOptions): WampyOptions | Wampy;
    getOpStatus(): WampyOpStatus;
    getSessionId(): number;
    connect(url?: string): Wampy;
    disconnect(): Wampy;
    abort(): Wampy;
    subscribe(topicURI: string, callbacks: (((args: any[], kwargs: any) => void) | SubscribeCallbacksHash)): Wampy;
    unsubscribe(topicURI: string, callbacks?: (((args: any[], kwargs: any) => void) | SubscribeCallbacksHash)): Wampy;
    publish(topicURI: string,
            payload?: any,
            callbacks?: SuccessErrorCallbacksHash,
            advancedOptions?: PublishAdvancedOptions): Wampy;
    call(topicURI: string,
         payload?: any,
         callbacks?: (((args: any[], kwargs: any) => void) | CallSuccessErrorCallbacksHash),
         advancedOptions?: CallAdvancedOptions): Wampy;
    cancel(reqId: number,
           callbacks?: ((() => void) | SuccessErrorCallbacksHash),
           advancedOptions?: CancelAdvancedOptions): Wampy;
    register(topicURI: string, callbacks: (((args: any[], kwargs: any, options: any) => any[]) | RegisterCallbacksHash)): Wampy;
    unregister(topicURI: string, callbacks?: ((() => void) | SuccessErrorCallbacksHash)): Wampy;
}