import { TimeoutError, UnknownError } from '$lib/models/errors';
import { E, TE } from '$lib/utils/fun';
import { pipe } from '@baetheus/fun/fn';

export interface Messaging {
    publish: (eventName: string, ...args: unknown[]) => void;
    send: <T extends unknown[] = unknown[]>(
        eventName: string,
        ...args: unknown[]
    ) => TE.AsyncEither<UnknownError | TimeoutError, T>;
}

export const createMessaging = (): Messaging => {
    const publish = alt.emit;
    const send = <T extends unknown[] = unknown[]>(
        eventName: string,
        ...args: unknown[]
    ) => {
        return pipe(
            TE.tryCatch(
                () =>
                    new Promise<E.Either<TimeoutError, T>>((resolve) => {
                        publish(eventName, ...args);
                        const timeout = setTimeout(() => {
                            alt.off(eventName, handleAnswer);
                            resolve(E.left(new TimeoutError()));
                        }, 3000);
                        const handleAnswer = (...args: unknown[]) => {
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
    return { publish, send };
};
