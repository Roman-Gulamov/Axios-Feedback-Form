import { ChangeEvent, FormEvent, RefObject } from "react";

export interface IContext {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface IMap {
    name: string,
    placeholder: string,
    type?: string,
    id?: string,
    pattern?: string,
    as?: any,
    cols?: number,
    rows?: number,
    className?: string
}

export interface IFeedback extends INotice{
    loadingVisible: string,
    formRef: RefObject<HTMLFormElement>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => boolean | undefined
    isDisabled: boolean
}

export interface INotice {
    text?: string,
    className?: string
}

export interface Iinput {
    name?: string,
    email?: string,
    phone?: string,
    message?: string
}



