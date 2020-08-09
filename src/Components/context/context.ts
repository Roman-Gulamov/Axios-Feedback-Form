import { ChangeEvent, createContext } from 'react';
import { IContext } from '../Interface/Interface';

export const Context = createContext<IContext>({
    handleChange: (event: ChangeEvent<HTMLInputElement>) => {}
});
