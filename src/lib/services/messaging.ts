import { TimeoutError, UnknownError } from '$lib/models/errors';
import { E, TE } from '$lib/utils/fun';
import { pipe } from '@baetheus/fun/fn';

let messageId = 0;

export interface MessagingContext {
    respond: (value?: any) => void;
}

export interface Messaging {
    emit: (eventName: string, ...args: unknown[]) => void;
    publish: (eventName: string, ...args: unknown[]) => void;
    send: <T extends unknown[] = unknown[]>(
        eventName: string,
        ...args: unknown[]
    ) => TE.AsyncEither<UnknownError | TimeoutError, T>;
    on: (
        eventName: string,
        handler: (ctx: MessagingContext, ...args: any[]) => void
    ) => () => void;
}

export const createMessaging = (): Messaging => {
    const emit = alt.emit;
    const publish = (eventName: string, ...args: unknown[]) => {
        alt.emit(eventName, ++messageId, ...args);
    };
    const send = <T extends unknown[] = unknown[]>(
        eventName: string,
        ...args: unknown[]
    ) => {
        return pipe(
            TE.tryCatch(
                () =>
                    new Promise<E.Either<TimeoutError, T>>((resolve) => {
                        const id = ++messageId;
                        alt.emit(eventName, id, ...args);
                        const timeout = setTimeout(() => {
                            alt.off(eventName, handleAnswer);
                            resolve(E.left(new TimeoutError()));
                        }, 5000);
                        const handleAnswer = (
                            messageId: number,
                            ...args: unknown[]
                        ) => {
                            if (messageId !== id) {
                                return;
                            }
                            resolve(E.right(args as T));
                            alt.off(eventName, handleAnswer);
                            clearTimeout(timeout);
                        };
                        alt.on(eventName, handleAnswer);
                    }),
                () => new UnknownError()
            )(),
            TE.flatmap((a) =>
                a.tag === 'Left' ? TE.left(a.left) : TE.right(a.right)
            )
        );
    };
    const on = (
        eventName: string,
        handler: (context: MessagingContext, ...args: any[]) => void
    ) => {
        const innerHandler = (messageId: number, ...args: any[]) => {
            handler(
                {
                    respond: (value) => {
                        alt.emit(eventName, messageId, value);
                    },
                },
                ...args
            );
        };
        alt.on(eventName, innerHandler);
        return () => {
            alt.off(eventName, innerHandler);
        };
    };
    return { emit, publish, send, on };
};
