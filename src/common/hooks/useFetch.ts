import { useRef, useEffect, useReducer } from 'react';
interface IInitialState {
    status: string,
    error: string | null,
    data: { [key: string]: any }
}

const initialState: IInitialState = {
    status: 'idle',
    error: null,
    data: {},
};


type TAction = { type: 'FETCHING' } 
                | { type: 'FETCHED', payload: {} }
                | { type: 'FETCH_ERROR', payload: string | null }

export const fetchStateReducer =  (state: typeof initialState, action: TAction): IInitialState => {
    switch (action.type) {
        case 'FETCHING':
            return { ...initialState, status: 'fetching' };
        case 'FETCHED':
            return { ...initialState, status: 'fetched', data: action.payload };
        case 'FETCH_ERROR':
            return { ...initialState, status: 'error', error: action.payload };
        default:
            return state;
    }
}

interface ICacheInterface {
    [key: string]: any
}

const useFetch = (url: string): [string, { [key:string]: any }] => {
    const cache = useRef<ICacheInterface>({});
    const [state, dispatch] = useReducer(fetchStateReducer, initialState);

    useEffect(() => {
        let cancelRequest = false;
        if (!url) return;

        const fetchData = async () => {
            dispatch({ type: 'FETCHING' });
            if (cache.current[url]) {
                const data = cache.current[url];
                dispatch({ type: 'FETCHED', payload: data });
            } else {
                try {
                    const response = await fetch(url);
                    if (response.status > 400 && response.status < 600) {
                        throw Error("Invalid")
                    }
                    const data:{ [k: string]: any } = await response.json();
                    cache.current[url] = data;
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCHED', payload: data });
                } catch (error) {
                    if (cancelRequest) return;
                    if(error instanceof Error) {
                        dispatch({ type: 'FETCH_ERROR', payload: error.message });
                    } else {
                        dispatch({ type: 'FETCH_ERROR', payload: 'Unknown Error' });
                    }
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, [url]);

    return [state.status, state.data]
}


export default useFetch;