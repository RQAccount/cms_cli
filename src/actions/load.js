
export const actions = {
    ADDHTTPLOAD: 'load/reducer/ADDHTTPLOAD',
    DELHTTPLOAD: 'load/reducer/DELHTTPLOAD',
};

export function addHttpLoadLength() {
    return {
        type: actions.ADDHTTPLOAD,
    };
}

export function delHttpLoadLength() {
    return {
        type: actions.DELHTTPLOAD,
    };
}
