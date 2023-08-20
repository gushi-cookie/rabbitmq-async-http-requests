export function createPromise() {
    let state = { isResolved: false };

    let resolve: Function | null = null;
    let promise = new Promise((res) => { resolve = res });

    let resolveWrap = (value: unknown) => {
        if(!resolve || state.isResolved) return;

        state.isResolved = true;
        resolve(value);
    };

    return {
        resolve: resolveWrap,
        state,
        promise,
    };
};


export function createTimeredPromise(duration?: number) {
    let state = {
        isResolvedInTime: false,
        isResolved: false,
    };
    let resolve: Function | undefined = undefined;
    let promise = new Promise((res) => {
        resolve = res;

        if(!duration) return;
        setTimeout(() => {
            if(!state.isResolved) {
                state.isResolved = true;
                res(undefined);
            }
        }, duration);
    });

    let resolveWrap = (value: unknown) => {
        if(!resolve || state.isResolved) return;

        state.isResolved = true;
        state.isResolvedInTime = true;
        resolve(value);
    };

    return {
        resolve: resolveWrap,
        state,
        promise,
    };
};